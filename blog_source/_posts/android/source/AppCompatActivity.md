---
title: Android AppCompatActivity
date: 2019/2/19 15:54:52
tag:
- android
---
# Android AppCompatActivity

## 关系
- extends FragmentActivity
- implements AppCompatCallback, SupportParentable, DelegateProvider

## 与Activity 比较

### setContentView

AppCompatActivity的setContentView ,调用this.getDelegate().setContentView(...)
而Acitivity的setContentView调用this.getWindow().setContentView(...)
``` java
// AppCompatActivity
public void setContentView(View view, LayoutParams params) {
  this.getDelegate().setContentView(view, params);
}

public void setContentView(@LayoutRes int layoutResID) {
  this.getDelegate().setContentView(layoutResID);
}

// Activity
public void setContentView(@LayoutRes int layoutResID) {
  getWindow().setContentView(layoutResID);
  initWindowDecorActionBar();
}
```
AppCompatActivity的setContentView调用的时候会调用一个this.getDelegate()
