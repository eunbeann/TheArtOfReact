- 리덕스는 가장 많이 사용하는 리액트 상태 관리 라이브러리
- 컴포넌트의 상태 업데이트 관련 로직을 다른 파일로 분리시켜서 더욱 효율적으로 관리할 수 있음.
- 컴포넌트끼리 똑같은 상태를 공유해야 할 때도 여러 컴포넌트를 거치지 않고 손쉽게 상태 값을 전달하거나 업데이트할 수 있음.
- 리덕스 라이브러리는 전역 상태 관리시에 효과적
- 단순히 전역 상태 관리만 한다면 Context API도 충분하지만 리덕스를 사용하면 더욱 체계적인 상태 관리가 가능해 규모가 큰 프로젝트에는 리덕스 사용하는 것이 좋다..
- 코드의 유지 보수성 ↑, 작업 효율 극대화
- 편리한 개발자 도구 지원, 미들웨어 기능 제공으로 비동기 작업을 효율적으로 진행해줌

1. 핵심 키워드 알아보기
2. Parcel로 프로젝트 구성하기
3. 토글 스위치와 카운터 구현하기

## 16.1. 개념 정리

- 개념 정리 우선, 이해 안되는 부분은 직접 사용 후에 다시 돌아와서 읽어보자!

### 16.1.1. 액션

- 상태의 변화가 필요할 때 액션(action) 발생.
- 하나의 객체로 표현

```jsx
{
  type: "TOGGLE_VALUE";
}
```

- 액션 객체는 type 필드를 반드시 가지고 있어야 함.
  - 이 값은 액션의 이름
- 그 외의 값들은 상태 업데이트 시에 참고할 값이며, 작성자 임의로 추가 가능.

- **액션 예시**

```jsx
{
	type: 'ADD_TODO',
	data: {
		id: 1,
		text: '리덕스 배우기'
	}
}

{
	type: 'CHANGE_INPUT'.
	text: '안녕하세요'
}

```

### 16.1.2. 액션 생성 함수

- 액션 생성 함수(action creator)는 액션 객체를 만들어주는 함수

```jsx
function addTodo(data) {
  return {
    type: "ADD_TODO",
    data,
  };
}

//화살표 함수로도 가능
const changeInput = (text) => ({
  type: "CHANGE_INPUT".text,
});
```

- 어떤 변화를 일으켜야할 때 마다 액션 객체 만들어야 하는데
  매번 작성하기 번거롭고, 작성 시에 실수로 정보를 놓칠수도 있어
  **함수로 만들어서 관리**

### 16.1.3. 리듀서

- 리듀서(Reducer)는 변화를 일으키는 함수
- 액션을 만들어서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아 온다.
- 두 값을 참고하여 새로운 상태를 만들어서 반환해줌.
- 리듀서 코드의 형태
  ```jsx
  const initialState = {
    counter: 1,
  };
  function reducer(state = initialState, action) {
    switch (action.type) {
      case INCREMENT:
        return {
          counter: state.counter + 1,
        };
      default:
        return state;
    }
  }
  ```

### 16.1.4. 스토어

- 프로젝트에 리덕스를 적용하기 위해 스토어(store) 만들기
- **한 개의 프로젝트는 단 하나의 스토어만 가질 수 있음.**
- 스토어 안에는 현재 애플리케이션 상태와 리듀서가 들어가 있으며, 그 외에도 몇 가지 중요한 내장 함수를 지님

### 16.1.5. 디스패치

- 디스패치(dispatch)는 스토어의 내장 함수 중 하나.
- 디스패치는 ‘액션을 발생시키는 것’이라고 이해하면 됨.
- 함수는 dispatch(action)과 같은 형태로 액션 객체를 파라미터로 넣어서 호출
- 이 함수 호출 시 스토어는 리듀서 함수를 실행시켜 새로운 상태를 만들어 줌

### 16.1.6. 구독

- 구독(subscribe)도 스토어의 내장 함수 중 하나.
- subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출 시, 이 리스너 함수가 액션이 디스패치되어 상태가 업데이트 될 때마다 호출됨.

```jsx
const listener = () => {
  console.log("상태가 업데이트됨");
};
const unsubscribe = store.subscribe(listener);

unsubscribe();
```

