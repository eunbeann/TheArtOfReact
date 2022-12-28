# 리덕스를 사용하여 리액트 애플리케이션 상태 관리하기

- 리덕스를 이용하여 리액트 애플리케이션 상태를 관리
- 소규모 프로젝트에서는 컴포넌트가 가진 state를 사용하는 것만으로도 충분하지만 , 프로젝트의 규모가 커질수록 번거로워짐.

- 리덕스를 사용하면
  - 상태 업데이트에 대한 로직을 모듈로 따로 분리하여 컴포너틑 파일과 별개로 관리할 수 있어 코드를 유지 보수하는 데 도움이 됨
  - 여러 컴포넌트에서 동일한 상태를 공유해야할 때 매유 유용
  - 실제 업데이트가 필요한 컴포넌트만 리렌더링되도록 쉽게 최적해 줄 수도 있음.
- **바닐라 자바스크립트**에서는 스토어의 내장 함수인 store.dispatch 와 store.subscribe를 사용했지만
  **리액트 애플리케이션**에서 리덕스를 사용할 때는 store 인스턴스를 직접 사용하기 보다는 주료 react-redux라는 라이브러리에서 제공하는 유틸 함수 (connect)와 컴포넌트(Provider)를 사용하여 리덕스 관련 작업을 처리함.

1. 프로젝트 준비
2. 프레젠테이셔널 컴포넌트 작성
3. 리덕스 관련 코드 작성
4. 컨테이너 컴포넌트 작성
5. 더 편하게 사용하는 방법?
6. connect 대신 Hooks 사요앟기

## 17.1. 작업 환경 설정

- 리액트 프로젝트를 생성, 해당 프로젝트에 리덕스 적용

`$ yarn create react-app react-redux-tutorial`

yarn 명령어로 리덕스와 react-redux 라이브러리를 설치한다.

`$ cd react-redux-tutorial`

`$ yarn add redux react-redux`

Preiiter을 적용하고 싶다면 디렉터리에 .prettierrc 파일 작성

```jsx
{
    "singleQuote": true,
    "semi": true,
    "useTabs": false,
    "trailingComma": "all",
    "printWidth": 80
}
```

## 17.2. UI 준비하기

- 리액트프로젝트에서 가장 많이 사용하는 패턴은
- **프레젠테이셔널 컴포넌트**와 **컨테이너 컴포넌트** 분리하기
  - **프레젠테이셔널 컴포넌트** : 상태 관리 없이 props를 받아와서 화면에 UI를 보여주기만 하는 컴포넌트
  - **컨테이너 컴포넌트** : 리덕스와 연동되어 있는 컴포넌트, 리덕스로부터 상태를 받아오기도 하고, 리덕스 스토어에 액션을 디스패치하기도 함.
- 리덕스에 필수 사항은 아니지만 이 패턴을 사용해 코드의 재사용성을 높이고, 관심사의 분리가 이뤄져 UI를 집중해서 작성할 수 있음.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6693bc49-965e-4700-9fff-617740806cc5/Untitled.png)

- UI에 관련된 프레젠테이셔널 컴포넌트는 src/components 경로에 저장하고,
  리덕스와 연동된 컨테이너 컴포넌트는 src/containers 컴포넌트에 작성

### 17.2.1. 카운터 컴포넌트 만들기

- 숫자를 더하고 뺄 수 있는 카운터 컴포넌트를 만들기

```jsx
// src/components/Counter.js

import React from "react";

const Counter = ({ number, onIncrease, onDecrease }) => {
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  );
};

export default Counter;
```

App 컴포넌트에서 렌더링하기

```jsx
// App.js

import "./App.css";
import Counter from "./components/Counter";

function App() {
  return (
    <div>
      <Counter number={0} />
    </div>
  );
}

export default App;
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4156664f-1926-41b7-89f2-37b41354c0b2/Untitled.png)

### 17.2.2. 할 일 목록 컴포넌트 만들기

- 해야 할 일을 추가, 체크, 삭제하는 할 일 목록 컴포넌트 생성

```jsx
//components/Todos.js

import React from "react";

const TodoItem = ({ todo, onToggle, onRemove }) => {
  return (
    <div>
      <input type="checkbox" />
      <span>예제 텍스트</span>
      <button>삭제</button>
    </div>
  );
};

