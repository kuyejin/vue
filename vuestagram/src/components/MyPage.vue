<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input placeholder="?" />
    <div class="post-header" v-for="(a, i) in follower" :key="i">
      <div class="profile" :style="`background-image: url(${a.image})`"></div>
      <span class="profile-name">{{ a.name }}</span>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, reactive, toRefs, watch, computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default {
  name: "mypage",
  props: {
    one: Number,
    two: Number,
  },

  data() {
    return {};
  },

  // composition API
  // setup - Composition api 를 사용하기 위해 꼭 선언해주어야 하는 옵션
  //option 에서 사용한 모든 기능들을 사용할 수 있습니다.
  setup(props) {
    //[data]
    //[ref] 데이터 생성 -> 무조건 ref써야햠 / 오브젝트안에 가둔다
    let follower = ref([]);

    //[reactive] - object, array 같은 reference data type
    let test = reactive({ name: "kim" });
    console.log(test.value);

    //[props]
    let { one, two } = toRefs(props);
    console.log(one.value);
    console.log(two.value);

    //[watch]
    watch(one, () => {});

    //[computed]
    let 결과 = computed(() => {
      // 0나오는 이유 -> computed값은 ajax요청 전 값을 가져오기 때문에 -> 다른 곳으로 옮겨야함
      return follower.value.length;
    });
    console.log(결과.value);

    //[vuex]
    let store = useStore();
    console.log(store.state.name);
    //console.log(store.commit());

    // [method] 만드는 법 - composition API안에서
    function doThis() {
      console.log("검색기능");
    }

    //Lifecycle Hook 쓰려면 On라이트사이클함수명 (()=> {실행할 코드})
    onMounted(() => {
      // composition API안에서 Ajax요청 & 데이터 변경하려면
      // 데이터 수정하려면 데이터.value를 수정해야함
      // 오브젝트안에 값을 넣어야 하므로 .value 써줘야함
      axios.get("/follower.json").then((a) => {
        follower.value = a.data;
      });
    });

    // 밖에서 쓸라면 return 을 해주어야함. 매우 중요.
    return { follower, doThis };

    // props 쓰고 싶다면
  },
};
</script>

<!-- vue 파일들에 있던 css는 하나로 합쳐짐 / 싫으면 <style scoped></style> -->
<style scoped></style>
