import arknights from "../static/arknights.mjs";


export function home(req, res) {
  // 发送主页讯息以及动态路由
  res.send(arknights.personlCenter.home);
}
