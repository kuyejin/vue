<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click="step--">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <!--=======================[ vuex ]===============================-->
  <h4>{{ $store.state.name }}의 뷰 테스트</h4>

  <!--store.js에 있는 state 변경은 이렇게 하면 안됨 -->
  <!-- <button @click="$store.state.name = '박'">버튼</button> -->

  <!--commit() : mutations부탁 / store.js에 바꿔달라고 요청함 : 이름변경이란 함수 동작시켜주세요-->
  <!-- <button @click="$store.commit('이름변경')">버튼</button> -->

  <!-- <h4>{{ $store.state.age }}</h4> -->
  <!-- <button @click="$store.commit('증가')">버튼</button> -->
  <!-- <button @click="$store.commit('증가', 10)">증가버튼</button> -->
  <!--==============================================================-->

  <!--=======================[ action - ajax ]===============================-->
  <!-- <p>{{ $store.state.more }}</p> -->
  <!--dispatch():  action함수 부르는 것 -->
  <!-- <button @click="$store.dispatch('getData')">더보기버튼</button> -->
  <!--=======================================================================-->

  <!--=======================[ mapstate ]===============================-->
  <!-- <p>mapstate : {{ name }}</p> -->

  <!-- <p>{{ name }} {{ age }} {{ likes }}</p> -->
  <!-- <p>{{ 내이름 }}</p> -->
  <!--=======================================================================-->

  <!--=======================[ mapMutations ]===============================-->
  <!-- <button @click="증가(10)">mapMutations증가</button> -->
  <!--=======================================================================-->


  <!-- 컨테이너 props -->
  <Container
    :게시물="게시물"
    :step="step"
    :이미지="이미지"
    @write="작성한글 = $event"
  />

  <!--  <button @click="more">더보기</button>

 <p>{{ now() }} {{ 카운터 }}</p>
  <p>{{ now2 }} {{ 카운터 }}</p>
  <button @click="카운터++">버튼</button> -->

  <div class="footer">
    <ul class="footer-button-plus">
      <!-- 하나만 선택 / accept="image/*" 하면 이미지만-->
      <input @change="upload" type="file" id="file" class="inputfile" />
      <!-- 여러개 선택 -->
      <!-- <input @change="upload" multiple type="file" id="file" class="inputfile" /> -->
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

  <!-- tap 예시 -->
  <!--   
  <div v-if="step == 0">내용0</div>
  <div v-if="step == 1">내용1</div>
  <div v-if="step == 2">내용2</div>
  <button @click="step = 0">버튼0</button>
  <button @click="step = 1">버튼1</button>
  <button @click="step = 2">버튼2</button>
  <div style="margin-top: 500px"></div>
 -->
</template>

<script>
import Container from "./components/Container.vue";
import Postdata from "./assets/postdata.js";

import axios from "axios";
import { mapState, mapMutations, mapActions } from "vuex";

axios.get();
axios.post();

export default {
  name: "App",
  data() {
    return {
      게시물: Postdata,
      더보기: 0,

      step: 3,
      이미지: "",

      // Container.vue 데이터 저장
      작성한글: "",

      선택한필터: "",
      카운터: 0,
    };
  },

  // 자식에서 받은 이벤트 수신
  mounted() {
    this.emitter.on("박스클릭함", (a) => {
      this.선택한필터 = a;
    });
  },

  components: {
    Container,
  },

  computed: {
    //사용해도 실행되지 않는다 . 처음 실행하고 값을 간직함
    now2() {
      return new Date();
    },

    //  computed -> 꼭 retrurn을 적어줘야함
    name() {
      return this.$store.state.name;
    },
    age() {
      return this.$store.state.age;
    },

    //vuex state 한번에 꺼내 쓰려면 -> ...mapState
    ...mapState(["name", "age", "likes"]),
    ...mapState({ 내이름: "name" }), //name 데이터를  '내이름'에 넣음
  },

  
  methods: {
    ...mapMutations(["setMore", "좋아요", "증가"]),
    ...mapActions(["getData"]),

    // 사용할 때마다 실행됨
    now() {
      return new Date();
    },

    more() {
      axios
        .get(`https://codingapple1.github.io/vue/more${this.더보기}.json`)

        // .then(function (결과) {
        //   console.log(결과.data);
        // });

        .then((결과) => {
          console.log(결과.data);
          // array 에 데이터 추가 -> 데이터가 4개가 됨
          this.게시물.push(결과.data);
          this.더보기++;

          //데이터 전송 -> 성공하면 then() / 실패하면 catch()
          axios
            .post("URL", { name: "kim" })
            .then()
            .catch((err) => {
              err;
            });
        });
    },

    //사진 업로드
    upload(e) {
      let 파일 = e.target.files; //내가 업로드한 파일 다 담김
      console.log(파일); //파일전체
      console.log(파일[0]); //파일 0번째만
      console.log(파일[0].type); //파일 0번째의 타입알수 있음 -> image/png 이런식으로 나옴

      // 파일[0]의 url을 임시로 만들어 준다
      let url = URL.createObjectURL(파일[0]);
      console.log(url); // blob:http://localhost:8080/21145079-e057-4231-88ab-69d0c993f2b1 -> 임시 url
      // blob 이란?
      // 원래 이미지는 바이너리 데이터(0,1) -> 브라우저에서 다룰려면 BLOB이라는 object에 담아서 써야함

      // props로 보내기 위해
      this.이미지 = url;

      //다음 페이지로 넘기기
      this.step++;
    },

    //글 발행
    publish() {
      var 내게시물 = {
        name: "Kim Hyun",
        userImage: "https://picsum.photos/100?random=3",
        postImage: this.이미지, //내가 업로드한 이미지 URL
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.작성한글, //내가 입력한 글 -> Container.vue에 있음
        filter: this.선택한필터,
      };
      this.게시물.unshift(내게시물); // Array에 자료 넣어줌
      this.step = 0;
    },
  },
};
</script>

<style>
@import "style.css";

body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
