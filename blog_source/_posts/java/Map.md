---
title : Java Interface Map
date : 2018/11/18 22:09:00
tags:
- Java
---


# Java Interface Map


## Map

Map.java内部可以分成4个部分
- 逻辑上Map接口需要实现的方法
- 作为数据结构应该实现的方法
- 默认实现的方法
- Map.Entry

### 逻辑上Map接口需要实现的方法
- size  大小
- isEmpty 是否为空
- containsKey 是否包含有某个键
- containsValue 是否包含有某个值
- get 取
- put 放
- remove 移除
- putAll 全部放
- clear 清楚
- Set<K> keySet 获取所有键
- Collection<V> values 获取所有值
- Set<Map.Entry<K,V>> entrySet 获取所有entry

### 作为数据结构应该实现的方法
- boolean equals(Object o)
- int hashCode

### 默认方法
- getOrDefault 从一个键获取一个值，如果没有值，则默认返回
  - 先get ，如果没有就返回默认值，有则返回get到的值
- forEach 遍历一个map，
  - 用到了BiConsumer
  - 先判断遍历执行的action是否为空，然后通过entrySet获取键值对，然后从键值对拿到key和value，传给action
- replaceAll
  - 用了BiFunction
  - 遍历一遍entrySet()然后将取到的key，value作为参数给function.apply之后，将结果赋值给value，然后最后entry.setValue
- putIfAbsent 如果对应的key的value是空的话，就赋值，否则不赋值
- remove 移除
  - 如果 传入的value和通过key取得的value不一致 则 返回 false， 不移除
  - 如果 通过key取得的value为空，同时map内部不包含该key，也返回false不移除
  - 其他情况 remove（key） ，return true
- replace 三个参数
  - 同上，remove改为put（key,newValue)
- replace 两个参数
  - 只要通过key获取到的value不为空或者key在目标map中存在，就可以将传入的value替换到对应的key中
- computeIfAbsent 如果key对应的value == null， 则对key做处理后 的结果作为value传入
  - 如果 value!= null 或者function的结果==null，则不改变，并返回value
  - 返回的value有可能为空
- computeIfPresent 如果key对应的value不为空，则处理并将结果传入，其他同上
- compute 不讲道理，直接将key处理一遍，然后传入到value
- merge
  - 如果key中已有值，则对oldvalue与newvalue一起处理，然后返回值作为newvalue，否则将传入的value作为newvalue
  - 如果最终newvalue为空，则移除key，否则将newvalue作为新的value传入

### Map.Entry

Map.Entry是一个键值对，有简单的
- getKey
- getValue
- setValue
- equals
- hashCode
这些方法，已经内部已经实现了静态的比较方法。
- comparingByKey 以自然顺序比较
- comparingByValue 以自然顺序比较
- comparingByKey 自定义Comparator
- comparingByValue 自定义 Comparator



## source

