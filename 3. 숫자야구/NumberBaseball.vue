<!-- vue 파일 -->
<!-- HTML로 생각할 수도 있지만 결국 자바스크립트 -->

<template>
  <div>
    <h1>{{result}}</h1>
    <form @submit.prevent="onSubmitForm"> <!-- e.preventdefault가 자동 적용 -->
      <input ref="answer" maxlength="4" v-model="value"/>
      <button>입력</button>
    </form>
    <div>시도 : {{tries.length}}</div> <!-- 배열 길이 -->
    <ul>
      <li v-for="t in tries"> <!--배열의 값들을 표현하기 위해 v-for(반복문) 사용 -->
        <div>{{t.try}}</div>
        <div>{{t.result}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
const getNumbers = () => { // 랜덤으로 4개 숫자를 뽑는 것
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1){
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    //splice() : 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열 내용 변경
    //floor() : 주어진 숫자와 같거나 작은 정수 중에서 가장 큰수를 반환
    array.push(chosen);
  }
  return array;
}
export default { // 이게 import로 가져오는 곳
  data(){
    return{
      answer: getNumbers(), // 랜덤값 생성 ex) [1,4,5,6]- 배열
      tries:[],
      value:'',
      result: '',
    }
  },
  methods: {
    onSubmitForm(e){
      if(this.value === this.answer.join('')){ // 홈런인 경우(성공)
        this.tries.push({ // 객체를 저장
          try: this.value,
          result: '홈런',
        }); // 입력할때마다 tries에다가 값 추가하기
        this.result = '홈런',
            alert('게임을 다시 실행합니다.');
        this.value = '';
        this.tries = [];
        this.$refs.answer.focus();
      }else{ // 정답 틀렸을때
        if(this.tries.length >= 9){ // 10번 이상 틀렸을때
          this.result = `10번 넘게 틀려서 실패! 답은 ${this.answer.join(',')}였습니다.`
          alert('게임을 다시 시작합니다.');
          // 초기화
          this.value = '';
          this.answer = getNumbers();
          this.tries = [];
          this.$refs.answer.focus();
        }
        let strike = 0;
        let ball = 0;
        const answerArray = this.value.split('').map(v => parseInt(v)); // 문자열을 숫자로
        for (let i = 0; i < 4; i += 1){
          if(answerArray[i] === this.answer[i]){ // 숫자 자리수 모두 정답
            strike++;
          }else if(this.answer.includes(answerArray[i])) { // 숫자만 정답, includes() : 배열이 특정 요소를 포함하고 있는지 판별
            ball++;
          }
        }
        this.tries.push({
          try: this.value,
          result: `${strike} 스크라이크, ${ball} 볼입니다.`
        });
      }
      this.value = '';
      this.$refs.answer.focus();
    }
  },
};
</script>

<style>

</style>