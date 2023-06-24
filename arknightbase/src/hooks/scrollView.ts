export function scrollToSection(viewId: string,top:number | string) {
  const view = document.getElementById(viewId)
  console.log(view) // 检查元素是否正确获取
  if (view) {
    console.log(top) // 检查元素的偏移量是否正确计算
    window.scrollTo({
      top,
      behavior: 'auto'
    })
  }
}
