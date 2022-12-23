# 일정관리 웹 애플리케이션 만들기

![우리가 만들 웹 애플리케이션의 최종 완성본](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9a9891dd-bf6d-4c88-9f25-f46ee263a8a2/Untitled.png)

우리가 만들 웹 애플리케이션의 최종 완성본

개인적으로 완성했을 때 제법 보람찬 기분을 느낄 수 있는 프로젝트 같아요!!

화이팅 !! 차근차근 따라해봅시다! ❤

웹 애플리케이션 제작 순서

1. 프로젝트 준비하기
2. UI 구성하기
3. 기능 구현하기

# 10.1. 프로젝트 준비하기

## 10.1.1. 프로젝트 생성 및 필요한 라이브러리 설치

프로젝트를 먼저 생성해 준다.

```jsx
$ yarn create react-app todo-app
```

todo-app 디렉토리로 이동 후

```jsx
$cd todo-app
```

라이브러리 설치 진행

```jsx
$ yarn add node-sass@4.14.1 classnames react-icons

//1. sass 사용을 위해 node-sass 설치
//2. 편리한 조건부 스타일링을 위해 classnames 설치
//3. 아이콘 사용을 위한 react-icons 설치
 //   - 아이콘의 크기 색상은 props, css 스타일로 변경하여 사용 가능
```

## 10.1.2. Prettier 설정

2장에서 언급한 Prettier 설정하여 코드 정리

```jsx
// 최상위 폴더에 .prettierrc

{
	"SingleQuote": true.
// 작은 따옴표 사용
	"semi" : true,
// 항상 세미콜론 붙이기
	"useTabs" : false,
	"tabWidth": 2,
//들여쓰기 할 떄 공백 두 칸
	"trailingComma" : "all",
// 여러 줄을 사용할 때, 후행 콤마 사용 방식 (객체 끝 부분에도 Comma 추가)
	"printWidth": 80
// 줄바꿈할 폭 길이
}
```

## 10.1.3. index.css 수정

글로벌 스타일 파일이 포함된 index.css를 수정한다.

기존 폰트 설정을 지우고 background 속성 설정

```jsx
//index.css
body {
	margin: 0;
	padding: 0;
	background: #e9ecef;
}

```

배경을 회색으로 설정했다.

## 10.1.4. App 컴포넌트 초기화

기존 App 컴포넌트를 모두 삭제한다.

```jsx
//App.js

import React from "react";

const App = () => {
  return <div> Todo 만들자~ </div>;
};

export default App;
```

기본 준비 끝!

서버를 구동 시켜 화면을 확인하자 \

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8205911a-02aa-49bd-b542-938295cbc595/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8205911a-02aa-49bd-b542-938295cbc595/Untitled.png)

# 10.2. UI 구성하기

앞으로 만들 컴포넌트

1. **TodoTemplate**

   : 화면을 가운데에 정렬ㄹ시켜 주며 앱 타이틀 (일정 관리)를 보여 줍니다. children으로 내부 JSX를 props로 받아와 랜더링해 줌

2. **TodoInsert**

   : 새로운 항목을 입력하고 추가할 수 있는 컴포넌트, state를 통해 인풋 상태 관리

3. **TodoListItem**

   : 각 할 일 항목에 대한 정보를 컴포넌트. todo 객체를 props로 받아와서 상태에 따라 다른 스타일에 UI를 보여줌

4. **TodoList**

   : todos 배열을 props로 받아온 후, 이를 배열 내장 함수 map을 사용해서 여러 개의 TodoListItem 컴포넌트로 반환하여 보여줌

위 네 컴포넌트는 src/components 디렉터리를 생성에 그 안에서 저장하여 관리한다. : 관습적으로 그렇게 함.

기능보다는 모양새 만들기 먼저 진행하자.

## 10.2.1. TodoTemplate 만들기

1. src\component를 생성
2. TodoTemplate.js & TodoTemplate.scss 파일 생성

```jsx
//src/component/TodoTemplate.js

import React from "react";
//리액트 불러오기
import "./TodoTemplate.scss";
//scss 파일 불러오기

const TodoTemplate = ({ children }) => {
  return (
    <div className="TodoTemplate">
      <div className="app-title">일정 관리</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default App;
```

App에서 불러와 렌더링 한다

