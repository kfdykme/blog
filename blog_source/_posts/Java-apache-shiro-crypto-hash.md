---
title: Java-apache.shiro.crypto.hash
date: 2020-04-26 00:09:24
tags:
- java
---

# Java-apache.shiro.crypto.hash SimpleHash

想仔细了解一下后端认证的做法,于是来看下相关源码。

基本的做法是。网络请求得到明文的password和salt,然后将salt转成hash与数据库中的hash比对。

将password和salt转成hash的过程中，用到了Sha256Hash这个类。所以想看下这个类做了什么。

``` java
public class Sha256Hash extends SimpleHash {}

public class SimpleHash extends AbstrachHash {}

```
SimpleHash 继承 AbstrachHash，那么直觉上AbstractHash应该是官方提供的一个实现hash的抽象类。

## Sha256Hash
Sha256Hash的源码不长,基本就是创建了一个默认algorithm=SHA-256的一个SimpleHash，那么还是得看一下SimpleHash做了什么。
``` java
public class Sha256Hash extends SimpleHash {
  public static final String ALGORITHM_NAME = "SHA-256";

  public Sha256Hash () {super("SHA-256");}

  public Sha256Hash (Object source) { super("SHA-256", source) }

  public Sha256Hash (Object source, Object salt) {
    super("SHA-256", source, salt);
  }

  public Sha256Hash(Object source, Object salt, int hashIterations) {
    super("SHA-256", source, salt, hashIterations);
  }

  public static Sha256Hash fromHexString(String hex) {
    Sha256Hash hash = new Sha256Hash();
    hash.setBytes(Hex.decode(hex));
    return hash;
  }

  public static Sha256Hash fromBase64String(String base64) {
    Sha256Hash has = new Sha256Hash();
    hash.setBytes(Base64.decode(base64));
    return hash;
  }
}
```

## SimpleHash

SimpleHash的构造方法最终都会调用这个构造方法
``` java

public SimpleHash(String algorithmName, Object source, Object salt, int hashIterations) throws CodeException, UnknownAlgorithmException {
  this.hexEncoded = null;
  this.base64Encoded = null;
  if (!StringUtils.hasText(algorithmName)) {
    throw new NullPointerException("algorithmName argument cannot be null or empty.");
  } else {
    this.algorithmName = algorithmName;
    this.iterations =Math.max(1, hashIterations);

    ByteSource saltBytes = null;
    if (salt != null) {
      saltBytes = this.convertSaltToBytes(salt);
      this.salt = saltBytes;
    }

    ByteSource sourceBytes = this.convertSourceToBytes(source);
    this.hsah(sourceBytes, saltBytes, hashIterations);
  }
}
```
在构造方法中，主要做的是
- 判断参数是否为空
- 将Object类型的参数转化为ByteSource类型
- 调用 hash方法

### ByteSource

先来看看ByteSource，他是做什么的

``` java
public interface ByteSource {
  byte[] getBytes();

  String toHex();

  String toBase64();

  boolean isEmpty();

  public static final class Util {
    //...
    //用于从各种类型的实例中中构造SimpleByteSource实例
  }
}
```
这样看好像看不出什么东西。那就去看看转化为ByteSource的方法中做了什么事情.

### convertSaltToBytes & convertSourceToBytes

``` java
protected ByteSource convertSaltToBytes (Object salt) {
  return this.toByteSource(salt);
}

protected ByteSource convertSourceToBytes (Object source) {
  return this.toByteSource(source);
}

protected ByteSource toByteSource(Object o) {
  if (o == null) {
    return null;
  } else if (o instanceof ByteSource) {
    return (ByteSource)o;
  } else {
    byte[] bytes = this.toBytes(o);
    return Util.bytes(bytes);
  }
}

```

上面的两个核心部分是
- this.Bytes(o)
- Util.Bytes(bytes)

#### this.Bytes(o)
toBytes 这个方法是在CodeSupport这个类里面的

该方法做的事情有:
- 判断传入是否为空
- 如果传入为 byte[], ByteSource, char[], String, File, InputStream, 则执行对应的转换为bytes的操作
- 大致上最终是通过方法进行获取bytes
  - 方法
    - String.getBytes(encoding)
  - 默认
    - encode是utf-8

