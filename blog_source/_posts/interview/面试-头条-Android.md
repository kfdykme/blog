---
title: 面试-头条-Android
date: 2020-04-24 20:19:32
tags:
- interview
---


# 面试-头条-Android

- 实习介绍
  - miui
  - 商汤
- 算法
  - 数字、字母混合串，无正负号， 找出其中的最大数字， 最大数字不超过int；  “abc123xyz34567ab” --> 34567
- Activity生命周期
  - onNewIntent什么时候
  - onStart onResume onPause onStop
  - 有onStop吗
- SharedPreference
  - 单个文件， io操作
  - put get commit
- 进程和线程
  - 跨线程安全问题
    - 原子 valite
    - asynchron
- ClassLoader 双亲
  - 怎么去除加载拦截
    - 继承根的ClassLoader，然后加载
- 网络
  - 5层
  - tcp udp
    - 三次握手
- 怎么学习
- 算法
  - 求两个单链表是否有交叉节点，找出交叉点


``` javascript
// 数字、字母混合串，无正负号， 找出其中的最大数字， 最大数字不超过int；  “abc123xyz34567ab” --> 34567
//正则然后map, sort就好了 简单
```

``` java
// 求两个单链表是否有交叉节点，找出交叉点
import java.util.Scanner;

//{1} -> {2} -> {3} -> {4} -> {5} -> null
// {7} ->  {4} ->  {5} -> null

// 1 7;
// 2 4;
// 3 6;
// 4 1;
// 5 2;
// 7 3;
// 4 4;
// 6 5;
// null null;
// 7 1;
// 4 2;
// 6 3;
// null 4;
// 7

class Node {
    int val;
    Node next;


}



public class Main {
    public static void main(String[] args) {


    }

    public Node findX(Node l1, Node l2) {
        Node cl1 = l1;
        Node cl2 = l2;
        boolean hasChange1 = false;
        boolean hasChange2 = false;

        while(cl1 != null
              && cl2 != null
              && cl1.equals(cl2)) {
            cl1 = cl1.next;
            cl2 = cl2.next;

            if (cl1 == null && !hasChange11) {
                cl1 = l2;
                hasChange1 = !hasChange11;
            }

            if (cl2 == null  && !hasCange2) {
                cl2 = l1;
                hasChange2 = !hasChange2;
            }
        }

        return cl1;
    }
}
```
