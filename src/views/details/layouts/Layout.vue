<template>
  <div style="overflow:hidden;background:url(../../../assets/bg.jpg)">
    <!-- 顶部 -->
    <div class="top"><child></child></div>
    <!-- 内容 -->
    <div class="content"><router-view></router-view></div>
    <!-- 侧边栏 -->
    <div class="side"><side></side></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import child from "../../../components/layout/Child.vue";
import side from "../../../components/layout/SideBar.vue";
export default defineComponent({
  name: "",
  props: {},
  components: { child, side },
  setup() {
    return {};
  },
});
</script>

<style scoped lang='scss'>
.top {
  position: fixed;
  right:0;
  width: calc(100% - 200px);
  height: 100px;
 background: #2C3643;
}
.side {
  position: fixed;
  top: 0;
  width: 200px;
  height: 100vh;
  background: #869;
}
.content{
  margin:100px 0 0 200px;
}
</style>