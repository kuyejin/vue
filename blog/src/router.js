import { createWebHistory, createRouter } from "vue-router";
import List from "./components/List.vue";
import Home from "./components/Home.vue";
import Detail from "./components/Detail.vue";
import Author from "./components/Author.vue";
import Comment from "./components/Comment.vue";
//import HelloWorld from "./components/HelloWorld.vue";

const routes = [
  {
    path: "/list",
    component: List,
  },
  {
    path: "/",
    component: Home,
  },
  {
    path: "/detail/:id",
    component: Detail,
    children: [
      {
        path: "author", //상대경로로
        component: Author,
      },
      {
        path: "comment",
        component: Comment,
      },

      //    hello 라는 경로로 들어가기 전에 뭔가 검사를 해주고 싶으면 beforeEnter 라는 항목
      //   {
      //     path: "/hello",
      //     component: HelloWorld,
      //     beforeEnter: ()=>{
      //       if (로그인했냐 == false) {
      //         return '/login'
      //       }
      //     }
      //   }
    ],
  },
  //   {
  //     path: "/:anythiing(.*)", // 모든 문자 들어올때
  //     component: Home,
  //   },
];

const router = createRouter({
  history: createWebHistory(),

  //  URL에 전부 #이 붙은 채로 시작 : codingapple.com/#/deta
  //   history: createWebHashHistory(),

  routes,
});

export default router;
