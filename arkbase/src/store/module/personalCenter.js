import moment from "moment"

export default {
  namespaced: true,
  state() {
    return {
      token: null,
      userId: null,
      UID: null,
      email: null,
      ID: null,
      fullName: null,
      menus: null,
      menuMsg: null,
      baseMsg: null,
      contexts: null,
      renderContexts:null
    };
  },
  getters: {},
  mutations: {
    changeUserMsg(state, datas) {
      state.userId = datas.userId;
      state.UID = datas.UID;
    },
    changeToken(state, datas) {
      state.token = datas.token;
    },
    changeMenus(state, data) {
      state.menus = data;
    },
    changeMenuMsg(state, data) {
      state.menuMsg = data;
    },
    changeBaseMsg(state, data) {
      state.baseMsg = data;
    },
    changeContexts(state, data) {
      // 为了让刚进来的state成为数组的形式
      // 防止后面进来的state.context(已有数据)变成空数组
      if (state.contexts == null) {
        state.contexts = [];
      }

      // 为了集合用户输入的兑换码和请求到的礼包内容这两个数据
      let obj2;
      console.log(data)
      // 为了分离两个请求的数据 
      Reflect.has(data, "length")?
      // 为了判断拿到的兑换码是否为空
         data.length > 0 ?
          data.forEach((item) => {
            let obj = {};
            Reflect.set(obj, "context", item);
            state.contexts.push(obj);
          }) : ""
        : (obj2 = { ...data });

        // 为了防止obj2在开始的时候为空
      if (obj2) {
        // 获取兑换日期
        let time = moment().format("YYYY-MM-DD hh:mm:ss a")
        // 遍历兑换码，为了让礼包内容和兑换码一一对应添加
          state.contexts.forEach((item) => {
            if(obj2.context == item.context) {
              item.item = obj2.item
              item.time = time
            }  
          });

        }
    },
    changeRenderContexts(state, data) {
      // 进一步处理只需渲染的数据，形成真正所需的渲染树
      if(state.renderContexts == null){
        state.renderContexts = [] ;
      }

      state.renderContexts.push(...data.filter(item =>item.time))
      state.renderContexts = [...new Set(state.renderContexts)]
    },
  },
  actions: {},
};
