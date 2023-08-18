
interface FormData {
  basicMedical: Array<any>
  // 索引签名
  [propName: string]: Array<any>
}

interface Data {
  name: string
  data: Array<any>
}

export default {
  namespaced: true,
  state() {
    return {
        basicMedical: []
    }
  },
  mutations: {
    setMsg(state: FormData, data: Data) {
      state[data.name] = data.data
    }
  }
}
