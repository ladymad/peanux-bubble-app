<template>
  <view class="content">
    <view> </view>
  </view>
</template>

<script lang="ts">
import Bubble from "@/modal/Bubble";
import Vue from "vue";
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch,
} from "vue-property-decorator";

@Component
export default class PageThree extends Vue {
  // 初始化数据
  private bubble: Bubble[] = [];

  // 声明周期钩子
  // mounted() {}

  // 计算属性

  // 方法
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: black;
  background-image: radial-gradient(white 1%, black 80%, black);
  margin: 0px;
  height: calc(100vh - 44px - env(safe-area-inset-top));
  width: 100vw;
}
</style>
