---
title: About Android 3 持久化存储
date: 2020-03-30 00:52:39
tags:
- android
---

# About Android 3 持久化存储

- Android 持久化存储
  - Shared Preference
  - Internal Storage
  - External Storage
  - SQLite Database
  - Network Connection

## Shared Preferences

- 特点
- 原理

### SharedPreferences的特点
适合单线程，小批量数据存储和访问


### SharedPreferences原理
通过维护一个xml文件存储

### 多进程使用
不推荐使用
## Internal Storage & External Storage

sdcard数据读写需要注意权限

## 数据库

- sqlite
- greenDAO
- realm

常问：
数据库的操作是线程安全的吗？
太久没操作了
##  网络
略

## 序列化支持

- 序列化
  - Parceable
    - 高效 Android 特有 复杂
  - Serial
    - io操作多 性能影响大

>参考
[1](https://www.jianshu.com/p/4984f66f9a4b)
[数据库的设计：深入理解 Realm 的多线程处理机制](https://academy.realm.io/cn/posts/threading-deep-dive/)
