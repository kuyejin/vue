<template>
  <!--==============[ 모달창 ] ==================-->
  <div class="black-bg" v-if="모달창상태 == true">
    <div class="white-bg">
      <img :src="원룸들[누른거].image" class="room-img" />
      <h4>{{ 원룸들[누른거].title }}</h4>
      <p>{{ 원룸들[누른거].content }}</p>

      <!-- 유저가 입력한 값을 데이터로 저장 / $event.target.value : 사용자가 입력한 값을 month에 저장 -->
      <!-- <input @input="month = $event.target.value"> -->
      <input v-model.number="month" />

      <!-- 인풋 큰 버전 -->
      <!-- <textarea v-model="month"></textarea> -->

      <!-- selectbox -->
      <!-- 
        <select v-model="month">
        <option>1개월</option>
        <option>2개월</option>
        <option>3개월</option>
        <option>4개월</option>
        <option>5개월</option>
        <option>6개월</option>
        <option>7개월</option>
        <option>8개월</option>
        <option>9개월</option>
        <option>10개월</option>
        <option>11개월</option>
        <option>12개월</option>
      </select> -->

      <!-- 체크박스  -->
      <!-- <input type="checkbox" v-model="month" /> -->

      <!-- <input type="range" min="1" max="12" /> -->

      <p>{{ month }}개월 선택 : {{ 원룸들[누른거].price * month }}</p>

      <!-- props는 read-only임 -> 받아온거 수정하면 큰일남 -->
      <button @click="$emit('closeModal')">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",

  data() {
    return {
      month: 1,
      data: 123,
    };
  },

  beforeUpdate() {
    if (this.month == 2) {
      alert("2개월은 너무 적음.. 안팝니다");
    }
  },

  watch: {
    month(a) {
      if (a >= 13) {
        alert("13 이상 입력하지 마세요");
      }
      if (isNaN(a) == true) {
        alert("숫자만 입력해주세요");
        this.month = 1;
      }
    },
  },

  props: {
    원룸들: Array,
    누른거: Number,
    모달창상태: Boolean,
  },
};
</script>

<style></style>
