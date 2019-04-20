<template>
  <transition name="list" mode="out-in">
    <slot></slot>
  </transition>
</template>

<style>
    .list-leave { opacity: 0; }
    .list-leave-active { transition: opacity .5s; opacity: 0; }
    .list-enter { opacity: 0; }
    .list-enter-active  { transition: opacity .5s }
</style>