``` java
public Interface Map<K,V>{
  int size();

  boolean isEmpty();

  boolean constainsKey(Object key);

  boolean containsValue(Object value);

  V get(Object key);

  V put(Object key,Object value);

  V remove(Object key);

  void putAll(Map<? extends K, ? extends V> m);

  void clear();

  Set<K> keySet();

  Collection<V> values();

  Set<Map.Entry<K,V>> entrySet();

  Interface Entry<K,V> {
    K getKey();

    V getValue();

    V setValue(V  value);

    boolean equals(Object o);

    int hashCode();

    public static <K extends Comparable<? super K> ,V> Comparator<Map.Entry<K,V> comparingByKey(){
      return (Comparator<Map.Entry<K,V>> & Serializable) (c1,c2)->c1.getKey().compareTo(c2.getKey());
    }

    public static <K,V extends Comparable <? super V>> Comparator<Map.Entry<K,V>> comparingByValue(){
      return (Comparator<Map.Entry<K,V>> & Serializable) (c1,c2) -> c1.getValue().compareTo(c2.getValue());
    }

    public static <K,V> Comparator<Map.Entry<K,V>> comparingByKey(Comparator<? super K> cmp){
      Objects.requireNonNull(cmp);
      return (Comparator<Map.Entry<K,V>> & Serializable)(c1,c2) -> cmp.compare(c1.getKey(),c2.getKey());
    }

    public static <K,V> Comparator<Map.Entry<K,V>> comparingByValue(Comparator<? super V> cmp){
      Objects.requireNonNull(cmp);
      return (Comparator<Map.Entry<K,V>> & Serializable)(c1,c2)->cmp.compare(c1.getValue(), c2.getValue());
    }
  }

  boolean equals (Object o);

  int hashCode();

  default V getOrDefault(Object key , V defaultValue){
    V v;
    return (((v = get(key)) != null) || constainsKey(key))
      ? v
      : defaultValue;
  }

  default void forEach(BiConsumer<? super K, ? super V> action){
    Objects.requireNonNull(action);
    for(Map.Entry<K,V> entry :entrySet()){
      K k;
      V v;
      try{
        k = entry.getKey();
        v = entry.getValue();
      } catch (IllegalStateException ise){
        throw new ConcurrentModificationException(ise);
      }

      action.accept(k,v);
    }
  }

  default void replaceAll(BiFunction<? super K, ? super V, ? extends V> function){
    Objects.requireNonNull(function);
    for(Map.Entry<K,V> entry : entrySet()){
      K k;
      V v;
      try {
        k = entry.getKey();
        v = entry.getValue();
      } catch (IllegalStateException ise){
        throw new ConcurrentModificationException(ise);
      }

      v = function.apply(k,v);

      try{
        entry.setValue(v);
      } catch(IllegalStateException ise){
        throw new ConcurrentModificationException(ise);
      }
    }
  }

  default V putIfAbsent(K key, V value){
    V v = get(key);
    if( v== null){
      v = put(key,value);
    }

    return v;
  }

  default boolean remove(Object key,Object value){
    Object vurValue = get(key);
    if(!Objects.equals(curValue ,value) ||
      （curValue == null && !constainsKey(key)){
        return false;
      }
      remove(key);
      return true;
  }

  default boolean replace(K key,V oldValue, V newValue){
    Object curValue = get(key);
    if( !Objects.equals(curValue,oldValue) ||
      (curValue == null && !containsKey(key))){
        return false;
      }

      put(key,newValue);
      return true;
  }

  default V replace(K key, V value){
    V curValue;
    if(((curValue = get(key)) != null) || containsKey(key)){
      curValue = put(key,value);
    }
    return curValue
  }

  default V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction){
    Objects.requireNonNull(mappingFunction);
    V v;
    if((v = get（key)) == null ){
      V newValue
      if((newValue = mappingFunction.apply(key)) != null) {
        put(key, newValue);
        return newValue;
      }
    }

    return v;
  }

  default V computeIfPresent(K key,
    BiFunction<? super K , ? super V, ? extends V> remappingFunction){
      V oldValue;
      if((oldValue = get(key)) != null){
        V newValue = remappingFunction.apply(key,oldValue);
        if(newValue != null){
          put(key,newValue);
          return newValue;
        } else {
          remove(key);
          return null;
        }
      }
    }

    default V compute(K key,BiFunction<? super K, ? super V , ? extends V> remappingFunction){
      Objects.requireNonNull(remappingFunction);

      V newValue = remappingFunction.apply(key,oldValue);
      if(newValue == null){
        if(oldValue != null || containsKey(key)){
          remove(key);
          return null;
        } else {
          return null;
        }
      } else {
        put(key,newValue);
        return newValue;
      }
    }

    default V merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction){
      Objects.requireNonNull(remappingFunction);
      Objects.requireNonNull(value);

      V oldValue = get(key);
      V newValue = (oldValue == null ?) value : remappingFunction.apply(oldValue,value);

      if(newValue == null){
        remove(key);
      } else {
        put(key,newValue);
      }

      return newValue;
    }
}
```