const Todos = ({
  input, //인풋에 입력되는 텍스트
  todos, // 할 일 목록이 들어 있는 객체
  onChangeInput,
  onInsert,
  onToggle,
  onRemove,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input />
        <button type="submit">등록</button>
      </form>
      <div>
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </div>
    </div>
  );
};

export default Todos;
```

- 한 파일에 두 컴포넌트 생성. 분리해도 괜찮아
- props는 나중에 사용

```jsx
// App.js

import "./App.css";
import Counter from "./components/Counter";
import Todos from "./components/Todos";

function App() {
  return (
    <div>
      <Counter number={0} />
      <hr />
      <Todos />
    </div>
  );
}

export default App;
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5c41888b-f77b-4d09-a74b-e65087b7a695/Untitled.png)

## 17.3. 리덕스 관련 코드 작성하기

- 프로젝트에 리덕스를 사용해보자!!
- 리덕스 사용시에는
  - 액션타입, 액션 생성 함수, 리듀서 코드를 작성해야함.
  - 각각 다른 파일에 작성할 수도, 기능별로 묶어서 파일 하나에 작성할수도 있음.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d0704b08-c413-4ed1-9d3d-c2c2edcd07b7/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/78b4c557-fb86-482d-b1c5-ad577a890c22/Untitled.png)

- 정해진 방법이 없어 마음대로 작성해도 되지만, 위 두가지가 가장 대중적.
- 우리 프로젝트는 Ducks로 코드 작성

### 17.3.1. counter 모듈 작성

- Ducks 패턴을 사용하여 액션 타입, 액션 생성 함수, 리듀서를 작성한 코드를 ‘모듈’이라고 함.
  - counter 모듈을 작성해 보자

**17.3.1.1. 액션 타입 정의하기**

- modules 디렉터리를 생성하고 그 안에 counter.js 파일을 다음과 같이 작성함.

```jsx
//src/modules/counter

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
```

- 액션 타입 정의
- 액션 타입은 대문자로 정의, 문자열 내용 ‘모듈 이름/액션 이름’과 같은 형태로 작성
- 문자열 안에 모듈 이름을 넣음으로써 나중에 프로젝트가 커졌을 때 액션의 이름이 충돌되지 않도록 함.
  - ex) SHOW, INITIALIZE라는 이름을 가진 액션은 중복되기 쉬움

**17.3.1.2. 액션 생성 함수 만들기**

- 액션 타입을 정의한 다음에는 액션 생성 함수를 만들어 주기

```jsx
//src/modules/counter

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
```

- 더 필요하거나 추가할 값이 있으면 위와 같이 만들면 됨.
- export 라는 키워드가 들어간다는 점 주의하기 !!

**17.3.1.3. 초기 상태 및 리듀서 함수 만들기**

- 이제 counter 모듈의 초기 상태와 리듀서 함수 만들어주기

```jsx
//src/modules/counter

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

const initialState = {
  number: 0,
};

function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1,
      };
    case DECREASE:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
}

export default counter;
```

- 모듈의 초기 상태에는 number 값을
- 리듀서 함수에는 현재 상태를 참조하여 새로운 객체를 생성해서 반환하는 코드를 장성

- export 는 여러개를 내보낼 수 있고, export default는 단 한개만을 내보낼 수 있음.
  ```jsx
  // 불러오는 방식도 다름

  import counter from "./counter";
  import { increase, decrease } from "./counter";
  // 한꺼번에 불러오고 싶을 때
  import counter, { increase, decrease } from "./counter";
  ```

### 17.3.2. todos 모듈 만들기

이번에 만들 모듈은 더 복잡하다…. modules 디렉터리에 todos.js 파일 생성하기

**17.3.2.1. 액션 타입 정의하기**

```jsx
modules / todos.js;

const CHANGE_INPUT = "todos/CHANGE_INPUT"; // 인풋 값 변경
const INSDERT = "todos/INSERT"; //새로운 todo를 등록함
const TOGGLE = "todos/TOGGLE"; //todo를 체크/ 체크 해제함
const REMOVE = "todos/REMOVE"; // todo를 제거함
```

**17.3.2.2. 액션 생성 함수 만들기**

- 액션 생성 하뭇에서 파라미터가 필요함.
- 전달 받은 파라미터는 액션 객체 안에 추가 필드로 들어가게 됨

