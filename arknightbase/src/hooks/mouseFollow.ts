export async function mouseFollow(dom: HTMLDivElement) {

  // 鼠标移动
    document.body.addEventListener("mousemove", (event: MouseEvent) => {
      dom.style.left = event.pageX - 20 + "px"
      dom.style.top = event.pageY - 20 + "px"
    })

}
