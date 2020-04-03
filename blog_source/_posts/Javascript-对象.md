---
title: JavaScript-对象
date: 2020-04-02 13:17:35
tags:
- JavaScript
---

# JavaScript

- 属性类型
  - 数据属性
  - 访问器属性
- 创建对象
  - 工厂模式
  - 构造函数模式
  - 原型模式
  - 组合构造函数和原型模式
  - 动态构造函数模式
  - 寄生构造函数模式
  - 问题构造函数模式

## JavaScript 属性

## JavaScript 创建对象

### 工厂模式

``` JavaScript
function createPerson (name, age, job) {
  var o = new Object()
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    console.info(this.name)
  };
  return o
}
```

### 构造函数模式

``` JavaScript
function Person (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.info(this.name)
  }
}

var person1 = new Person('Nicholas', 29, 'Software Engineer')

person1.constructor == Person //true
person1 instanceof Person //true
person1 instanceof Object //true
```
要创建Person的新实例，必须使用new操作符.实际上经历了:
- 创建一个对象
- 将构造函数的作用于赋值给新对象
- 执行构造函数中的代码
- 返回新对象

**构造函数与其他函数的唯一区别，就在于调用方式不同。任何函数，只要通过new操作符来调用，那他就可以作为构造函数**

``` JavaScript
// 作为构造函数使用
var person = new Person("",22,"")

// 作为普通函数使用
Person("a",2,"c")

// 在另一个对象的作用域中使用
var o = new Object();
Person.call(o, "Kristen",25,"Nurse")
o.sayName()
```

**构造函数的不同实例中的同名方法是不相等的**

``` JavaScript
function Person (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  // this.sayName = function () {
  //   console.info(this.name)
  // }
  this.syaName = new Function("console.info(thisname)")
}

```

可以通过将方法定义在构造函数外部解决，但是也会引发新的问题，构造函数失去了封装性

``` JavaScript
function Person (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.syaName = sayName
}

function sayName() {
  console.info(this.name)
}
```

### 原型模式

``` JavaScript
function Person() {}

Person.prototype.name = "Namea"
Person.prototype.age = 29
Person.prototype.job = "Software Engineer"
Person.prototype.sayName = function () {
  console.info(this.name)
}

var person1 = new Person()
var person2 = new Person()
```


``` JavaScript
function Persone() {

}

Person.prototype = {
  name : "ada",
  age : 29,
  job : "Software Engineer",
  sayName: function () {
    console.info(this.name)
  }
}

//重写了 Person.prototype
var frient = new Person()
friend.constructor == Person //false

//可以这样

Person.prototype = {
  constructor: Person,
  name : "ada",
  age : 29,
  job : "Software Engineer",
  sayName: function () {
    console.info(this.name)
  }
}

//但是这样又会导致contructor属性的enumerable = true
//可以试下这样写

Person.prototype = {
  name : "ada",
  age : 29,
  job : "Software Engineer",
  sayName: function () {
    console.info(this.name)
  }
}

Object.defineProperty(Person.prototype, "constructor", {
  enumerable: false,
  value: Person
})
```

**原型的动态性**

先创建实例，再重写原型则会导致error


**原生对象原型**

``` JavaScript
String.prototype.startsWith = function (text) {
  return this.indexOf(teext) == 0;
}

var msg = "hello world"
msg.startsWith("hello") // true
```


**原型对象问题**

当涉及到原型中的属性是引用类型的属性时，会产生问题。


### 组合使用构造函数模式和原型模式

- 构造函数用于定义实例属性
- 原型模式用于定义方法和共享的属性

``` JavaScript
function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.friends = ["Shelby","Court"]
  //此时对每个实例的friends操作都不会影响其他实例
}


Person.prototype = {
  constructor : Person,
  sayName: function () {
    console.info(this.name)
  }
}
```

### 动态原型模式

``` JavaScript
function Person(name, age, job) {

    this.name = name
    this.age = age
    this.job = job

    if (typeof this.sayName != 'function') {
      Person.prototype.sayName = funciton () {
        console.info(this.name)
      }
    }
}
```

### 寄生构造函数模式

``` JavaScript
function Person(name, age, job) {
  var o = new Object()
  o.name = name
  o.age = age
  o.job = job
  o.sayName = funciton () {
    console.info(this.name)
  }
  return o
}
```

### 稳妥构造函数模式

稳妥对象
- 没有公共属性
- 其方法也不引用this的对象
``` JavaScript
function Person() {
  var o = new Object()
  //可以在这里定义私有变量和函数

  o.sayName = function () {
    alert(name)
  }

  return o
}

```

> 总结自 JavaScript高级程序设计