```jsx
const CHANGE_INPUT = "todos/CHANGE_INPUT"; // 인풋 값 변경
const INSERT = "todos/INSERT"; //새로운 todo를 등록함
const TOGGLE = "todos/TOGGLE"; //todo를 체크/ 체크 해제함
const REMOVE = "todos/REMOVE"; // todo를 제거함

export const changeInput = (input) => ({
  type: CHANGE_INPUT,
  input,
});

let id = 3; //insert가 호출될 때마다 1씩 더해짐
// 다음 절에서 초기 상태 작성할 때 todo 객체 두 개를 사전에 미리 넣어둘 것이므로 그다음에 새로 추가될 항목의 id가 3임

export const insert = (text) => ({
  // 액션 객체를 만들 때 파라미터 외에 사전에 이미 선언되어 있는 id라는 값에도 의존 함.
  type: INSERT,
  todo: {
    id: id++,
    // 호출될 때마다 id 값에 1씩 더해 줌.
    // 이 id 값은 todo 객체가 들고 있게 될 고윳값
    text,
    done: false,
  },
});

export const toggle = (id) => ({
  type: TOGGLE,
  id,
});

export const remove = (id) => ({
  type: REMOVE,
  id,
});
```

**17.3.2.3 초기 상태 및 리듀서 함수 만들기**

- 모듈 초기 상태와 리듀서 함수를 작성
- 업데이트 방식이 까다로워지는데 객체에 한 개 이상의 값이 들어가므로 불변성을 유지해주어야 함
- spread 연산자 (···)를 잘 활용해서 작성하자!!
- 배열에 변화를 줄 때는 배열 내장 함수를 사용하여 구현

```jsx
//modules/todos.js

const CHANGE_INPUT = "todos/CHANGE_INPUT"; // 인풋 값 변경
const INSERT = "todos/INSERT"; //새로운 todo를 등록함
const TOGGLE = "todos/TOGGLE"; //todo를 체크/ 체크 해제함
const REMOVE = "todos/REMOVE"; // todo를 제거함

export const changeInput = (input) => ({
  type: CHANGE_INPUT,
  input,
});

let id = 3; //insert가 호출될 때마다 1씩 더해짐
// 다음 절에서 초기 상태 작성할 때 todo 객체 두 개를 사전에 미리 넣어둘 것이므로 그다음에 새로 추가될 항목의 id가 3임

export const insert = (text) => ({
  // 액션 객체를 만들 때 파라미터 외에 사전에 이미 선언되어 있는 id라는 값에도 의존 함.
  type: INSERT,
  todo: {
    id: id++,
    // 호출될 때마다 id 값에 1씩 더해 줌.
    // 이 id 값은 todo 객체가 들고 있게 될 고윳값
    text,
    done: false,
  },
});

export const toggle = (id) => ({
  type: TOGGLE,
  id,
});

export const remove = (id) => ({
  type: REMOVE,
  id,
});

const initialState = {
  input: "",
  todos: [
    {
      id: 1,
      text: "리덕스 기초 배우기",
      done: true,
    },
    {
      id: 2,
      text: "리액트와 리덕스 사용하기",
      done: false,
    },
  ],
};

function todos(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      };
    case INSERT:
      return {
        ...state,
        todos: state.todos.concat(action.todo),
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        ),
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      return state;
  }
}

export default todos;
```

### 17.3.3 루트 리듀서 만들기

- 리듀서를 여러개 만들었지만 createStore 함수로 스토어룰 만들 때는 리듀서를 하나만 사용해야 함
  - 기존에 만들었던 리듀서를 하나로 합쳐야함
    ⇒ 리덕스에서 제공하는 combineReducers라는 유틸 함수를 사용하면 쉽게 처리 가능

```jsx
//modules/index.js
import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
```

- 파일 이름을 index.js로 설정하면 디렉터리 이름까지만 입력해 불러올 수 있다

`import rootReducer from ‘./modules’;`

## 17.4. 리액트 애플리케이션에 리덕스 적용하기

- 스토어를 만들고 리액트 애플리케이션에 리덕스를 적용하는 작업은 src/index.js에서 이루어짐

### 17.4.1. 스토어 만들기

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
**import rootReducer from './modules';**
import reportWebVitals from './reportWebVitals';
**import { createStore } from 'redux';**

**const store = createStore(rootReducer);**

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

