---
title : Retrofit 源码 part 1
date : 2019/4/15 23:37:00
tags :
- android
- retrofit
---

# Retrofit 源码 part 1

Retrofit 大致上就是动态代理+注释处理

## 简单来说


如果我们要进行一个像这样的网络请求

``` java
GitHubService service = retrofit.create(GitHubService.class);

Call<List<Repo>> repos = service.listRepos("octocat");

```
摘自[retrofit](https://square.github.io/retrofit/)

其内部的过程是这样的

- retrofit.create()
  - Proxy.newProxyInstance  创建一个java动态代理
    - loadServiceMethod() 调用这个方法
      - parseAnnotations  对GithubService.class内的注释进行处理
        - RequestFactory.parseAnnotations (处理注释)
        - HttpServiceMethod.parseAnnotations （与Okhttp关联)
    - loadServiceMethod().invoke = HttpServiceMethod.invoke 方法调用时会对应调用

- service.listRepos == Proxy.InvocationHandler.invoke

下面看看具体内容.

## create()
Retrofit 的源码我们从Retrofit.create这个方法开始看

``` java
public <T> T create(final Class<T> service) {
    Utils.validateServiceInterface(service);
    if (validateEagerly) {
      eagerlyValidateMethods(service);
    }
    return (T) Proxy.newProxyInstance(service.getClassLoader(), new Class<?>[] { service },
        new InvocationHandler() {
          private final Platform platform = Platform.get();
          private final Object[] emptyArgs = new Object[0];

          @Override public Object invoke(Object proxy, Method method, @Nullable Object[] args)
              throws Throwable {
            // If the method is a method from Object then defer to normal invocation.
            if (method.getDeclaringClass() == Object.class) {
              return method.invoke(this, args);
            }
            if (platform.isDefaultMethod(method)) {
              return platform.invokeDefaultMethod(method, service, proxy, args);
            }
            return loadServiceMethod(method).invoke(args != null ? args : emptyArgs);
          }
        });
  }

```

在craete()中，先对参数final Class<T> service做一个校验，是否是一个interface,是否有继承自其他interface之类的。

这一部分的核心是返回了一个 ` Proxy.newProxyInstance(...) ` , 使用Java 动态代理。同时动态代理的 InvocationHandler 的 invoke()方法的实现与service的注释相关.

我们看到这一部分
``` java
return loadServiceMethod(method).invoke(args != null ? args : emptyArgs);
```

## loadServiceMethod

每次执行代理的方法的时候，执行loadServiceMethod.invoke, 所以就是说 Retrofit.create()返回的结果由动态代理帮助实现。那么怎么样把service的方法调用之后就实现网络请求呢？这就由注释实现了。
loadserviceMethod的相关代码如下

``` java
ServiceMethod<?> loadServiceMethod(Method method) {
    ServiceMethod<?> result = serviceMethodCache.get(method);
    if (result != null) return result;

    synchronized (serviceMethodCache) {
      result = serviceMethodCache.get(method);
      if (result == null) {
        result = ServiceMethod.parseAnnotations(this, method);
        serviceMethodCache.put(method, result);
      }
    }
    return result;
  }
```

这里面我们需要关注的是
``` java
resuslt = ServiceMethod.parseAnnotations(this, method);
```
## parseAnnotations

很明显这个是对注释进行处理，那么我们需要关注parseAnnotations()做了怎么样的处理.

``` java
abstract class ServiceMethod<T> {
  static <T> ServiceMethod<T> parseAnnotations(Retrofit retrofit, Method method) {
    RequestFactory requestFactory = RequestFactory.parseAnnotations(retrofit, method);

    Type returnType = method.getGenericReturnType();
    if (Utils.hasUnresolvableType(returnType)) {
      throw methodError(method,
          "Method return type must not include a type variable or wildcard: %s", returnType);
    }
    if (returnType == void.class) {
      throw methodError(method, "Service methods cannot return void.");
    }

    return HttpServiceMethod.parseAnnotations(retrofit, method, requestFactory);
  }

  abstract T invoke(Object[] args);
}
```

ServiceMethod的源码很短，简单看来, ServiceMethod.parseAnnotations(...) 完成了两件事
- 从 retrofit, method 中取得了RequestFactory类的示例retrofitFactory
- 将 retrofitFactory作为参数交由 HttpServiceMethod处理.

###  RequestFactory.parseAnnotations(retrofit, method)

这里是真正的对parseAnnotation  进行处理，为什么这么说呢，read the fucking code.


