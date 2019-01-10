<template>
  <transition name="list">
    <slot></slot>
  </transition>
</template>

<style>
    .list-enter-active, .list-leave-active {
        transition: opacity .5s ease-out;
    }
    .list-enter, .list-leave-to {
        opacity: 0;
    }
</style>
