<template>
  <transition appear enter-class="hide" enter-active-class="slide-in" leave-active-class="slide-out" leave-to-class="hide" mode="out-in">
    <slot></slot>
  </transition>
</template>

<style>
  .hide {
    transform: translateX(20px);
    opacity: 0;
  }
  .slide-in {
    transition: all .5s;
  }
  .slide-out {
    transition: all .5s;
    opacity: 0;
  }
</style>