### 17.4.2. Provider 컴포넌트 사용하여 프로젝트에 리덕스 적용하기

- 리액트 컴포넌트에서 스토어를 사용할 수 있도록 App 컴포넌트를 react-redux에서 제공하는 Provider 컴포넌트로 감싸기
- store을 props로 전달해줘야 한다.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import rootReducer from './modules';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
**import { Provider } from 'react-redux';**

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  **<Provider store={store}>**
    <App />
  **</Provider>**
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

### 17.4.3. Redux DevTools의 설치 및 적용

- Redux DevTools는 리덕스 개발자 도구로 크롬 확장 프로그램으로 설치해 사용 가능
- 설치 후에 리덕스 스토어를 만드는 과정에서 다음과 같이 적용할 수 있음
  ```jsx
  const store = createStore(
  	rootReducer, /* preloadedState */
  	window.__REDUX_DEVTOOLS_EXTENTION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ```
- 패키지를 설치하여 적용하면 코드가 훨씬 깔끔해짐
  - 패키지 설치로 적용한다.

`$ yarn add redux-devtools-extension`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import rootReducer from "./modules";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

- 크롬 브라우저에서 크롬 개발자 도구 실행후 Redux 탭을 열었을 때 리덕스 개발자 도구를 확인
  - State 탭을 눌러 현재 리덕스 스토어 내부가 잘 보이는지 확인

## 17.5. 컨테이너 컴포넌트 만들기

- 컴포넌트에서 리덕스 스토어에 접근하여 원하는 상태를 받아오고, 액션을 디스패치 해주기
- **리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트하고 부름**

### 17.5.1. CounterContainer 만들기

```jsx
// src/containers/CounterContainer.js

import React from "react";
import Counter from "../components/Counter";

const CounterContainer = () => {
  return <Counter />;
};

export default CounterContainer;
```

- 위 컴포넌트를 리덕스와 연동하려면 react-redux에서 제공하는 connect 홤수 사용

`connect(mapStateProps, mapDispatchToProps) (연동할 컴포넌트)`

- mapStateToProps는 리덕스 스토어 안의 상태를 컴포넌트 props로 넘겨주기 위해 설정하는 함수
- mapDispatchToProps는 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수
- connect 함수를 호출하고나면 또 다른 함수를 반환함.
  - 반환된 함수에 컴포넌트를 파라미터로 넣어주면 리덕스와 연동된 컴포넌트가 만들어짐.
- 위 코드를 더 쉽게 풀어보면 아래와 같다

```jsx
const makeContainer = connect(mapStateToProps, mapDispatchToProps)
makeContainer(타깃 컴포넌트)
```

- CounterContainer 컴포넌트에서 connect를 사용하기

/code

```jsx
// src/containers/CounterContainer.js

import React from "react";
import Counter from "../components/Counter";
import { connect } from "react-redux";

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

const mapStateToProps = (state) => ({
  number: state.counter.number,
});
const mapDispatchToProps = (dispatch) => ({
  // 임시 함수
  increase: () => {
    console.log("increase");
  },
  decrease: () => {
    console.log("decrease");
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
```

- mapStateToProps와 mapDispatchProps에서 반환하는 객체 내부의 값들은 컴포넌트의 props로 전달
- mapStateToProps는 state를 파라미터로 받아오며, 이 값은 현재 스토어가 지니고 있는 상태를 가리킴.
- mapDispatchToProps의 경우 store의 내장 함수 disapatch를 파라미터로 받아옴.
- 현재 mapDispatchToProps에서는 진행 절차 설명을 위해 임시로 console.log를 사용

App에서 Counter를 CounterContainer로 교체하기

```jsx
// App.js

import "./App.css";
import Todos from "./components/Todos";
import CounterContainer from "./containers/CounterContainer";

function App() {
  return (
    <div>
      <CounterContainer />
      <hr />
      <Todos />
    </div>
  );
}

export default App;
```

- 브라우저를 열어 +1, -1 버튼을 누르면 increase와 decrease가 찍힌다.

- console.log 대신 액션 생성 함수를 불러와서 액션 객체를 만들고 디스패치하기