```jsx
//App.js

import React from "react";
import TodoTemplate from "./components/TodoTemplate";

const App = () => {
  return <TodoTemplate>Todo App을 만들자!</TodoTemplate>;
};

export default App;
```

스타일링 되지 않은 TodoTemplate

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/03509b56-d3d8-491c-838c-c282f23fc3eb/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/03509b56-d3d8-491c-838c-c282f23fc3eb/Untitled.png)

스타일을 작성하자

- 작성시 브라우저를 한 쪽에 띄워두고 저장하면서 변화 확인하면서 하는 것 추천!!

```jsx
.TodoTemplate {
    width: 512px;
    //width가 주어진 상태에서 좌우 중앙 정렬
    margin-left: auto;
    margin-right: auto;
    margin-top: 6rem;
    border-radius: 4px;
    overflow: hidden;

    .app-title {
        background: #22b8cf;
        color: white;
        height: 4rem;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content {
        background: white;
    }
}
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b4aeb38d-8be7-4394-ada0-affa8dcd0b89/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b4aeb38d-8be7-4394-ada0-affa8dcd0b89/Untitled.png)

## 10.2.2. TodoInsert 만들기

components 디렉터리에 TodoInsert.js & TodoInsert.scss 생성

```jsx
//src/component/TodoInsert.js

import React from "react";
import { MdAdd } from "react-icons/md";
//react-icons에서 아이콘 파일 가져오기
import "./TodoInsert.scss";

const TodoInsert = () => {
  return (
    <form className="TodoInsert">
      <input placeholder="할 일을 입력하세요" />
      <button type="submit">
        <MdAdd />
        // react-icons 컴포넌트처럼 사용하기
      </button>
    </form>
  );
};

export default TodoInsert;
```

react-icons를 처음 써보았다!!

```jsx
import { 아이콘 이름 } from 'react-icons/md';
```

import 구문을 사용하여 불러온 후 컴포넌트처럼 사용하면 된다

더 많은 아이콘은 여기서 확인 가능

[https://react-icons.github.io/react-icons/#/icons/md](https://react-icons.github.io/react-icons/#/icons/md)

TodoInsert를 App에서 불러와 랜더링 하자

```jsx
//App.js

import React from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";

const App = () => {
  return (
    <TodoTemplate>
      <TodoInsert />
    </TodoTemplate>
  );
};

export default App;
```

스타일링 이전의 Tdoo Insert 완성

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/621cfc7a-e064-4f89-8fab-c52e16e7829f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/621cfc7a-e064-4f89-8fab-c52e16e7829f/Untitled.png)

```scss
.TodoInsert {
  display: flex;
  background: #495057;
  input {
    // 기본 스타일 초기화
    // 동일한 네임스페이스를 가지는 속성 한 번에 입력 가능
    background: none;
    outline: none;
    border: none;
    padding: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: white;
    &::placeholder {
      color: #dee2e6;
    }
    //버튼 제외영역 모두 차지하기
    flex: 1;
  }
  botton {
    //기본 스타일 초기화
    background: none;
    outline: none;
    border: none;
    background: #868e96;
    color: white;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.1s background ease-in;
    &:hover {
      background: #adb5bd;
    }
  }
}
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3c9976b7-e61f-4dd7-aca0-028ffd95796a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3c9976b7-e61f-4dd7-aca0-028ffd95796a/Untitled.png)

마우스를 + 버튼에 올렸을 때 버튼의 배경색이 바뀌는지도 확인하자

## 10.2.3 TodoListItem과 TodoList 만들기

- component 디렉토리에 TodoListItem.js 와 TodoListItem.scss를 생성한다.

```jsx
//src/component/TodoListItem.js

import React from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from "react-icons/md";
import "./TodoListItem.scss";

const TodoListItem = () => {
  return (
    <div className="TodoListItem">
      <div className="checkbox">
        <MdCheckBoxOutlineBlank />
        <div className="text">할 일</div>
      </div>
      <div className="remove">
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;
```

TodoList.js 와 TodoList.scss 생성 후 js 파일 작성

```jsx
//src/component/TodoList.js

import React from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.scss";

const TodoList = () => {
  return (
    <div className="TodoLsit">
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
    </div>
  );
};

export default TodoList;
```

별도의 props 전달 없이 그대로 여러번 TodoListItem를 불러와서 여러번 보여주고 있다.

이후 기능을 추가해 다양한 데이터를 전달할 예정

App에서 렌더링 해보자

