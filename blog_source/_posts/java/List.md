---
title : Java Interface List
date : 2018/10/23 18:39:00
tags:
- Android
- Java
---

# List

实现了List接口的方法:

AbstractList, AbstractSequentialList, ArrayList, AttributeList, CopyOnWriteArrayList, LinkedList, RoleList, RoleUnresolvedList, Stack, Vector


## 解析
可以看到 List 继承了 Collection 接口.比起Collection而言List多了很多方法,同时还重写了Spliterator方法.以及默认实现了部分方法.

- 默认实现的方法
  - replaceAll
  - sort
- 没有实现的方法
  - 很多很多

下面先看一看已经默认实现了的方法

## replaceAll
可以看到,replaceAll的实现方式是:
- 传入一个UnaryOperator
- 调用this.listIterator();
- 如果 迭代器 有下一个元素
  - 将下一个元素的值赋值为UnaryOperator.apply的结果
- 如果 没有
  - 结束

### 使用demo
``` java
public class Main {

    public static void main(String[] args){

        List list = new ArrayList<Integer>();
        for(int i = 0; i < 10 ; i++){
            list.add(i);
        }


        for(int i =0 ; i < list.size();i++){
            System.out.print(list.get(i));
        }

        System.out.println();

        list.replaceAll(new UnaryOperator<Integer>() {
            @Override
            public Integer apply(Integer integer) {
                return integer <= 4 ? integer : 4;
            }
        });

        for(int i =0 ; i < list.size();i++){
            System.out.print(list.get(i));
        }

        System.out.println();
    }


}
```

### 输出结果
```
0123456789
0123444444
```

### 用lambda表达式
``` java
list.replaceAll(o -> (Integer) o > 4? 4:o);

```

结果一样

## sort
``` java
default void sort(Comparator<? extends E> c){
  Object[] a = this.toArray();
  Arrays.sort(a,(Comparator)c);
  ListIterator<E> i = this.listIterator();
  for (Object e : a){
    i.next();
    i.set((E)e );
  }
}


``` java
  public interface List<E> extends Collection<E> {
    int size();

    boolean isEmpty();

    boolean contains(Object o);

    Iterator<E> iterator();

    Object[] toArray();

    <T> T[] toArray(T[] a);

    boolean add(E e);

    boolean remove(Object o);

    boolean containsAll(Collection<?> c);

    boolean addAll(Collection<? extends E> c);

    boolean addAll(int index, Collection<? extends E> c);

    boolean removeAll(Collection<?> c);

    boolean retainAll(Collection<?> c);

    default void replaceAll(UnaryOperator<E> operator){
      Objects.requireNonNull(operator);

      final ListIterator<E> li = this.listIterator();
      while( li.hasNext()){
        li.set(operator.apply(li.next()));
      }
    }

    default void sort(Comparator<? extends E> c){
      Object[] a = this.toArray();
      Arrays.sort(a,(Comparator)c);
      ListIterator<E> i = this.listIterator();
      for (Object e : a){
        i.next();
        i.set((E)e );
      }
    }

    void clear();

    boolean equals(Object o);

    int hashCode();

    E get(int index);

    E set(int index, E element);

    void add(int index, E element);

    E remove(int index);

    int indexOf(Object o);

    int lastIndexOf(Object o);

    ListIterator<E> listIterator();

    ListIterator<E> listIterator(int index);

    List<E> subList(int fromIndex, int toIndex);

    @Override
    default Spliterator<E> Spliterator(){
      return Spliterators.spliterator(this,Spliterator.ORDERED);
    }
  }
```

```

- 先把List转换成数组
- 然后通过Arrays的静态方法传入数组和Comparator进行排序
- 获取迭代器,调用迭代器的next(),set()方法按序赋值

### Arrays

是一个工具类,包含了控制数组的各个方法
