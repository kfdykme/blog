---
title : Java Collection
date : 2018/10/23 10:44:00
tag :
- Java
- List
---

# Java Collection

``` java
  public interface Collection<E> extends Iterable<E>{
    int size();

    boolean isEmpty();

    boolean contains(Object o);

    @NotNull Iterable<E> iterator();

    @NotNull @Flow(sourceContainer = true ,targetContainer = true) Object[] toArray();

    @NotNull @Flow(sourceContainer = true ,targetContainer = true) <T> T[] toArray(@NotNull T[] a);

    @Contract(mutates="this") boolean add(E e);

    @Contract(mutates="this") boolean remove(Object o);

    boolean containsAll(@NotNull Collection<?> c);

    @Contract(mutates="this") boolean addAll(@NotNull @Flow(sourceContainer = true, targetContainer = true) Collection<? extends E> c);

    @Contract(mutates="this") boolean removeAll(@NotNull Collection<?> c);

    @Contract(mutates="this") default boolean removeIf(Predicate<? super E> filter){
      Object.requireNonNull(filter);
      boolean removed = false;
      final Iterator<E> each = iterator();
      while(each.hasNext()){
        if(filter.test(each.next())){
          each.remove();
          removed = true;
        }
      }

      return removed;
    }

    @Contract(mutates="this") boolean retainAll(@NotNull Collection<?> c);

    @Contract(mutates="this") void clear();

    boolean equals(Object o);

    int hashCode();

    @Contract(pure=true) @Override
    default Spliterator<E> spliterator(){ return Spliterators.spliterator(this,0);}

    @Contract(pure=true)
    default Stream<E> stream() { return StreamSupport.stream(spliterator(),false);}

    @Contract(pure=true)
    default Stream<E> parallelStream(){ return StreamSupport.stream(spliterator(),true);}
  }
```
