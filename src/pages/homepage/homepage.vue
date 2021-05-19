<template>
  <view class="content">
    <view> </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import * as THREE from "three";

export default Vue.extend({
  data() {
    return {};
  },
  onLoad() {},

  mounted() {},

  methods: {
    init() {

    },
  },
});
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
