<template>
  <div class="box">
    <ul>
      <li
        v-for="(item, index) in nav"
        :key="item.id"
        :class="{ active: num == index }"
        @click="handle(index, item)"
      >
        <i :class="item.icon"></i>{{ item.name }}
      </li>
    </ul>
    <div>
      <i class="el-icon-search"></i>
    </div>
  </div>
</template>

<script lang=ts>
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup() {
    // 动态绑定class =============================================================
    let num = ref<string>("0");
    //导航栏数据 ==============================================
    const nav = ref<any>([
      { id: 1, name: "首页", path: "/", icon: "el-icon-s-home" },
      { id: 2, name: "商品", path: "/goods", icon: "el-icon-s-cooperation" },
      { id: 3, name: "订单", path: "/order", icon: "el-icon-s-order" },
      { id: 4, name: "营销", path: "/marketing", icon: "el-icon-s-claim" },
      { id: 5, name: "会员", path: "/members", icon: "el-icon-s-custom" },
      { id: 6, name: "财务", path: "/financial", icon: "el-icon-money" },
      { id: 7, name: "数据", path: "/data", icon: "el-icon-s-data" },
      { id: 8, name: "店铺", path: "/store", icon: "el-icon-s-marketing" },
      { id: 9, name: "设置", path: "/setting", icon: "el-icon-setting" },
    ]);

    // 路由 =============================================================
    let router = useRouter();
    // 点击导航栏 =============================================================
    let handle = (index: any, item: any) => {
      num.value = index;
      sessionStorage.setItem("index", index);
      router.push(item.path);
    };

    onMounted(() => {
      let nums = sessionStorage.getItem("index");
      if (nums === null) {
        num.value = "0";
      } else {
        num.value = nums;
      }
    });
    return {
      nav,
      num,
      handle,
    };
  },
});
</script>

<style scoped lang='scss'>
.box{
  display: flex;
  justify-content:space-between;
  font-size: 18px;
  color: rgba(255, 255, 255);
  line-height: 60px;
}
ul {
  display: flex;
}
li {
  padding: 0 20px;
  cursor: pointer;
}
li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.active {
  background-color: rgba(255, 255, 255, 0.2) !important;
}
</style>