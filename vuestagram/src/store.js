import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      name: "구예진",
      age: 33,
      likes: 30,
      좋아요눌렀니: false,

      //더보기 게시물
      more: {},
    };
  },

  //state 수정방법 정의하는 곳 -> state: 위에있는
  // vue가서  $store.commit('이름변경') 이런식으로
  mutations: {
    이름변경(state) {
      state.name = "뉴진스";
    },
    증가(state, data) {
      state.age += data;
    },

    좋아요(state) {
      if (state.좋아요눌렀니 == false) {
        state.likes += 1;
        state.좋아요눌렀니 = true;
      } else {
        state.likes--;
        state.좋아요눌렀니 = false;
      }
    },
    setMore(state, data) {
      state.more = data;
    },
  },

  // ajax 하는 곳 , 오래 걸리는 작업들
  actions: {
    //context는 그냥 store라고 보면됨
    getData(context) {
      axios.get(`https://codingapple1.github.io/vue/more0.json`).then((a) => {
        console.log(a.data);
        context.commit("setMore", a.data);
      });
    },
  },
});

export default store;