```jsx
// src/containers/CounterContainer.js

import React from "react";
import Counter from "../components/Counter";
import { connect } from "react-redux";
import { increase, decrease } from "../modules/counter";

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

const mapStateToProps = (state) => ({
  number: state.counter.number,
});
const mapDispatchToProps = (dispatch) => ({
  // 임시 함수
  increase: () => {
    dispatch(increase());
  },
  decrease: () => {
    dispatch(decrease());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/74e643bb-bab5-48d1-881c-65fa59b44aa0/Untitled.png)

- 버튼 클릭시 숫자가 바뀐다. 리덕스 개발자 도구에서도 확인해보기

- connect 함수를 사용할 때는 일반적으로 위 코드와 같이 mapStateToProps와 mapDispatchToProps를 미리 선언해 놓고 사용. 하지만 connect 함수 내부에 익명 함수 형태로 선언해도 문제가 되지 않음.
- 코드가 더 깔끔해지기도 하지만 취향에 따라 아래와 같이 작성해보자

```jsx
// src/containers/CounterContainer.js

import React from "react";
import Counter from "../components/Counter";
import { connect } from "react-redux";
import { increase, decrease } from "../modules/counter";

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

// const mapStateToProps = state => ({
//     number: state.counter.number,
// });
// const mapDispatchToProps = dispatch => ({
//     // 임시 함수
//     increase: () => {
//         dispatch(increase());
//     },
//     decrease: () => {
//         dispatch(decrease());
//     },
// });

export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  (dispatch) => ({
    increase: () => dispatch(increase()),
    decrease: () => dispatch(decrease()),
  })
)(CounterContainer);
```

- 위 코드에서는 액션 생성 함수를 호출하여 디스패치하는 코드가 한 줄이므로 불필요한 코드 블록을 생략
- 다음 두 줄의 코드는 작동 방식이 완전히 동일하다

```jsx
increase: () => dispatch(increase()),
increase: () = { return dispatch(increase()) },
```

- 컴포넌트에서 액션을 디스패치하기 위해 각 액션 생성 함수를 호출하고 dispatch로 감싸는 작업이 번거로울 순 있음.
- 특히 액션 생성 함수의 개수가 많아진다면 더더욱..
- 이 경우 리덕스에서 제공하는 bindActionCreators 유틸 함수를 사용하자

```jsx
// src/containers/CounterContainer.js

import React from 'react';
import Counter from '../components/Counter';
import { connect } from 'react-redux';
import { increase, decrease } from '../modules/counter';
import { bindActionCreators } from 'redux';

const CounterContainer = ({ number, increase, decrease }) => {
    return (
        <Counter number={number} onIncrease={increase} onDecrease={decrease} />
    );
}

// const mapStateToProps = state => ({
//     number: state.counter.number,
// });
// const mapDispatchToProps = dispatch => ({
//     // 임시 함수
//     increase: () => {
//         dispatch(increase());
//     },
//     decrease: () => {
//         dispatch(decrease());
//     },
// });

export default connect(
    state => ({
        number: state.counter.number,
    }),
    **dispatch =>
        bindActionCreators({
        increase,
        decrease,
    }, dispatch, ),)**
    (CounterContainer);
```

- 브라우저를 열어서 똑같이 작동하는지 확인하기
- 더 편한 방법이 또 있다!!
  - mapDispatchToProps에 해당하는 파라미터를 함수 형태가 아닌 액션 생성 함수로 이루어진 객체 형태로 넣기
  ```jsx
  // src/containers/CounterContainer.js

  import React from 'react';
  import Counter from '../components/Counter';
  import { connect } from 'react-redux';
  import { increase, decrease } from '../modules/counter';
  import { bindActionCreators } from 'redux';

  const CounterContainer = ({ number, increase, decrease }) => {
      return (
          <Counter number={number} onIncrease={increase} onDecrease={decrease} />
      );
  }

  // const mapStateToProps = state => ({
  //     number: state.counter.number,
  // });
  // const mapDispatchToProps = dispatch => ({
  //     // 임시 함수
  //     increase: () => {
  //         dispatch(increase());
  //     },
  //     decrease: () => {
  //         dispatch(decrease());
  //     },
  // });

  export default connect(
      state => ({
          number: state.counter.number,
      }),
      {
          **increase,
          decrease,**
      },
  )(CounterContainer);
  ```
  - 위와 같이 두 번째 파라미터를 아예 객체 형태로 넣어주면 connect 함수가 내부적으로 bindActionCreators 작업을 대신 해줌.

### 17.5.2. TodosContainer 만들기

- Todos 컴포넌트를 위헌 컨테이너인 TodosContainers를 작성하기
- CounterContainer를 만들 때 배웠던 connect 함수를 사용하고, mapDispatchProps를 짧고 간단하게 쓰는 방법을 적용해서 코드 작성

```jsx
// src/containers/TodosContainer

