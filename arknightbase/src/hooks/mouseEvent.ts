
// 鼠标移动
export async function mouseFollow(dom: HTMLDivElement) {

    document.body.addEventListener("mousemove", (event: MouseEvent) => {
      dom.style.left = event.pageX - 20 + "px"
      dom.style.top = event.pageY - 20 + "px"
    })

}

/* 
// 控制圆球移入移出函数
export function mouseEnter(){



    return {
      isEnter
    }
} */