#### Util.Bytes(bytes)

这里的Util是[ByteSource]('### ByteSource')中的静态工具类

```
public static ByteSource bytes(byte[] bytes) {
  return new SimpleByteSource(bytes);
}
```

可以看到这也是返回了一个SimpleByteSource实例，先不展开。

### this.hash

得到ByteSource的实例之后，调用hash。

``` java
private void hash(ByteSource source, ByteSource salt, int hashIterations) throws CodeException, UnknownAlgorithmException {
  byte[] saltBytes = salt != null ? salt.getBytes() : null;
  byte[] hashedBytes = this.hash(source.getBytes()， saltBytes, hashIterations);
  this.setBytes(hashedBytes);
}

protected byte[] hash(byte[] bytes, byte[] salt, int hashIterations) throws UnknownAlgorithmException {
  MessageDigest digest = this.getDigest(this.getAlgorithmName());
  if (salt != null) {
    digest.reset();
    digest.update(salt);
  }

  byte[] hashed = digest.digest(bytes);
  int iterations = hashIterations -1;

  for(int i =0; i < iterations; ++i) {
    digest.reset();
    hashed = digest.digest(hashed);
  }

  return hashed;
}

public void setBytes(byte[] alreadyHashedBytes) {
  this.bytes = alreadyHashedBytes;
  this.hexEncoded = null;
  this.base64Encoded = null;
}

protected MessageDigest getDigest(String algorithmName) throws UnknownAlgorithmException {
  try {
    return MessageDigest.getInstance(algorithmName);
  } catch (...) {
    ...
  }
}
```

在这部分中可以看见，最终实现从source + salt => byte 是通过MessageDigest这个类来实现的,于是我们来看看MessageDigest这个类

### MessageDigest

MessageDigest 是 java.security这个包中的类。相关源码先不看，只看看这几个方法做了什么
- MessageDigest.getInstance(algorithmName)
- digest.reset();
- digest.update();
- digest.digest(bytes);

#### getInstance
获取单例，但是具体怎么获取的，挺复杂的。
最终通过main方法调试debug的方式获取到了SHA-256对应的MessageDigest实现类的className
``` java
public static void main(String args) {
  Sha256Hash sha256Hsah = new Sha256Hash();
  MessageDigest MessageDigest = sha256Hsah.getDigest(sha256Hsah.getAlgorithmName());
  //这里输出的也不是具体的实现结果
  System.out.println(digest.getClass().getName())
}
//最终找到当AlgorithmName=SHA-256时，加载了sun.security.provider.SHA2$SHA256这个类
```

``` java
abstract class SHA2 extends DigestBase {


  public static class SHA256 extends SHA2 {
    private static final int[] INITIAL_HASHES = new int[]{....};

    public SHA256() { super("SHA-256", 32, INITIAL_HASHES)}
  }
}
```


### 其他部分的实现
其他部分最终会在DigestBase 和 SHA2这个两个类中得到实现

#### DigestBase
``` java
abstract class DigestBase extends MessageDigestSpi implements Cloneable {
  private byte[] oneByte;
  private final String algorithm;
  private final int digestLength;
  private final int blockSize;
  byte[] buffer;
  private int bufOfs;
  long bytesProcessed;
  static final byte[] padding = new byte[136];

  DigestBase (String var1, int var2, int var3) {
    this.algorithm = var1;
    this.digestLength = var2;
    this.blockSize = var3;
    this.buffer = new byte[var3];
  }

  protected final int engineGetDigestLength() { return this.digestLength;}

  protected final void engineUpdate(byte var1) {
    if(this.oneByte == null) {
      this.oneByte = new Byte[1];
    }

    this.oneByte[0] = var1;
    this.engineUpdate(this.oneByte, 0,1);
  }

  protected final void engineUpdate(byte[] var1, int var2, int var3) {
    if (var3 != 0) {
      if (var2 >= 0, && var3 >= 0 && var2 <= var1.length - var3) {

      }
    }
  }
}
```
#### SHA2

## AbstrachHash
