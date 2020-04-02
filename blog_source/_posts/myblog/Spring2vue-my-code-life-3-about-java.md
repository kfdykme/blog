---
title: Spring2vue-my-code-life-3-about-java
date: 2020-03-10 00:06:12
tags:
- code
---

# 从Spring 到Vue 3 关于Java


有什么事Java经常会被问到但是我一直记不住的呢.


## 基础

Java的基础类型？

int long short byte char boolean double float

声明基础类型的时候发生了什么？

例如

``` Java
public class Main {
  public int a;
  //在栈中分配了空间给a
  public int b = 0;
  //在栈中分配了空间给b同时在常量区中查找变量0，如果有则栈中b指向该值
}
```

### String 类型

``` Java
public class Main {
  public String c = "c";
  public String d = "das";

  public String e  = c + d;
}
```

### 引用类型


### 关键字

#### transient

可序列化的对象中不需要进行序列化的变量

#### volatile  

每次写的的时候从内存读取

#### atomic

####
## 其他

### Java 链表

### Java List
- ArrayList
  - 数组
- Vector
  - 数组
  - 线程安全
- LinkedList
  - 链表
  -

数组实现： 查找快，增删慢
链表实现： 查找慢，增删快


### Java HashSet

- 存
  - 调用hashCode，计算存储位置
    - 进行equals比较
      - 没用元素/比较结果为false则存

### Java Collection

### Java HashMap

#### hash冲突
拉链法解决

初始容量，加载因子

线程不安全,

#### hashtable

线程安全

散列表

key value不能为空

支持Enumeration

#### ConcurrentHashMap

线程安全版HashMap

增加了segment层，每次针对单个segment加锁

#### LinkedHashMap

- LinkedHashMap是继承于HashMap，是基于HashMap和双向链表来实现的。
- HashMap无序；LinkedHashMap有序，可分为插入顺序和访问顺序两种。如果是访问顺序，那put和get操作已存在的Entry时，都会把Entry移动到双向链表的表尾(其实是先删除再插入)。
- LinkedHashMap存取数据，还是跟HashMap一样使用的Entry[]的方式，双向链表只是为了保证顺序。
- LinkedHashMap是线程不安全的

[我看的这里](https://www.jianshu.com/p/8f4f58b4b8ab)


#### TreeMap

基于红黑树的NavigableMap，线程非安全，不允许null，存入需要实现comparable接口或实现comparator接口排序

## JVM相关

jvm运行时数据区

- 方法区 method area
- 虚拟机栈 VM stack
- 本地方法栈 native method stack
- 堆 heap
- 程序计数器 program counter register


###程序计数器

- java 方法
  - 正在执行的虚拟机字节码的地址
- 本地方法
  - undefined

### java 虚拟机栈

- 线程私有
- java方法执行的内存模型。
- 每个方法在执行时都会创建一个栈帧 Stack Frame
  - 局部变量表
    - 编译器可知的各种基本类型（boolean， int，long， short， byte， double， float， char）
    - 对象引用类型（refrence）
    - returnAddress类型
  - 操作数栈
  - 动态链接
  - 方法出口

### 本地方法栈

### 堆

- 线程共享

### 方法区

- 共享内存
- 包含
  - 已被虚拟机加载的类信息
  - 常量
  - 静态变量
  - 即时编译器编译后的代码等数据
- 运行时常量池
  - 存放编译期间生成的各种字面量和符号引用。
  - 内存有限

### 直接内存

不知道

## HotSpot

后续再研究吧

### 对象的创建

### 对象的布局

###对象的访问定位


### GC

## Java 反射

## Java 类加载
双亲
## 线程

``` java

new Thread(new Runnable() {
  @Override
  public void run () {


  }
}).start()

//run的话只是正常运行，不会启动新线程
//如何验证？
```

### Callable

``` java
public interface Callable<V> {
  V call() throws Exception;
}

public interface Future<V> {
  boolean cancel(boolean mayInterruptIfRunning);
  boolean isCancelled();
  boolean isDone();

  V get() throws InterruptedException, ExecutionException;

  V get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException;
}

public interface RunnableFuture<V> extends Runnable, Future<V> {
  void run();
}

public class FutureTask<V> implements RunnableFuture<V> {
  ...
}


```



### 线程池

``` java
public interface Executor {
  void execute(Runnable command);
}

public interface ExecutorService extends Executor {
  void shutdown();
   List<Runnable> shutdownNow();

   boolean isShutdown();
   boolean isTerminated();

   <T> Future<T> submit(Callable<T> task);
   <T> Future<T> submit(Runnable task, T result);
   Future<?> submit(Runnable task);
}

public class Executors {
    public static ExecutorService newCachedThreadPool() {
            return new ThreadPoolExecutor(0, Integer.MAX_VALUE, 60L, TimeUnit.SECONDS,
                            new SynchronousQueue<Runnable>());
    }
    ...
}

```

#### 四种线程池
- newCachedThreadPool
  - 如无线程则新建。
  - 一定时间无使用则销毁
- newSingleThreadExecutor
  - 维持一个线程
- newFixedThreadPool
  - 最大值前一个任务一个线程
- newScheduledThreadPool
  - 大小无限

线程异常则再加一新的线程
#### 关闭方法

- shutdown
  - 不接受新任务，任务结束后停止
- shutdownNow
  - 尝试停止，返回未执行任务

### 线程同步

- 同步方法
- 同步代码块
- volatile
- 重入锁
  - ReentrantLock()
- ThreadLocal
- LinkedBlockingQueue
- 原子变量

### equals

先判断类型，在判断值。可重写

### hashCode

返回
