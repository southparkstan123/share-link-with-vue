<template>
  <transition name="list">
    <slot></slot>
  </transition>
</template>

<style>
    .list-leave { opacity: 1; }
    .list-leave-active { transition: opacity .5s }
    .list-leave-to { opacity: 0; }
    .list-enter { opacity: 0; }
    .list-enter-active  { transition: opacity .5s }
    .list-enter-to { opacity: 1; }
</style>
