---
title : Java Interface SortedMap
date : 2018/11/19 08:22:00
tags :
 - Java
---

# Java Interface SortedMap

extends Map

## 方法
就只有这几个方法，然后就没有内容了

- Comparator<? super K> comparator();
- SortedMap<K,V> subMap(K fromKey,K toKey);
- SortedMap<K,V> headMap(K toKey);
- SortedMap<K,V> tailMap(K fromKey);
- K firstKey();
- K lastKey();
- Set<K> keySet();
- Collection<V> values();
- Set<Map.Entry<K,V>> entrySet();
