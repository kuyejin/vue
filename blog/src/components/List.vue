<template>
  <div>
    <!-- route : 현재경로 -->
    <h5 @click="$route.params.id">{{ 블로그글[0].title }}</h5>

    <!-- router : 페이지 이동관련 기능 -->
    <h5 @click="$router.push('/detail/0')">{{ 블로그글[0].title }}</h5>
    <h5 @click="$router.go(-1)">뒤로가기</h5>

    <router-link to="/detail/0"
      ><h5>{{ 블로그글[0].title }}</h5></router-link
    >
    <p>{{ 블로그글[0].date }}</p>
  </div>
  <br />
  <div>
    <router-link to="/detail/1">
      <h5>{{ 블로그글[1].title }}</h5></router-link
    >
    <p>{{ 블로그글[1].content }}</p>
  </div>
  <br />
  <div>
    <router-link to="/detail/2"
      ><h5>{{ 블로그글[2].title }}</h5></router-link
    >
    <p>{{ 블로그글[2].content }}</p>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    블로그글: Array,
  },
};
</script>

<style></style>
