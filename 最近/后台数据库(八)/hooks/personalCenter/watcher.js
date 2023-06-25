import { watch } from "vue";

// 封装监视账号、密码的输入的函数，如果输入格式正确，就不报错
// 每次点击之后都重新渲染更新监视对象
export function observer(arr) {
  arr.forEach((item) => {
    watch(item, (newValue) => {
      // 判断输入框的值是否为空
      if (item.value == "") {
        item.isShow = true;
        // 判断是否利用正则来判断报错
      } else if (item.zz) {
        // 判断是否符合正则，符合正则隐藏报错
        if (item.zz.test(newValue.value)) {
          item.isShow = false;
        } else if (!item.zz.test(newValue.value)) {
          item.isShow = true;
        }
      } else {
        // 判断正确密码的框,利用确定密码的值是否与密码值相等
        if (newValue.value == arr[1].value) {
          item.isShow = false;
        } else {
          item.isShow = true;
        }
      }
    });
  });
}