## 16.2. 리액트 없이 쓰는 리덕스

- 리덕스는 리액트에 종속되는 라이브러리가 아님.
- 리액트에서 사용하려고 만들었졌으나 실제로는 다른 UI 라이브러리/프레임워크와 함께 사용 가능. (angular-redux, ember redux, —- +바닐라 자바스크립트와 함께도 가능 )

바닐라 자바스크립트 환경에서 리덕스를 사용해 핵심 기능과 작동 원리 이해하기

### 16.2.1. Parcel로 프로젝트 만들기

- 프로젝트 구성으로 Parcel 사용.
- 이 도구를 사용해서 아주 쉽고 빠르게 웹 애플리케이션 프로젝트 구성 가능

```jsx
$yarn global add parcel-bundler
# yarn global이 설치되지 않는다면 npm install -g parcel -bundler 사용
```

프로젝트 디렉터리 생성 후 package.json 파일 생성

```jsx
$ mkdir vabilla-redux
$ cd vailla-redux
# package.json 파일 생성
$ yarn init -y
```

에디터로 해당 디렉터리를 열어서 index.html과 index.js 파일 만들기

```jsx
//index.html

<html>
  <body>
    <div> 바닐라 자바스크립트 </div>
    <script src="./index.js"></script>
  </body>
</html>
```

```jsx
//index.js

conosole.log("hello parcel");
```

전부 작성 후 명령어를 실행하면 개발용 서버가 실행됨

```jsx
$ parcel index.html
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bb21b8fa-ab0d-4b53-a568-82a6b9c0e872/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dcc89461-7e24-4e9d-9027-51272ac8a8d4/Untitled.png)

yarn 으로 리덕스 모듈을 설치한다.

```jsx
$ yarn add redux
```

### 16.2.2 간단한 UI 구성하기

```jsx
//index.css

.toggle {
    border: 2px solid black;
    width: 64px;
    height: 64px;
    border-radius: 32px;
    box-sizing: border-box;
}

.toggle.active {
    background: yellow;
}
```

```jsx
//index.html

.toggle {
    border: 2px solid black;
    width: 64px;
    height: 64px;
    border-radius: 32px;
    box-sizing: border-box;
}

.toggle.active {
    background: yellow;
}
```

간단한 UI 구성 완료

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5bd1d088-3982-4d22-a3e7-02f83ddd22df/Untitled.png)

### 16.2.3. DOM 레퍼런스 만들기

UI를 관리할 별도의 라이브러리를 사용하지 않기 때문에 DOM을 직접 수정

자바스크립트 파일 상단에 수정할 DOM 노드를 가리키는 값을 미리 선언.

```jsx
//index.js

const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");
```

### 16.2.4. 액션 타입과 액션 생성 함수 정의

**액션** : 프로젝트 상태의 변화를 일으키는 것

액션의 이름을 정의

- 액션 이름은 대문자의 문자열 형태로 고유하게 작성
  - 중복될 경우 의도치 않은 결과가 발생할 수도 있음.

```jsx
// index.js

const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

const TOGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
```

- 이 액션 이름을 사용하여 액션 객체를 만드는 액션 생성 함수를 작성
- 액션 객체는 TYPE을 반드시 가지고 있어야 하며, 그 외에 추후 상태를 업데이트할 때 참고하고 싶은 값은 임의로 넣을 수 있음

```jsx
// index.js

const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

const TOGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

const toggleSwitch = () => ({ type: TOGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });
```

### 16.2.5. 초깃값 설정

- 이 프로젝트에서 사용할 초깃값 정의

  - 형태는 자유 (숫자 O, 문자열 O, 객체 O )

  ```jsx
  // index.js

  const divToggle = document.querySelector(".toggle");
  const counter = document.querySelector("h1");
  const btnIncrease = document.querySelector("#increase");
  const btnDecrease = document.querySelector("#decrease");

  const TOGLE_SWITCH = "TOGGLE_SWITCH";
  const INCREASE = "INCREASE";
  const DECREASE = "DECREASE";

  const toggleSwitch = () => ({ type: TOGLE_SWITCH });
  const increase = (difference) => ({ type: INCREASE, difference });
  const decrease = () => ({ type: DECREASE });

  const initialState = {
    toggle: false,
    counter: 0,
  };
  ```

### 16.2.6. 리듀서 함수 정의

- 리듀서는 변화를 일으키는 함수
- 함수의 파라미터로는 state와 action 값 받아오기

```jsx
// index.js

