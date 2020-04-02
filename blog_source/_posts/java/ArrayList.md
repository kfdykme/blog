---
title : Java ArrayList
date : 2018/10/24 20:32:00
tags :
- Java
---

# Java ArrayList

## 介绍

ArrayList 内部维护了一个
``` java
 transient Object[] elementData;
```

调用构造函数的时候把内部的静态空数组赋值给elementData.或者根据长度赋值一个新的数组

add,get等操作通过调用elementData来实现, 如果elementData的长度不足,则经过一连串跳转之后调用native方法将数组复制到一个size比原先大1的新数组中.

### ArrayList
``` java
ArrayList<E> extends AbstractList<E> implements List<E> ,RandomAccess,Cloneable,java.io.Serializable{
  ...
}
```
ArrayList类实现了4个interface
- List
- RandomAccess
- Cloneable
- java.io.Serializable

除了List接口之外,其余的三个接口都是空的
``` java
public interface RandomAccess{

}

public interface Cloneable{

}

public interface Serializable {
}

```
#### RandomAccess
表示实现了该接口的类使用for循环迭代比使用迭代器更快
#### Cloneable
实现了该接口的类就需要重写Object.clone()方法

API原文为:
> By convention, classes that implement this interface should override
 <tt>Object.clone</tt> (which is protected) with a public method.


#### Serializable
表示该类可序列化,需要自定义一个序列号的uid作为识别
``` java
    private static final long serialVersionUID = 8683452581122892189L;
```
