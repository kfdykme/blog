---
title: About Android 1 从启动到桌面
date: 2020-03-29 23:59:22
tags:
- android
---

# about Android 1 启动到桌面

- 启动系统
  - 开机键
    - 引导芯片加载BootLoader到内存，拉起Linux OS, 寻找init.rc启动init进程
    - init进程
      - 启动Zygote进程
        - 启动java虚拟机
        - jni
        - 找到ZygoteInit类调用main
    - Zygote
      - 通过fork复制进程来创建应用进程和SystemServer进程
      - 启动时会创建DVM获ART
      - main
        - 创建socket
        - 预加载
        - 启动SystemServer
        - 等待AMS请求
    - SystemServer
      - 用于创建系统服务
        - AMS
        - WMS
        - PMS
      - PathClassLoader
      - 启动binder线程池


## AMS

- SystemServer
  - 获取Context
    - 构造ActivityThread
      - thead.attach(true)
        - if (true)
          - setAppName system_process
          - 从systemContext的packageInfo获取对象然后makeApplication
          - application.onCreate
    - 取得ActivityThread实例的context
- 启动各种Service
  - 启动AMS
    - newInstance ActivityManagerService
    - add service对象到mServices
    - service.onStart()
- AMS onStart()
  - start()
    - ...
  - systemReady()  
    - startHomeActivityLocked
      - getHomeIntent
      - ActivityStartController.startHomeActivity
        - ActivityStarter
          - execute
    - 进行操作
    - mStackSupervisor.resumeTopActivitiesLocked()


## HomeActivity

在 systemReady 后启动HomeActivity

- 怎么启动HomeActivity
  - 通过flag 常量 XXXX_HOME

### 启动Activity

- 启动组件的方式
  - 显式启动
  - 隐式启动
- Activity 启动模式

#### 启动方式

显式启动

``` java
Intent intent = new Intent(AActivity.this,BActivity.class);
startActivity(intent);

Intent intent2 = new Intent();
intent2.setClassName("","");
startActivity(intent2);
//需要在对应AndroidManifest.xml内设置exported = true
```

隐式启动
即通过IntentFilter寻找
- action
- category

AMS收到StartActivity请求，匹配组件action，检查category，检查数据，启动组件并传入数据

### HomeActivity做了什么
也就是Launcher做了什么
- 获取已安装的apk信息
- 显式已安装的apk信息并响应点击事件



> 参考:
[1](https://www.jianshu.com/p/2c1318b0f527)
[2](https://blog.csdn.net/hgy413/article/details/97245131)
[3](https://blog.csdn.net/monkey646812329/article/details/52884518)
