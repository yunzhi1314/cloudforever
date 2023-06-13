<template>
 <div>
    <section><span>手机换绑</span></section>
    <div>
      <section v-for="(item,index) in data " :key="index">
        <p>{{ item.title }}</p>
        <p> <input type="text" :placeholder="item.title"></p>
      </section>
    </div>
 </div>
</template>

<script>
export default {
  name: "changePhone",
  setup() {
    let telePhone = JSON.parse(sessionStorage.getItem('token')).telePhone
    console.log(telePhone)
    // 处理页面渲染数据
    const data = [
      {
        title:'新手机号',
        input:'输入新手机号'
      },{
        title:'验证码',
        input:'输入验证码'
      },{
        title:`验证当前手机号${telePhone}`,
        input:'输入当前手机号'
      }
    ]
    return {
    // 处理页面渲染数据
     data
    };
  },
};
</script>

<style lang="scss" scoped></style>
