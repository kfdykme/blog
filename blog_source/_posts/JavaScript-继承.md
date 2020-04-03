---
title: JavaScript-继承
date: 2020-04-02 18:03:16
tags:
- JavaScript
---

# JavaScript 继承

## 原型链

实现原型链

``` JavaScript
function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = function () {
  return this.property;
}

function SubType () {
  this.subproperty = false
}

//继承了SuperType
SubType.prototype = new SuperType()

SubType.prototype.getSubValue = function () {
  return this.subproperty
}

var instance = new SubType()
console.info(instance.getSuperValue())
```

当前的原型链
SubType.prototype 指向SubType Prototype
SubType Prototype.prototype 指向 SuperType Prototype
SubType -> SuperType => Object

**给原型添加方法的代码一定要放在替换原型的语句之后**

**原型链的引用类型问题**

**创建子类型的实例时，不能向超类的构造函数传参**

## 借用构造函数
解决原型中包含引用类型的问题

``` JavaScript
function SuperType () {
  this.colors = ["red","blue","green"]
}

function SubType() {
  SuperType.call(this)
}

var instance1 = new SubType()
instance1.colors.push("black")
console.info(instance1.colors)

var instance2 = new SubType()
instance2.colors
```

**可以传参**

但是也无法避免构造函数的问题：方法都在构造函数中声明，无法复用

## 组合继承

``` JavaScript
function SuperType(name) {
  this.name = name
  this.colors = ["red", "blue", "green"]
}

SuperType.prototype.sayName = funciton () {
  console.info(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

SubType.prototype = new SuperType() ;
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function () {
  console.info(this.age)
}


```

## 原型式继承

``` JavaScript
function object(o) {
  function F() {}
  F.prototype = o
  return new F();
}
```

ECMAScript5 通过新增Object.create()方法规范了原型式继承

``` JavaScript
var person = {
  name: 'Nicholas',
  friends: ["Shelby"]
}

var anotherPerson = Object.create(person)
```

**引用类型会有影响**

## 寄生式继承

``` JavaScript
function createAnother(original) {
  var clone = object(original)
  clone.sayHi = function () {
    console.info('hi')
  }
  return clone
}


var person = {
  name: 'Nicholas',
  friends: ["Shelby"]
}

var anotherPerson = createAnother(person)

```


## 寄生组合继承

``` JavaScript
function inheritPrototype(subType, superType) {
  var prototype = object(supertype.prototype)
  prototype.constructor = subType
  subType.prototype = prototype
}

function SuperType(name) {
  this.name = name
  this.colors = []
}

SuperType.prototype.sayName = function () {
  console.info(this.name)
}

function SubType (name, age) {
  SuperType.call(this, name)

  this.age = age
}

inheritPrototype(SubType,SuperType)

SubType.prototype.sayAge = function () {
  console.info(this.age)
}
```


> 总结自 JavaScript高级程序设计