const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

const toggleSwitch = () => ({ type: TOGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

const initialState = {
  toggle: false,
  counter: 0,
};

// state가 undefined일 떄는 initialState를 기본값으로 사용
function reducer(state = initialState, action) {
  // action.type에 따라 다른 작업을 처리
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, //불변성 유지
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}
```

- 리듀서 함수가 제일 처음 호출될 때의 state 값이 undefined.
- 해당 값이 undefinded로 주어졌을 때는 initialState를 기본값으로 설정하기 위해 함수의 파라미터 쪽에 기본값이 설정되어 있음.
- 리듀서는 상태의 불변성을 유지하면서 데이터에 변화 필요
- 이 작업시에 spread 연산자 (…)를 사용하면 편하다.
  - 객체 구조가 복잡해지면 (ex. object.something.inside.value) spread 연산자로 불변성을 관리하며 업데이트하는 것이 번거로우므로 **리덕스 상태는 최대한 깊지 않은 구조로 진행**해야 함.
- 객체의 구조가 복잡해지거나 배열도 함께 다룰 경우 immer 라이브러리를 사용하면 쉽게 리듀서 작성 가능.

### 16.2.7. 스토어 만들기

- 스토어를 만들 때는 createStore 함수를 사용
  - createStore에 취소선 그어짐
    npm remove redux react-redux 한 다음에
    npm install redux@4.1.2 react-redux 합시다
- 코드 상단에 import 구문을 넣어 리덕스에서 해당 함수를 불러와야 하고, 함수의 파라미터에는 리듀서 함수를 넣어야함.

```jsx
const { createStore } = require("redux");

...

const store = createStore(reducer);
```

- 스토어를 생성했으니 스토어 내장 함수들을 사용하자

### 16.2.8. render 함수 만들기

- render 함수는 상태가 업데이트 될 때마다 호출
- 리액트의 render 함수와는 다르게 이미 html을 사용하여 만들어진 UI 속성을 상태에 따라 변경해줌
  - 리액트의 render 함수는 ?
    html 형식의 문자열을 반환하지 않고, 뷰가 어떻게 생겼고 어떻게 작동하는지 정보를 지닌 객체를 반환한다.
    [https://velog.io/@zeebeck/render-함수](https://velog.io/@zeebeck/render-%ED%95%A8%EC%88%98)

```jsx
(...)

const store = createStore(reducer);

const render = () => {
    const state = store.getState(); //현재 상태를 불러옵니다.
    // 토글 처리
    if (state.toggle) {
        divToggle.classList.add('active');
    } else {
        divToggle.classList.remove('active');
    }
    // 카운터 처리
    counter.innerText = state.counter;
}

render();
```

### 16.2.9. 구독하기

- 스토어의 상태가 바뀔 때마다 방금 만든 reduer 함수가 호출되도록 할 것.
- 이 작업은 스토어의 내장 함수 subscribe를 사용하여 수행할 수 있음.
- subscribe 함수의 파라미터로는 함수 형태의 값 전달
  - 이렇게 전달된 함수는 추후 액션이 발생하여 상태가 업데이트될 때마다 호출됨

```jsx
// 예시코드

const listener = () => {
  console.log("상태가 업데이트됨");
};
const unsubscribe = store.subscribe(listener);

unsubscribe(); // 추후 구독을 비활성화할 때 함수 추출
```

- 이번 프로젝트에서는 subscribe 함수를 직접 사용
- 추후 리액트 프로젝트에서 리덕스를 사용할 때는 이 함수를 직접 사용하지 않을 것
  - 컴포넌트에서 리덕스 상태를 조회하는 과정에서 react-redux라는 라이브러리가 이 작업을 대신함.
- 상태가 업데이트 될 때마다 함수를 호출하도록 코드를 작성하자

```jsx
const store = createStore(reducer);

const render = () => {
    const state = store.getState(); //현재 상태를 불러옵니다.
    // 토글 처리
    if (state.toggle) {
        divToggle.classList.add('active');
    } else {
        divToggle.classList.remove('active');
    }
    // 카운터 처리
    counter.innerText = state.counter;
}

render();
**store.subscribe(render);**
```

### 16.2.10. 액션 발생시키기

- 액션을 발생 시키는 것 : 디스패치
- 디스패치를 할 때는 스토어의 내장 함수 disdpatch를 사용함.
  파라미터는 액션 객체를 넣어 주면 됨.
- 다음과 같이 각 DOM 요소에 클릭 이벤트를 설정
  - 이벤트 함수 내부에서는 dispatch 함수를 사용하여 액션을 스토어에게 전달

```jsx
(...)

divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
};
divToggle.onclick = () => {
    store.dispatch(increase(1));
};
divToggle.onclick = () => {
    store.dispatch(decrease());
};
```

```jsx
//index.js
divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
  store.dispatch(decrease());
};

