<template>
  <!-- <div v-if="1==2">
  안녕하세요1
</div>
<div v-else-if ="1 == 3">
  안녕하세요2
</div>
<div v-else>
  안녕하세요3
</div> -->

  <!--==============[ 모달창 - 자식 컴포넌트 ] ==================-->

  <!-- <Modal :데이터이름작명="데이터이름"/> -->
  <!-- 트랜지션 방법 1 -->
  <!-- <div class="start" :class="{end:모달창상태}">
    <Modal
      @closeModal="모달창상태 = false"
      :원룸들="원룸들"
      :누른거="누른거"
      :모달창상태="모달창상태"
    />
  </div> -->

  <!-- 트랜지션 방법2 -->
  <Transition name="fade">
    <Modal
      @closeModal="모달창상태 = false"
      :원룸들="원룸들"
      :누른거="누른거"
      :모달창상태="모달창상태"
    />
  </Transition>

  <div class="menu">
    <!-- 반복문 1-->
    <!-- <a v-for="작명 in 3" :key="작명">Home</a> -->

    <!-- 반복문 2 : 자료형 갯수만큼 반복문 돈다. 3개라서 3번 돈다-->
    <a v-for="a in 메뉴들" :key="a">{{ a }}</a>
    <!-- <a v-for="(a,i) in 메뉴들" :key="i">{{i}}</a> -->
  </div>

  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->

  <!-- <h1>{{logo}}</h1> -->

  <!-- ===============[ 컴포넌트 가져오기 ]============================-->
  <Discount />
  <!-- 
  <Discount v-bind="오브젝트" />
  <Discount :이름="오브젝트.name" :나이="오브젝트.age" /> 
-->

  <!-- 2초후에 사라짐 -->
  <Discount v-if="showDiscount == true" />

  <!-- ==========================[서버x 데이터]============================ -->
  <!--
  <div>
    <img src="./assets/room0.jpg" class="room-img">
    <h4 @click="모달창상태 = true" class="red" :style="스타일">{{ products[0] }}</h4>
    <p>{{ price[0] }}만원</p>
    
    //
    <button @click="신고수 += 1">클릭</button> <span>신고수 : {{ 신고수 }}</span> <br>
    <button @mouseover="신고수2 += 1">마우스오버</button> <span>신고수 : {{ 신고수2 }}</span><br> 
    <button @click="increase">함수사용</button> <span>신고수 : {{ 신고수3 }}</span> <br>
  //


    <button @click="신고들[0]++">신고</button> 
    <span>신고수 : {{ 신고들[0] }}</span> <br>
  </div>

  <div>
    <img src="./assets/room1.jpg" class="room-img">
    <h4> {{ products[1] }}</h4>
    <p>{{ price[1] }} 만원</p>
    <button @click="신고들[1]++">신고</button> 
    <span>신고수 : {{ 신고들[1] }}</span> <br>
  </div>

  <div>
    <img src="./assets/room2.jpg" class="room-img">
    <h4> {{ products[2] }}</h4>
    <p>{{ price[2] }} 만원</p>
    <button @click="신고들[2]++">신고</button> 
    <span>신고수 : {{ 신고들[2] }}</span> <br>
  </div>



  // 반복문 
  <div v-for="(a,i) in products" :key="i">
    <h4> {{products[i]}}</h4>
    <h4> {{a}}</h4> 
    <p>{{ price[i] }} 만원</p>
  </div>
  -->

  <!-- =================================[서버 데이터]======================================= -->
  <!-- 자식이 보낸 데이터는 $event 변수에 담겨있음 -> 원룸.id -->

  <button @click="priceSort">가격낮은순</button>
  <button @click="priceSort2">가격순높은순</button>
  <button @click="nameSort">가나다정렬</button>
  <button @click="sortBack">되돌리기</button>

  <Card
    @openModal="
      모달창상태 = true;
      누른거 = $event;
    "
    :원룸="원룸들[i]"
    v-for="(작명, i) in 원룸들"
    :key="작명"
  />

  <!-- <Card @click="모달창상태=true"  :원룸="원룸들[i]" v-for="(작명,i) in 원룸들" :key="작명"/> -->
  <!-- 
  <Card :원룸="원룸들[0]" />
  <Card :원룸="원룸들[1]" />
  <Card :원룸="원룸들[2]" />
  <Card :원룸="원룸들[3]" />
  <Card :원룸="원룸들[4]" />
  <Card :원룸="원룸들[5]" /> 
-->

  <!-- <div v-for="(작명,i) in 원룸들" :key="i">
    <img :src="원룸들[i].image" class="room-img">
    <h4 @click="모달창상태 = true; 누른거 = i " > {{ 원룸들[i].title }}</h4>
    <p>{{ 원룸들[i].price }}원</p>
  </div> -->

  <!-- 
  <div v-for="(작명,i) in 원룸들" :key="i">
    <img :src="작명.image" class="room-img">
    <h4> {{ 작명.title }}</h4>
    <p>{{ 작명.price }}원</p>
  </div> 
--></template>

<script>
// 서버에서 보낸 데이터 가져오기
import data from "./assets/oneroom.js";
import Discount from "./Discount.vue";
import Modal from "./Modal.vue";
import Card from "./Card.vue";

export default {
  name: "App",

  data() {
    return {
      price1: 60,
      price2: 70,
      logo: "테스트",
      스타일: "color:black",
      products: ["역삼동", "천호동", "마포구"],
      price: [10, 20, 30],
      메뉴들: [" Home", "Shop", "About"],
      신고수: 0,
      신고수2: 0,
      신고수3: 0,
      신고들: [0, 0, 0],
      모달창상태: false,

      //서버데이터
      원룸들: data, //array
      원룸들오리지널: [...data], //데이터 원본
      누른거: 0, //number

      오브젝트: { name: "kim", age: 20 },

      showDiscount: true,
    };
  },
  methods: {
    increase() {
      this.신고수3 += 1;
    },
    priceSort() {
      // var array = [3,5,2];
      // array.sort(function(a,b){
      //   return a-b;
      // });
      // console.log(array);

      this.원룸들.sort(function (a, b) {
        return a.price - b.price;
      });
    },

    priceSort2() {
      this.원룸들.sort(function (a, b) {
        return b.price - a.price;
      });
    },

    nameSort() {
      this.원룸들.sort(function (a, b) {
        return a.name - b.name;
      });
    },

    sortBack() {
      this.원룸들 = [...this.원룸들오리지널];
    },
  },

  created() {
    //서버에서 데이터 가져오는 코드
  },

  // 마운트 후에 뭔가 실행하고 싶을 때
  //서버에서 데이터 가져오는 코드
  mounted() {
    setTimeout(() => {
      this.showDiscount = false;
    }, 2000);
  },
  // 마운트 되기 전에 실행하고 싶을 때
  beforeMount() {},

  

  //컴포넌트 등록하기
  components: {
    Discount: Discount,
    Modal: Modal,
    Card: Card,
  },
};
</script>

<style>
.start {
  opacity: 0;
  transition: all 1s;
}
.end {
  opacity: 1;
}

.fade-enter-from {
  opacity: 0;
  /* transform :translateY(-1000px); */
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
  /* transform :translateY(0px); */
}

.fade-leave-from {
  opacity: 0;
}
.fade-leave-active {
  transition: all 1s;
}
.fade-leave-to {
  opacity: 1;
}

body {
  margin: 0;
}
div {
  box-sizing: border-box;
}

.discount {
  background: #eee;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}

.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}
.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

.room-img {
  width: 100%;
  margin-top: 40px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu {
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}
.menu a {
  color: white;
  padding: 10px;
}
</style>
