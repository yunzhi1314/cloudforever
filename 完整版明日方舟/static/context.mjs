export function exchangeContext(){
    // 思路： 随机生成5个动态的兑换码，其一发给学生，其二存入数据库(题号,每个兑换码1-3题选择题不等),当学生输入兑换码时，兑换题目。
    const arr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    const arr3 = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0]
    const arr2 = new Array(26).fill(0).map((item,index) => {
          if(index % 2 == 0){
              item = arr3[index]
          }else{
            item = arr[index]
          }
          return item
    })
    let num = Math.ceil(Math.random()*5)

    const arr4 = [...new Set(new Array(num).fill(0).map(item => {
      return new Array(16).fill(0).map((item,index)=>{
          index = Math.ceil(Math.random()*26)
          item = arr2[index]
          return item
      }).join("").toLocaleUpperCase()
    }))]

    const arr5 = new Array(arr4.length).fill(0).map(
      item => [...new Set(new Array(Math.ceil(Math.random()*5)).fill(0).map(
      item => Math.ceil(Math.random()*100)
      ))]
    )
    return {
      arr4,
      arr5
    }
  }