const { createStore } = require("redux");

const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

const toggleSwitch = () => ({ type: TOGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

const initialState = {
  toggle: false,
  counter: 0,
};

// state가 undefined일 떄는 initialState를 기본값으로 사용
function reducer(state = initialState, action) {
  // action.type에 따라 다른 작업을 처리
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, //불변성 유지
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

const render = () => {
  const state = store.getState(); //현재 상태를 불러옵니다.
  // 토글 처리
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }
  // 카운터 처리
  counter.innerText = state.counter;
};

render();
store.subscribe(render);

divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
  store.dispatch(decrease());
};
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e118eebf-9e42-49f9-a554-1d2428a9dcf4/Untitled.png)

- 모두 제대로 작동하는 걸 확인 후 **개념을 다시 훑어보기**

## 16.3. 리덕스의 세 가지 규칙

- 리덕스 프로젝트에서 사용할 때 지켜야 하는 세 가지 규칙

### 16.3.1. 단일 스토어

- 하나의 애플리케이션 안에는 하나의 스토어가 있음.
- 여러 개의 스토어를 만들 수는 있지만 상태 관리가 복잡해져 권장하지 않음.

### 16.3.2. 읽기 전용 상태

- 리덕스 상태는 읽기 전용.
- **기존 리액트**에서 setState를 사용해 state를 업데이트할 때도 객체나 배열을 업데이트하는 과정에서 불변성을 지켜 주기 위해 spread 연산자를 사용하거나 immer와 같은 불변성 관리 라이브러리를 사용한 것 처럼
  **리덕스**도 상태를 업데이트할때에는 기존의 객체는 건드리지 않고 새로운 객체를 생성해 주어야 함.
- 리덕스에서 불변성을 유지해야하는 이유
  - 내부적으로 데이터가 변경되는 것을 감지하기 위해 얕은 비교(shallow equality) 검사를 진행
  - 객체의 변화를 감지할 때, 객체의 깊숙한 안쪽까지 비교하는 것이 아니라 겉핥기 식으로 비교하요 좋은 성능 유지 가능

### 16.3.3. 리듀서는 순수한 함수

- 변화를 일으키는 르듀서 함수는 순수한 함수여야 함. 순수한 함수는 다음 조건을 만족한다.
  - 리듀서 함수는 이전 상태와 액션 객체를 파라미터로 받음
  - 파라미터 외의 값에는 의존하면 안됨.
  - 이전 상태는 절대로 건드리지 않고, 변화를 준 새로운 상태 객체를 만들어서 반환함.
  - 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과 값을 반환해야함.
- 리듀서 함수를 만들때에는 위 네 가지 사항을 주의해야함.
  - ex) 리듀서 함수 내부에서 랜덤 값을 만들거나 Date 함수를 사용하여 현재 시간을 가져오거나, 네트워크 요청을 한다면, 파라미터가 같아도 다른 결과를 만들어 낼 수 있어 사용하면 안됨 ⇒ 리듀서 함수 바깥에서 처리해야함.
    - 액션을 만드는 과정, 리덕스 미들웨어에서 처리
    - 주로 네트워크 요청과 같은 비동기 작업은 미들웨어를 통해 관리함.
