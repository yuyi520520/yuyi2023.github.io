import { createStore } from 'vuex'
const store = createStore({
    state: {
        userInfo: {
            nickName: "",
            avater: "",
        }
    },
    mutations: {
        updateUserInfo (state,userInfo) {    //智能接收两个参数，用于修改STORE的值
            state.userInfo = userInfo;
        },
    },
    actions: {},
})
export default store