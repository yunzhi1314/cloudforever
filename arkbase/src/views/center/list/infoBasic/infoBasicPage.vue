<template>
  <h1>infoBasicPage组件</h1>
</template>

<script>
import { dealActiveRoutes } from "@/hooks/route";
import url from "@/api/url";
import { getSelfList } from "@/api/arknight/centerPage/personaList";
import { toRefs } from "vue";

export default {
  name: "infoBasicPage",
  setup() {
    dealActiveRoutes()
    // getSelfList(url.centerPage.personalList.infoBasic)
    return {
      ...toRefs(getSelfList(url.centerPage.personalList.infoBasic))
    };
  },
};
</script>

<style lang="scss" scoped></style>