import React from "react";
import { connect } from "react-redux";
import Todos from "../components/Todos";
import { changeInput, insert, toggle, remove } from "../modules/todos";

const TodosContainer = ({
  input,
  todos,
  changeInput,
  insert,
  toggle,
  remove,
}) => {
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={changeInput}
      onInsert={insert}
      onToggle={toggle}
      onRemove={remove}
    />
  );
};

export default connect(
  // 비구조화 할당을 통해 todos 분리
  // state, todos, input 대신 todos.input을 사용
  ({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }),
  {
    changeInput,
    insert,
    toggle,
    remove,
  }
)(TodosContainer);
```

- 이전 todos 모듈에서 작성했던 액션 생성 함수와 상태 안에 있던 값을 컴포넌트의 props로 전달함
- 컨테이너 컴포넌트를 다 만든 후에는 App 컴포넌트에서 보여 주던 Todos 컴포넌트를 TodosContainer 컴포넌트로 교체

```jsx
// App.js

import "./App.css";
import CounterContainer from "./containers/CounterContainer";
import TodosContainer from "./containers/TodosContainer";

function App() {
  return (
    <div>
      <CounterContainer />
      <hr />
      <TodosContainer />
    </div>
  );
}

export default App;
```

- Todos 컴포넌트에서 받아온 props를 사용하도록 구현

```jsx
// components/Todos.js

import React from "react";

const TodoItem = ({ todo, onToggle, onRemove }) => {
  return (
    <div>
      <input
        type="checkbox"
        onClick={() => onToggle(todo.id)}
        checked={todo.done}
        readOnly={true}
      />
      <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.text}
      </span>
      <button onClick={() => onRemove(todo.id)}>삭제</button>
    </div>
  );
};

const Todos = ({
  input, //인풋에 입력되는 텍스트
  todos, // 할 일 목록이 들어 있는 객체
  onChangeInput,
  onInsert,
  onToggle,
  onRemove,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    onInsert(input);
    onChangeInput(""); //등록 후 인풋 초기화
  };
  const onChange = (e) => onChangeInput(e.target.value);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={input} onChange={onChange} />
        <button type="submit">등록</button>
      </form>
      <div>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default Todos;
```

## 17.6. 리덕스 더 편하게 사용하기

- 리덕스 더 편하게 사용하는 방법
  - 액션 생성 함수, 리듀서를 작성할 때 redux-actions라는 라이브러리와 이전에 배웠던 immer 라이브러리를 활용하면 리덕스를 훨씬 편하게 사용가능함.

### 17.6.1. redux-actions

- redux-actions를 사용하면 액션 생성 함수를 더 짧은 코드로 작성 가능함.
- 리듀서를 작성할 때도 switch/case 문이 아닌 handleActions라는 함수를 사용하여 각 액션마다 업데이트 함수를 설정하는 형식으로 작성 가능.

- 라이브러리 설치부터 하자

`yarn add redux-actions`

**17.6.1.1. counter 모듈에 적용하기**

- counter 모듈에 작성된 액션 생성 함수를 createAction이란 함수를 사용하여 만들어 주자

```jsx
//src/modules/counter
import { createAction } from "redux-actions";

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

...
```

- createAction을 사용하면 매번 객체를 직접 만들어 줄 필요 업싱 더욱 간단하게 액션 생성 함수를 선언할 수 있음.

- 리듀서 함수도 가독성 있게 작성하자

```jsx
//src/modules/counter
import { createAction, handleActions } from "redux-actions";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = {
  // 초기 상태에서는 number 값
  number: 0,
};

const counter = handleActions({
  [INCREASE]: (state, action) => ({ number: state.number + 1 }),
  [DECREASE]: (state, action) => ({ number: state.number - 1 }),
});

// 함수 내보내기
export default counter;
```

- handleActions 함수의 첫 번째 파라미터에는 각 액션에 대한 업데이트 함수를 넣어주고, 두 번째 파라미터에는 초기 상태를 넣어줌

**17.6.1.2. todos 모듈에 적용하기**