```jsx
//App.js

import React from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList />
    </TodoTemplate>
  );
};

export default App;
```

스타일링 이전 TodoList

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/893dc414-7d38-4f68-b8de-e4c1ff478b47/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/893dc414-7d38-4f68-b8de-e4c1ff478b47/Untitled.png)

```jsx
// TodoList.scss

.TodoList {
    min-height: 320px;
    max-height: 513px;
    overflow-y: auto;
// 세로로 내용 넘치면 자르고 필요시 스크롤바
  }
```

```jsx
// TodoListItem.scss

.TodoListItem {
    padding: 1rem;
    display: flex;
    align-items: center; // 세로 중앙 정렬
    &:nth-child(even) {
      background: #f8f9fa;
    }
    .checkbox {
      cursor: pointer;
      flex: 1; // 차지할 수 있는 영역 모두 차지
      display: flex;
      align-items: center; // 세로 중앙 정렬
      svg {
        // 아이콘 속성
        font-size: 1.5rem;
      }
      .text {
        margin-left: 0.5rem;
        flex: 1; // 차지할 수 있는 영역 모두 차지
      }
      // 체크되었을 때 보여줄 스타일
      &.checked {
        svg {
          color: #22b8cf;
        }
        .text {
          color: #adb5bd;
          text-decoration: line-through;
        }
      }
    }
    .remove {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      color: #ff6b6b;
      cursor: pointer;
      &:hover {
        color: #ff8787;
      }
    }

    // 엘리먼트 사이사이에 테두리를 넣어줌
    **& + & {
      border-top: 1px solid #dee2e6;**
    }
  }
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c360fe67-6f24-4d11-add1-81fb5cacea78/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c360fe67-6f24-4d11-add1-81fb5cacea78/Untitled.png)

컴포넌트와 스타일링이 완성되었으니 기능을 구현해보자

# 10.3. 기능 구현하기

## 10.3.1. App에서 Todos 상태 사용하기

- 나중에 추가하게될 일정 항목에 대한 상태는 모두 App 컴포넌트에서 관리
-

1. App에서 useState를 사용하여 todos라는 상태 정의
2. todos를 TodoList의 props로 전달
3.

```jsx
//App.js

import React, { useState } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
//상태 값은 todos, 상태 설정 함수는 setTodos
	const [todos, setTodos] = useState([
		{
			id:1, //각 항목의 고유 id
			text: '리액트의 기초 알아보기', // 각 항목의 내용
			checked: true, //완료 여부
		},
		{
			id:2,
			text: '컴포넌트 스타일링해 보기',
			checked: true,
		},
		{
			id:3,
			text: '일정 관리 앱 만들어 보기',
			checked: false,
		},
	]); // useState의 기본값 설정
	return (
	<TodoTemplate>
		<TodoInsert />
		<TodoList **todos={todos}** />
	</TodoTemplate>
	)
};

export default App;
```

이 배열은 TodoList의 props로 전달됨

TodoList에서 이 값을 받아온 후 TodoItem으로 변환하여 렌더링하도록 설정해야한다.

```jsx
//TodoList.js

import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ **todos** }) => {
    return (
        <div className="TodoList">
//props로 받아 온 todo 배열을 배열 내장함수 map을 통해 TodoListItem으로 이루어진 배열로 변환
            **{todos.map(todo => (
                <TodoListItem todo={todo} key={todo.id} />
									//**map을 사용하여 컴포넌트로 변환할 때는 key props를 전달해주어야함
									//todo 데이터는 통째로 props에 전달
            **))}**
        </div>
    );
};

export default TodoList;
```

- props로 받아 온 todo 배열을 배열 내장함수 map을 통해 TodoListItem으로 이루어진 배열로 변환하여 렌더링

  - map을 사용하여 컴포넌트로 변환할 때는 key props를 전달해주어야함
  - key 값은 각 항목마다의 고윳값인 id를 넣음
  - todo 데이터는 통째로 props에 전달
    - 여러 종류의 값 전달의 경우 객체로 통째 전달이 성능 최적화에 편리함

- TodoList 컴포넌트에서 받아온 todo 값에 따라 제대로된 UI를 보여주기 위해 컴포넌트 수정
- 조건부 스타일링을 위해 classnames 사용

```jsx
//src/component/TodoListItem.js

import React from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md' ;
**import cn from 'classnames';//classnames사용 명시**
import './TodoListItem.scss';

