---
title : Java Interface NavigableMap<K,V>
date: 2018/11/19 08:28:00
tags:
 - java
---
# Java Interface NavigableMap

- Map.Entry<K,V> lowerEntry(K key)
- K lowerKey(K key);
- Map.Entry<K,V> floorEntry(K key);
- K floorKey(K key);
- ceilingEntry
- ceilingKey
- higherEntry
- higherKey
- firstEntry
- lastEntry
- pollFirstEntry
- pollLastEntry
- NavigableMap<K,V> descendingMap();
- NavigableSet<K> navigableKeySet();
- NavigableSet<K> descendingKeySet();
- NavigableMap<K,V> subMap(K fromKey, boolean fromInclusive,K toKey, boolean toInclusive);
- NavigableMap<K,V> headMap(K toKey,boolean inclusive);
- NavigableMap<K,V> tailMap(K fromKey, boolean inclusive);
- SortedMap<K,V> subMap(K fromKey, K toKey);
- SortedMap<K,V> headMap(K toKey);
- SortedMao<K,V> tailMap(K fromKey);
