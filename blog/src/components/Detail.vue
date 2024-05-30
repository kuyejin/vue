<template>
  {{ $route.params.id }}
  <h4>여기는 디테일 페이지입니다.</h4>
  <h5>{{ 블로그글[$route.params.id].title }}</h5>
  <p>{{ 블로그글[$route.params.id].content }}</p>

  <!-- 작가소개 , 댓글 -->
<router-view></router-view>

</template>

<script>
export default {
  props: {
    블로그글: Array,
  },
};
</script>

<style></style>