const TodoListItem = **({ todo }) => {
    const { text, checked } = todo;**
    return (
        <div className="TodoListItem">
            <div className={cn(`checkbox`, { checked })}>
								//classname 두 값이 true 혹은 false 값을 갖도록 묶은 후 조건부 스타일링을 도와줌!!
								//체크표시가 됐다면 > checkbox checked 이름 적용 아니라면 checkbox만 className에 적용
								//조건에 따라 ClassName을 가짐
                {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <MdCheckBoxOutlineBlank />
                <div className="text">{text}</div>
            </div>
            <div className="remove">
                <MdRemoveCircleOutline />
            </div>
        </div>
    );
};

export default TodoListItem;
```

- ClassNames
  className에 true에 해당하는 값은 추가로 표시가 가능하고, false가 된다면 className에 적용되지 않는다.
  이 코드는 checkbox 를 checked에서 나온 true 혹은 false의 값을 갖도록 하나로 묶어준 후, 하나의 묶음으로 조건부 스타일링을 할 수 있도록 도와주는 것이다.
  따라서, 이 부분이 체크표시가 됐다면 checkbox checked라고 표시가 가능한 것이고, checked가 false라면 checked가 적용이 되지 않아서 checkbox만 className에 적용될 것이다.

제대로 적용되었다 👍

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9a9891dd-bf6d-4c88-9f25-f46ee263a8a2/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9a9891dd-bf6d-4c88-9f25-f46ee263a8a2/Untitled.png)

## 10.3.2. 항목 추가 기능 구현

- TodoInsert 컴포넌트에서 인풋 상태 관리
- App 컴포넌트에는 todos 배열에 새로운 객체를 추가하는 함수 생성

### 10.3.2.1. TodoInsert value 상태 관리

- useState를 이용하여 인풋에 입력하는 값을 관리할 수 있도록 value라는 상태 정의
- 인풋에 넣을 onChange 함수 작성
- 컴포넌트가 리렌더링 될 때마다 함수를 새로만드는 것이 아닌 한 번 함수를 만들고 재사용할 수 있돌고 useCallBack Hook 사용

```jsx
//src/component/TodoInsert.js

import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = () => {
    **const [value, setvalue] = useState('');

    const onChange = useCallback (e => {
        setvalue(e.target.value);**
//생성하려는 함수 vlaye에
    }, []); // 비어있는 배열을 넣어 컴포넌트가 렌더링될 때 만들었던 함수 계속해서 재사용

    return (
        <form className="TodoInsert">
            <input placeholder="할 일을 입력하세요"
            **value={value}
            onChange={onChange} />**
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    );
};

export default TodoInsert;
```

- 인풋에 텍스트 입력시 잘 입력되는지 확인하기

### 10.3.2.2. 리액트 개발자 도구

현재 state가 잘 업데이트 되고 있는지를 확인해보자

- 리액트 컴포넌트 심층분석할 수 있도록하는 크롬확장프로그램

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a71e5536-0b7a-4da3-b9c0-0d3c33071409/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a71e5536-0b7a-4da3-b9c0-0d3c33071409/Untitled.png)

설치 후 크롬 개발자 도구를 열면 개발자 도구 탭에 React가 나타난다.

Elements 탭에서 TodoInsert 검색 후 선택하면

인풋 수정시 Hooks의 State에 반영되는 모습을 볼 수 있다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c036370b-73de-445c-9b4c-2979e316ee30/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c036370b-73de-445c-9b4c-2979e316ee30/Untitled.png)

### 10.3.2.3. todos 배열에 새 객체 추가

App 컴포넌트에서 todos 배열에 새 객체 추가하는 onInsert함수 만들기

- onInsert 함수
  - 새로운 객체를 만들 때 마다 id 값에 1씩 더해주기
  - id 값은 useRef를 사용하여 관리
    - id값은 렌더링되는 정보가 아니므로 useState가 아닌 useRef를 사용
    - 화면에 보이지 않고, 값이 바뀌는 것에 따라 리렌더링될 필요없음
  - 컴포넌트 성능을 아낄수 있도록 useCallback으로 감싸줌
    - props로 전달해야 할 함수 만들때는 습관화 하기

함수를 만든 후 이 함수를 TodoInsert 컴포넌트의 props로 설정하기

```jsx
//App.js

import React, { useState, useRef, useCallback } from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "리액트의 기초 알아보기",
      checked: true,
    },
    {
      id: 2,
      text: "컴포넌트 스타일링해 보기",
      checked: true,
    },
    {
      id: 3,
      text: "일정 관리 앱 만들어 보기",
      checked: false,
    },
  ]);

  //고윳값으로 사용될 id
  //ref를 사용하여 변수 남기

  const nextId = useRef(4);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1; //nextId 1씩 더하기
    },
    [todos]
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} />
    </TodoTemplate>
  );
};

