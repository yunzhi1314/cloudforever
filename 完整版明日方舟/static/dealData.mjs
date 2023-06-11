export function deal(data, sliced) {
  let str2 = [...data.slice(3, sliced)].fill("*").join("");
  return data.replace(data.slice(3, sliced), str2);
}

// 身份证
export function checkCode(val) {
  var p =
    /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
  var code = val.substring(17);
  if (p.test(val)) {
    var sum = 0;
    for (var i = 0; i < 17; i++) {
      sum += val[i] * factor[i];
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      return true;
    }
  }
  return false;
}

// 处理研发进度与进度数字的转换
export function processNumber(val) {
  let { id, process, ...userinfo } = val;
  let processArr = ["Ia", "Ib_II", "III", "NDA", "market"];

  function dealUserinfo(i) {
    processArr.forEach((item, index) => {
      if (index > i) {
        Reflect.set(userinfo, item, "");
      } else {
        Reflect.set(userinfo, item, 100);
      }
    });
  }

  switch (process) {
    case "":
      processArr.forEach((item) => {
        Reflect.set(userinfo, item, "");
      });
      break;
    case 20:
      dealUserinfo(0);
      break;
    case 40:
      dealUserinfo(1);
      break;
    case 60:
      dealUserinfo(2);
      break;
    case 80:
      dealUserinfo(3);
      break;
    case 100:
      dealUserinfo(4);
      break;
  }

  console.log(userinfo)
  return userinfo
}
