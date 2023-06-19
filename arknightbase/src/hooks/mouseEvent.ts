
// 鼠标移动
export async function mouseFollow(dom: HTMLDivElement) {

    document.body.addEventListener("mousemove", (event: MouseEvent) => {
      dom.style.left = event.pageX - 20 + "px"
      dom.style.top = event.pageY - 20 + "px"
    })

}
