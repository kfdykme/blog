---
title : Java AbstractSequentialList
date : 2018/10/25 20:16:00
tags :
- java
---


# Java AbstractSequentialList

这次源码比较短2333

可以看到,在AbstractSequentialList中实现了AbstractList中的抽象方法get和抛出UnsupportedOperationException的方法set,add,remove.

同时这些方法都通过listIterator()返回的迭代器实现,但是在AbstractSequentialList中的listIterator()是一个抽象方法,并没有实现.

# 源码

``` java
public abstract class AbstractSequentialList<E> extends AbstractList<E>{
  protected AbstractSequentialList{

  }

  public E get(int index){
    try{
      return listIterator(index).next();
    } catch(NuSuchElementException exc){
      throw new IndexOutOfBoundsException("index: "+index);
    }
  }

  public E set(int index, E element){
    try{
      ListIterator<E> e =listIterator(index);
      E oldVal = e.next();
      e.set(element);
      return oldVal;
    } catch(NoSuchElementException exc){
      throw new IndexOutOfBoundsException("index : "+index);
    }
  }

  public void add(int index, E element ){
    try{
      listIterator(index).add(element);
    } catch(NoSuchElementException exc){
      throw new IndexOutOfBoundsException("index: "+index);
    }
  }

  public E remove(int index){
    try{
      ListIterator<E> e = listIterator(index);
      E outCast = e.next();
      e.remove();
      return outCast;
    } catch(NoSuchElementException exc){
      throw new IndexOutOfBoundsException("index: "+index);
    }
  }

  public boolean addAll(int index, Collection<? extends E> c){
    try{
      boolean modified = false;
      ListIterator<E> e1 = listIterator(index);
      Iterator<? extends E> e2 = c.Iterator();
      while( e2.hasNext()){
        e1.add(e2.next());
        modified = true;
      }
      return modified;
    } catch(NoSuchElementException exc){
      throw new IndexOutOfBoundsException("index : "+index);
    }
  }

  public Iterator<E> iterator(){return listIterator();}

  public abstract ListIterator<E> listIterator(int index);
}
```
