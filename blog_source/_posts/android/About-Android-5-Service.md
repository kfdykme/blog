---
title: About Android 5 Service
date: 2020-03-30 12:39:05
tags:
- android
---


# About Android 5 Service


## 启动和生命周期

- 启动方式
  - startService  
    - 无限期运行
    - 生命周期
      - onCreate
      - onStartCommand
      - onDestory
  - bindService
    -
      - onCreate
      - onBind
      - onUnbind
      - onDestory
- 手动调用
  - startService
    - 单次
      - onCreate
      - onStartCommand
    - 多次
      - onCreate
      - onStartCommand
      - onStartCommand
  - stopService
    - onDestory
  - bindService
    - onCreate
    - onBind
  - unbindService
    - onUnbind
    - onDestory
- 解绑绑定Service服务
  - unbindService() —> onUnbind(ture) —> bindService() —> onRebind()

## Service 与 Thread
无相关，只是有点像。
Service运行与主线程，只要进程不消失则继续运行
Thread运行在其他线程，

## IntentService

在IntentService的Oncreate中，开启一个新的线程，并绑定一个handler
``` java

@Override
public void onCreate() {
  super.onCreate()

  HandlerThread thread = new Handler("IntenteService["+ mName+"]")
  thread.start()

  mServiceLooper = thread.getLooper()

  mServiceHandler = new ServiceHandler(mServiceLooper);
}

public int onStartCommand(Intent intent, int flags, int startId) {
  onStart(intent,startId);
  return mRedelivery ? START_REDELIVER_INTENT : START_NOT_STICKY;
}

public void onStart(Intent intent, int startId) {
  Message msg = mServiceHandler.obtainMessage();
  msg.arg1 = startId;

  msg.obj = intent;

  mServiceHandler.sendMessage(msg)
}
```

ServiceHandler的源码
``` java
private final class ServiceHandler extends Handler {
  public ServiceHandler(Looper looper) {
    super(looper)
  }

  @Override
  public void handleMessage(Message msg) {
    onHandleIntent((Intent) msg.obj);
    stopSelf(msg.arg1);
  }
}
```

## Service 与Activity通信

- onbind返回Ibinder对象
- unbindService和bindService的时候参入ServiceConnection对象

## Remote Service IPC

- IPC
- AIDL


>参考
[1](https://www.jianshu.com/p/d963c55c3ab9)
[2](https://www.jianshu.com/p/8d0cde35eb10)
[3](https://www.jianshu.com/p/8a3c44a9173a)
