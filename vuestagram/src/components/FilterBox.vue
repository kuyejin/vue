<template>
  <div @click="fire"
    :class="필터 + ' filter-item'"
    :style="`background-image:url(${이미지})`"
  >
    <slot></slot>

    <!-- slot 여러개 사용할때 -->
    <!-- 
    <slot name="a"></slot>
    <slot name="b"></slot>.
 -->

    <!-- slot props : 부모에게 데이터 보내기 -->
    <!-- <slot :msg="msg"></slot> -->

    <!-- 이벤트 발사 -->
    <button @click="fire">버튼</button>
  </div>

  <!-- <div
    :class="필터"
    class="filter-item"
    :style="`background-image:url(${이미지})`"
  ></div> -->
</template>

<script>
export default {
  name: "filterbox",
  data() {
    return {
      msa: "hello",
    };
  },

  methods: {
    fire() {
      this.emitter.emit("박스클릭함",this.필터); // 다른 컴포넌트로 이벤트 보냄,  main.js에 설정했던 라이브러리
    },
  },

  props: {
    이미지: String,
    필터: String,
  },
};
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>
