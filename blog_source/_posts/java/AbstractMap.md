---
title : Java abstract class AbstractMap<K,V>
date  : 2018/11/19 03:30:00
tag :
- Java
---

# Java AbstractMap

介绍了AbstractMap内的方法和静态方法的实现，内部还有两个静态内部类SImpleEntry,SimpleImmutableEntry暂时不讨论

##构造方法

空的构造方法，

## size
通过entrySet获取一个Set<Map.Entry<K,V>>,然后调用Set的size方法

## isEmpty
调用size(), 看看size是否为零


## containsKey
调用entrySet() 获取Set,调用Set.iterator()获取一个迭代器，使用这个迭代器进行遍历查询
需要注意的是,在方法内部使用了if语句，通过Object key是否为空来确定使用　== null 还是　equals 来进行判断是否匹配
## containsValue
同上

## get
同上，只不过匹配到了对应的key之后使用Entry.getValue来取出value

## put
未实现

## remove
同样使用迭代器获取到正确的键值对Entry。
然后如果Entry的值不为空,则调用迭代器的remove把该键值对去掉，
然后返回value

## putAll
ｆｏｒ循环遍历传入的参数map.entrySet(),然后put(key,value)

## clear
调用entrySet().clear()

##  Set<K> keySet
transient

## Collecion<V> values;
transient

## keySet()
获取keySet,
如果keySet为空，则new一个AbstractSet{
  iterator <-> entrySet.iterator()
    ...
  size <-> AbstractMap.this.size()
  isEmpty<-> AbstractMap.this.isEmpty()
  clear <-> AbstractMap.this.clear()
  contains <-> AbstractMap.this.containsKey()
}
返回Set

## values
原理同上
返回Collection

## entrySet
abstract

## equals
如果o == this 返回true
如果类型不是Map ,返回false
强制类型转换Object o 为Map<?,?> o
如果size结果不一致,返回false
迭代器遍历this.entrySet().iterator();
只要o内包含this内所有键值对且一致，则相等
（看代码的话好像不考虑o内部有更多的数据)

``` java
try {
            Iterator<Entry<K,V>> i = entrySet().iterator();
            while (i.hasNext()) {
                Entry<K,V> e = i.next();
                K key = e.getKey();
                V value = e.getValue();
                if (value == null) {
                    if (!(m.get(key)==null && m.containsKey(key)))
                        return false;
                } else {
                    if (!value.equals(m.get(key)))
                        return false;
                }
            }
        } catch (ClassCastException unused) {
            return false;
        } catch (NullPointerException unused) {
            return false;
        }
```

## hashCode

迭代器遍历，返回值为所有Entry的hashCode的返回值


## toString
没仔细看

## clone
throws CloneNotSupportedException
super.clone(),
然后把结果的keySet和values设为null
然后返回

## 静态方法

### eq
现根据是否都为null判断，再调用equals

## 静态内部类

### SimpleEntry
### SimpleImmutableEntry