export default App;
```

### 10.3.2.4. TodoInsert에서 onSubmit 이벤트 설정하기

- 버튼 클릭시 발생 이벤트 설정
- App에서 todoInsert에 넣어준 onInsert 함수에 현재 useState를 통해 관리하고 있는 value값을 파라미터로 넣어서 호출

```jsx
//src/component/TodoInsert.js

import React, { useState, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import "./TodoInsert.scss";

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue(""); // value 값 초기화

      // submit 이벤트는 브라우저에서 새로고침을 발생시킵니다.
      // 이를 방지하기 위하여 이 함수를 호출합니다.
      e.preventDefault();
    },
    [onInsert, value]
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
```

- onSubnit 함수를 만들어 form의 onSubmit으로 설정
- 함수 호출시 props로 받아 온 onInsert 함수에 현재 value 값 파라미터로 넣어 호출

  - 현재 vlaue값 초기화

- onSubmit 이벤트는 브라우저 새로고침
  > > e.preventDefault() 함수를 호출하면 새로 고침 방지

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b9decd61-f3bd-4553-bc62-c91a883eaf75/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b9decd61-f3bd-4553-bc62-c91a883eaf75/Untitled.png)

## 10.3.3. 지우기 기능 구현하기

- 배열의 불변성을 지키면서 배열 원소 제거할 경우 filter 함수로 간편하게 가능

### 10.3.3.1. 배열 내장 함수 filter

- filter 함수는 배열은 유지한체 특정 조건을 만족하는 원소만 따로 추추하려 새로운 배열을 생성

```jsx
// filter 사용 예제

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const biggerThanFive = array.filter((number) => number > 5);

// 결과 : [6,7,8,9,10]
```

- filter 함수에는 조건을 확인해 주는 함수를 파라미터로 넣어주어야 함.
- 파라미터로 넣는 함수는 true or false 값 반환
- true 반환하는 경우만 새로운 배열에 추가

### 10.3.3.2. todos 배열에서 id로 항목 지우기

- filters 함수를 이용해 onRemove 함수 작성
- App 컴포넌트에 id를 파라미터로 받아와 같은 id를 가진 항목을todos 배열에서 지운다.

```jsx
//App.js

import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
	const [todos, setTodos] = useState([
		{
			id:1,
			text: '리액트의 기초 알아보기',
			checked: true,
		},
		{
			id:2,
			text: '컴포넌트 스타일링해 보기',
			checked: true,
		},
		{
			id:3,
			text: '일정 관리 앱 만들어 보기',
			checked: false,
		},
	]);

	//고윳값으로 사용될 id
	//ref를 사용하여 변수 남기

	const nextId = useRef(4);

	const onInsert = useCallback(
		text=> {
			const todo = {
				id: nextId.current,
				text,
				checked:false,
			};
			setTodos(todos.concat(todo));
			nextId.current += 1; //nextId 1씩 더하기
		},
		[todos],
	);

	**const onRemove = useCallback(
		id => {
			setTodos(todos.filter(todo => todo.id !== id));
		},
		[todos],
	);**

	return (
	<TodoTemplate>
		<TodoInsert onInsert={onInsert} />
		<TodoList todos={todos} **onRemove={onRemove}** />
	</TodoTemplate>
	);
};

export default App;
```

### 10.3.3.3 TodoListItem에서 삭제 함수 호출하기

- onRemove 함수를 사용하기 위해는 TodoList 컴포넌트를 거쳐야함
- props로 받아 온 onRemove 함수를 TodoListItem에 그대로 전달

```jsx
//TodoList.js

import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, **onRemove** }) => {
    return (
        <div className="TodoList">
            {todos.map(todo => (
                <TodoListItem todo={todo} key={todo.id} **onRemove={onRemove}** />
            ))}
        </div>
    );
};