``` java
final class RequestFactory {
  static RequestFactory parseAnnotations(Retrofit retrofit, Method method) {
    return new Builder(retrofit, method).build();
  }

  RequestFactory(Builder builder) {
    method = builder.method;
    baseUrl = builder.retrofit.baseUrl;
    httpMethod = builder.httpMethod;
    relativeUrl = builder.relativeUrl;
    headers = builder.headers;
    contentType = builder.contentType;
    hasBody = builder.hasBody;
    isFormEncoded = builder.isFormEncoded;
    isMultipart = builder.isMultipart;
    parameterHandlers = builder.parameterHandlers;
  }

  ...

  static final class Builder {
    ...

    Builder(Retrofit retrofit, Method method) {
      this.retrofit = retrofit;
      this.method = method;
      this.methodAnnotations = method.getAnnotations();
      this.parameterTypes = method.getGenericParameterTypes();
      this.parameterAnnotationsArray = method.getParameterAnnotations();
    }

    RequestFactory build() {
      for (Annotation annotation : methodAnnotations) {
        parseMethodAnnotation(annotation);
      }
      ...

      return new RequestFactory(this);
    }


    private void parseMethodAnnotation(Annotation annotation) {
      if (annotation instanceof DELETE) {
        parseHttpMethodAndPath("DELETE", ((DELETE) annotation).value(), false);
      } else if (annotation instanceof GET) {
        parseHttpMethodAndPath("GET", ((GET) annotation).value(), false);
      } else if (annotation instanceof HEAD) {
        parseHttpMethodAndPath("HEAD", ((HEAD) annotation).value(), false);
      } else if (annotation instanceof PATCH) {
        parseHttpMethodAndPath("PATCH", ((PATCH) annotation).value(), true);
      } else if (annotation instanceof POST) {
        parseHttpMethodAndPath("POST", ((POST) annotation).value(), true);
      } else if (annotation instanceof PUT) {
        parseHttpMethodAndPath("PUT", ((PUT) annotation).value(), true);
      } else if (annotation instanceof OPTIONS) {
        parseHttpMethodAndPath("OPTIONS", ((OPTIONS) annotation).value(), false);
      } else if (annotation instanceof HTTP) {
        HTTP http = (HTTP) annotation;
        parseHttpMethodAndPath(http.method(), http.path(), http.hasBody());
      } else if (annotation instanceof retrofit2.http.Headers) {
        String[] headersToParse = ((retrofit2.http.Headers) annotation).value();
        if (headersToParse.length == 0) {
          throw methodError(method, "@Headers annotation is empty.");
        }
        headers = parseHeaders(headersToParse);
      } else if (annotation instanceof Multipart) {
        if (isFormEncoded) {
          throw methodError(method, "Only one encoding annotation is allowed.");
        }
        isMultipart = true;
      } else if (annotation instanceof FormUrlEncoded) {
        if (isMultipart) {
          throw methodError(method, "Only one encoding annotation is allowed.");
        }
        isFormEncoded = true;
      }
    }

    ...
  }
}
```

### HttpServiceMethod

再 HttpServiceMethod.parseAnnotations中 再次将retrofit ,method进行处理

``` java
final class HttpServiceMethod<ResponseT, ReturnT> extends ServiceMethod<ReturnT> {

   static <ResponseT, ReturnT> HttpServiceMethod<ResponseT, ReturnT> parseAnnotations(
      Retrofit retrofit, Method method, RequestFactory requestFactory) {
    CallAdapter<ResponseT, ReturnT> callAdapter = createCallAdapter(retrofit, method);

    ...
    Converter<ResponseBody, ResponseT> responseConverter =
        createResponseConverter(retrofit, method, responseType);

    okhttp3.Call.Factory callFactory = retrofit.callFactory;
    return new HttpServiceMethod<>(requestFactory, callFactory, callAdapter, responseConverter);
  }
  ...
}

```

从这里开始 retrofit 和method转化为
requestFactory callFactory callAdapter responseConverter作为参数构建 HttpServiceMethod实例。
所以我们需要去查看HttpServiceMethod是来干什么的


``` java

final class HttpServiceMethod<ResponseT, ReturnT> extends ServiceMethod<ReturnT> {
  private HttpServiceMethod(RequestFactory requestFactory, okhttp3.Call.Factory callFactory,
      CallAdapter<ResponseT, ReturnT> callAdapter,
      Converter<ResponseBody, ResponseT> responseConverter) {
    this.requestFactory = requestFactory;
    this.callFactory = callFactory;
    this.callAdapter = callAdapter;
    this.responseConverter = responseConverter;
  }

  @Override ReturnT invoke(Object[] args) {
    return callAdapter.adapt(
        new OkHttpCall<>(requestFactory, args, callFactory, responseConverter));
  }
  ...
}
```

可以看出，当 service里面的方法被执行的时候，是由callAdapter.adapt()处理一个OkHttoCall完成的。
到此为止，retrofit与okhttp之间的联系也就找到了.

我对动态代理也不熟悉,暂时到此为止,。
