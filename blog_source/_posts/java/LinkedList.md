---
title : Java LinkedList
date : 2018/10/25 21:39:00
tags :
- Java
---

# Java LinkedList

LinkedList内部有3个transient 变量 分别是
``` java
transient int size = 0;
transient Node<E> first;
transient Node<E> last;
```

想来first与last应该就是头尾结点了.

## LinkedList.Node

Node 是一个静态内部类,保存了前后结点和本身的item的信息

### 源码
``` java
public class LinkedList<E> extends AbstractSequentialList<E> implements List<E>. Deque<E>, Cloneable, java.io.Serializable{

  private static class Node<E> {
    E item;
    Node<E> next;
    Node<E> prev;

    Node(Node<E> pre,E element,Node<E> next){
      this.item = element;
      this.next = next;
      this.prev = pre;
    }
  }
}
```