export default TodoList;
```

- 삭제 버튼을 누르면 TodoListItem에서 onRemove 함수에 현재 자신이 가진 id를 넣어서 삭제 함수를 호출하도록 설정

```jsx
//src/component/TodoListItem.js

import React from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md' ;
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, **onRemove** }) => {
    const { **id**, text, checked } = todo;
    return (
        <div className="TodoListItem">
            <div className={cn(`checkbox`, { checked })}>
                {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <div className="text">{text}</div>
            </div>0
            <div className="remove" **onClick={() => onRemove(id)**}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    );
};

export default TodoListItem;
```

브라우저를 열어 삭제가 성공적으로 작동 되는지를 확인한다.

## 10.3.4. 수정 기능

- 삭제와 유사
  1. onToggle 함수를 App에 만든다.
  2. 이 함수를 TodoList 컴포넌트에 props로 넣어준다.
  3. TodoList를 통해 TodoListItem으로 전달해준다.

### 10.3.4.1. onToggle 구현하기

```jsx
//App.js

import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
	const [todos, setTodos] = useState([
		{
			id:1,
			text: '리액트의 기초 알아보기',
			checked: true,
		},
		{
			id:2,
			text: '컴포넌트 스타일링해 보기',
			checked: true,
		},
		{
			id:3,
			text: '일정 관리 앱 만들어 보기',
			checked: false,
		},
	]);

	//고윳값으로 사용될 id
	//ref를 사용하여 변수 남기

	const nextId = useRef(4);

	const onInsert = useCallback(
		text=> {
			const todo = {
				id: nextId.current,
				text,
				checked:false,
			};
			setTodos(todos.concat(todo));
			nextId.current += 1; //nextId 1씩 더하기
		},
		[todos],
	);

	const onRemove = useCallback(
		id => {
			setTodos(todos.filter(todo => todo.id !== id));
		},
		[todos],
	);

	**const onToggle = useCallback (
		id => {
			setTodos(
				todos.map(todo =>
					todo.id === id ? { ...todo, checked: !todo.checked } : todo,
					),
			);
		},
		[todos],
	);**

	return (
	<TodoTemplate>
		<TodoInsert onInsert={onInsert} />
		<TodoList todos={todos} onRemove={onRemove} **onToggle={onToggle}**/>
	</TodoTemplate>
	);
};

export default App;
```

- 배열 내장 함수 map을 사용, 특정 id를 가지고 있는 객체의 checked 값을 반전 시켜 줌
- 불변성을 유지하면서 특정 배열 원소를 업데이트해야 할 때, map 사용을 통해 짧은 코드로 작성 가능

> 하나의 원소만을 수정하는데 왜 map 사용하는지?? map은 배열을 전체적으로 새로운 형태로 변환하여 새 배열을 만들때 사용하는 거 아닌가?

> > onToggle 함수에서 삼항 연산자가 사용됨

```jsx
todo.id === id ? *** : ***
```

todo.id와 현재 파라미터로 사용된 id 값이 동일할때에는 새로운 객체를 생성하지만 값이 다를 때는 처음 받은 상태 그대로 반환

map을 사용하여 만들어진 배열에서 변화가 필요한 원소만 업데이트하고, 나머지는 그대로 남아있게 됨

### 10.3.4.2. TodoListItem에서 토글 함수 호출

TodoList를 거쳐 TodoItemList로 전달

```jsx
//TodoList.js

import React from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.scss";

const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;
```

```jsx
//src/component/TodoListItem.js

import React from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from "react-icons/md";
import cn from "classnames";
import "./TodoListItem.scss";

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo;
  return (
    <div className="TodoListItem">
      <div className={cn(`checkbox`, { checked })} onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      0
      <div className="remove" onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;
```

마지막 기능까지 완성 !! 체크 박스를 눌러 상태업데이트를확인해보자

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5a814cb4-0386-49f1-b8e9-c71580ba4efb/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5a814cb4-0386-49f1-b8e9-c71580ba4efb/Untitled.png)

# 10.4. 정리

👏👏👏👏👏👏

첫 프로젝트를 완성했다!!

소규모라 컴포넌트 리렌더링 최적화 작업 없이도 정상적으로 작동 되지만

데이터 양이 늘어난다면 지연이 발생할 수 있다.

클라이언트 자원을 더욱 효율적으로 사용하기 위해 불필요한 리렌더링 방지하는 작업은 11장에서 이어 다룰 예정!
