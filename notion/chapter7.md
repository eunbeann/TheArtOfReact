리액트 v.16.8에 새로 도입된 기능.

- useState, userEffect 등의 기능을 제공하며 기존 함수형 컴포넌트에서 할 수 없던 다양한 작업을 수행할 수 있게함.

이번 실습은 아래의 흐름으로 진행됨

1. 리액트 내장 Hooks 사용하기
2. 커스텀 Hooks 만들기

실습 진행을 위해 새로운 프로젝트를 생성한다.

create - react - app

```jsx
$ yarn create react-app hooks-tutorial
```

# 8.1. useState

- useState는 가장 기본적인 Hook
- 함수형 컴포넌트에서도 가변적인 상태를 지닐 수 있게 함.
- 3장에서 이미 사용해봤던 기능이므로 익숙하게 사용해보자
- 만약 함수형 컴포넌트에서 상태를 관리해야한다면 이 Hook를 사용하면 된다.

```jsx
const [state, setState] = useState(initialState);
```

useState는 두 개의 요소가 담긴 배열을 반환

첫 번째 요소는 **컴포넌트의 현재 상태** / 두 번째 요소는 **상태를 설정할 수 있는 함수**

하나의 인자를 받을 수 있음

이 인자는 **상태의 초기값**

> > 첫 번째 렌더링 이후에는 인자가 무시됨

useState 기능을 사용해서 숫자 카운터를 구현해보자

src 디렉터리에 Counter.js 파일을 생성하고 다음 코드를 입력하자

```jsx
// src\Counter.js

import React, { useState } from 'react';

const Counter = () => {
    const [value, setValue] = useState(0):

    return (
        <div>
            <p>
                현재 카운터 값은 <b>[value]</b>입니다.
            </p>
            <button onClick={() => setValue(value + 1)}>+1</button>
            <button onClick={() => setValue(value - 1)}>+1</button>
        </div>
    );
};

export default Counter;
```

useState는 구문 상단에서 import 구분을 통해 불러오고, 다음과 같이 사용한다.

```jsx
const [value, setValue] = useState(0);
```

- useState의 함수 파라미터에는 함수의 기본 값을 넣어줌
  - 현재는 0이 들어감 : 즉 카운터의 기본 값을 0으로 설정하겠다는 의미
- 이 함수 호출시 배열 반환
  - 배열의 첫 번쨰 원소는 상태 값, 두 번째 원소는 상태를 설정하는 함수
  - 이 함수에 파라미터를 넣어서 호출시 전달받은 파라미터로 값이 바뀌고 컴포넌트가 정상적으로 리렌더링 됨.

코드가 다 이해되었다면

App 컴포넌트를 열어 Counter 컴포넌트를 렌더링한다.

```jsx
//src\App.js

import React from "react";
import Counter from "./Counter";

const App = () => {
  return <Counter />;
};

export default App;
```

터미널에

```jsx
$ yarn start
```

명령어를 입력하여 개발 서버 구동.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2f9d09d9-da39-491c-89ef-3236790fa389/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2f9d09d9-da39-491c-89ef-3236790fa389/Untitled.png)

+1, -1 버튼 클릭시 카운터가 잘 작동 됨을 확인한다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d07b1cc0-9f65-4369-b058-1de7a7ac9735/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d07b1cc0-9f65-4369-b058-1de7a7ac9735/Untitled.png)

함수형 컴포넌트에서 상태 관리를 위해 컴포넌트 코드를 굳이 클래스 형태로 변환할 필요가 없어서 매우 편리하다!

## 8.1.1 useState를 여러 번 사용하기

- 하나의 useState 함수는 하나의 상태 값만 관리할 수 있다.
- 컴포넌트에서 관리해야 할 상태가 여러 개라면 useState를 여러 번 사용하면 된다.

src\info.js 생성

```jsx
// src\Info.js

import React, { useState } from "react";

const Info = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```

App 컴포넌트에서 Info 컴포넌트를 렌더링해보자

```jsx
//src\App.js

import React from "react";
import Info from "./Info";

const App = () => {
  return <Info />;
};

export default App;
```

화면을 확인해보자

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e619c525-f28a-411b-bd3e-dbc84d5d793f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e619c525-f28a-411b-bd3e-dbc84d5d793f/Untitled.png)

관리할 상태가 여러 개인 경우에도 useState편하게 관리할 수 있다.

# 8.2. useEffect

- 리액트 컴포넌트가 렌더링 될 때 마다 특정 작업을 수행하도록 설정할 수 있는 Hook
- 클래스형 컴포넌트의 componentDidMount와 componenetDidUpdate를 합친 형태로 봐도 무방하다.

```jsx
useEffect(() ==> {
// side effect logic
};
```

기존 Info 컴포넌트에 useEffect를 적용해보자

```jsx
// src\Info.js

import React, { useState, useEffect } from "react";

const Info = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    console.log("렌더링이 완료되었습니다!");
    console.log({
      name,
      nickname,
    });
  });

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```

브라우저에서 개발자 도구를 열고 인풋 내용을 변경하고 콘솔창을 확인해보자!!

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d3efb927-6ebb-4998-90f8-c5a72f3564c3/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d3efb927-6ebb-4998-90f8-c5a72f3564c3/Untitled.png)

## 8.2.1. 마운트될 때만 실행하고 싶을 떄

- useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 업데이트될 때는 실행하지 않으려면 **함수의 두 번째 파라미터로 비어 있는 배열을 넣어 주면 된다.**

기존 useEffect 코드를 다음과 같이 변경해 보자

```jsx
//src\info.js - useEffect

useEffect(() => {
  console.log("마운트 될 때만 실행됩니다.");
}, []);
```

코드 작성 후 다시 인풋을 수정해보면 컴포넌트 등장시에만 콘솔에 문구가 뜨고 이후에는 나타나지 않는다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cd0813b7-187d-4249-b04e-552564ed7404/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cd0813b7-187d-4249-b04e-552564ed7404/Untitled.png)

## 8.2.2. 특정 값이 업데이트 될 때만 실행하고 싶을 때

- userEffect 사용할 때, 특정 값이 변경될 때만 호출 하기 위해서는 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어 주면 된다.

Info 컴포넌트의 useEffect 부분을 수정해보자!

```jsx
//src\Info.js > useEffect

useEffect(() => {
  console.log(name);
}, [name]);
```

배열 안에는 userEffect를 통해 관리하고 있는 상태를 넣어주어도 되고, props로 전달 받은 값을 넣어 주어도 된다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/17ad26da-0a28-4e32-9a51-fb2ab60390c1/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/17ad26da-0a28-4e32-9a51-fb2ab60390c1/Untitled.png)

## 8.2.3. 뒷정리하기

- useEffect는 기본적으로 렌더링되고 난 직후마다 실행된다.
- 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라진다.
- 컴포넌트가 언마운트되기 전 or 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면 userEffect에서 뒷정리(cleanup) 함수를 반환해 주어야 한다.

Info 컴포넌트의 useEffect 부분을 수정해보자

```jsx
//src\Info.js > useEffect

useEffect(() => {
  console.log("effect");
  console.log(name);
  return () => {
    console.log("cleanup");
    console.log(name);
  };
}, [name]);
```

App 컴포넌트에서 Info 컴포넌트의 가시성을 바꿀 수 있게 해본다면

useState를 사용해서 상태를 관리할 수 있다.

```jsx
//src\App.js

import React, { useState } from "react";
import Info from "./Info";

const App = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? "숨기기" : "보이기"}
      </button>
      <hr />
      {visible && <Info />}
    </div>
  );
};

export default App;
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8e5a85d9-3a5d-451d-a4e3-4cc93a348a4a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8e5a85d9-3a5d-451d-a4e3-4cc93a348a4a/Untitled.png)

보이기/ 숨기기 버튼을 눌러보자

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d0620fb7-a313-4d7c-b7cd-b1dc2f501eec/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d0620fb7-a313-4d7c-b7cd-b1dc2f501eec/Untitled.png)

컴포넌트가 나타날 때 콘솔에 effect가 나타나고, 사라질 때 clean up이 나타난다.

인풋에 이름을적고, 콘솔에 어떤 결과가 나타나는지 확인해보자

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a678a17c-f657-4c5b-b312-d6defa0f13af/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a678a17c-f657-4c5b-b312-d6defa0f13af/Untitled.png)

렌더링 할 때마다 뒷정리 함수가 계속 나타나는 것을 확인할 수 있다.

뒷정리 함수가 호출될 대는 업데이트 되기 직전의 값을 보여준다.

- 언마운트 될 때만 뒷처리 함수를 호출하고 싶다면 useEffect 함수의 두 번째 파라미터에 비어있는 배열을 넣으면 된다.

```jsx
//src\Info.js > useEffect

useEffect(() => {
  console.log("effect");
  return () => {
    console.log("unmount");
  };
}, []);
```

# 8.3. useReducer

- useReducer는 useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다룬 값으로 업데이트해 주고 싶을 때 사용하는 Hook
- 리듀서(reducer)개념은 17장에서도 배우니 참고
- 리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션(action) 값을 전달받아 새로운 상태를 변환하는 함수
- 리듀서 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜 주어야 함

```jsx
function reducer(state, action) {
	return { ... }; // 불변성을 지키면서 업데이트한 새로운 상태를 반황합니다.
}
```

액션 값은 주로 다음과 같은 형태로 이루어져 있음

```jsx
{
	type: 'INCREMENT'.
// 다른 값들이 필요하다면 추가로 들어감
}
```

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

## 8.3.1. 카운터 구현하기

useReducer을 사용하여 기존의 Counter 컴포넌트 다시 구현하기

```jsx
// src\Counter.js

import React, { useReducer } from "react";

function reducer(state, action) {
  //action.typw에 따라 다른 작업 수행
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      //아무것도 해당되지 않을 때 기존 상태 변환
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
      <button onClick={() => dispatch("INCREMENT" + 1)}>+1</button>
      <button onClick={() => dispatch("DECREMENT" - 1)}>-1</button>
    </div>
  );
};

export default Counter;
```

- useReducer의 첫 번째 파라미터에는 리듀서 함수를 넣고
- 두 번째 파라미터에는 해당 리듀서의 기본 값을 넣어 준다.
- 이 Hook을 사용하면 state 값과 dispatch 값을 받아오는데 여기서 state는 현재 가리키고 있는 상태, dispatch는 액션을 발생시키는 함수이다.
- dispatch(action)과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어 주면 리듀서 함수가 호출되는 구조
- useReducer를 사용했을 때의 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 것이다.

App에선 Counter를 다시 렌더링 해 확인해보자

```jsx
//src\App.js

import React from "react";
import Counter from "./Counter";

const App = () => {
  return <Counter />;
};

export default App;
```

이전과 마찬가지로 잘 작동한다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b7259ba8-b18f-400b-9d99-5c341a31c658/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b7259ba8-b18f-400b-9d99-5c341a31c658/Untitled.png)

## 8.3.2. 인풋 상태 관리하기

- useReducer로 info 컴포넌트에서 인풋 상태를 관리한다.
- 기존에는 인풋이 여러개라 useState를 여러 번 사용했지만, useReducer를 사용하면 기존에 클래스형 컴포넌트에서 input 태그에 name 값을 할당하고 e.target.name을 참조하여 setState를 해 준 것과 유사한 방식으로 작업 처리 가능하다.

info 컴포넌트를 수정해보자

```jsx
// src\Info.js

import React, { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const Info = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    nickname: "",
  });
  const [name, nickname] = state;
  const onChange = (e) => {
    dispatch(e.target);
  };

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b>
          {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```

- useReducer에서 액션은 그 어떤 값도 사용 가능
- 그래서 이벤트 객체가 지니고 있는 [e.target](http://e.target) 값 자체를 액션 값으로 사용함.
- 이런 식으로 인풋 관리시 인풋이 늘어나는 겨웅에도 깔끔한 코드 유지가 가능하다.

App에서 Info 컴포넌트를 렌더링해 보며 잘 작동하는지 확인한다.

```jsx
//src\App.js

import React from "react";
import Info from "./Info";

const App = () => {
  return <Info />;
};

export default App;
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9808512b-5d09-4268-8dfa-0c0d6aba8062/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9808512b-5d09-4268-8dfa-0c0d6aba8062/Untitled.png)

# 8.4. useMemo

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- useMemo 사용시 함수형 컴포넌트 내부에서 발생하는 연산을 최적화 할 수 있다.
- 리스트에 숫자를 추가하면 추가된 숫자들의 평균을 보여주는 함수형 컴포넌트를 작성해보자.

```jsx
// src\Average.js

import React, { useState } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const onChange = (e) => {
    setNumber(e.target.value);
  };
  const onInsert = (e) => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}> 등록 </button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값 : </b> {getAverage(list)}
      </div>
    </div>
  );
};

export default Average;
```

이후 App에 컴포넌트를 렌더링 해보자

```jsx
//src\App.js

import React from "react";
import Average from "./Average";

const App = () => {
  return <Average />;
};

export default App;
```

평균 값이 잘 나타난다

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a424d46e-4a1c-49a2-90c0-d471a87d0a64/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a424d46e-4a1c-49a2-90c0-d471a87d0a64/Untitled.png)

- 그러나 인풋 내용이 수정될 때에도 우리가 만든 getAverage 함수가 호출 된다.
- 인풋 내용이 바뀔 때에는 평균값을 계산할 필요가 없으므로 useMemo Hook을 통해 이런 작업을 최소화 시켜 준다
- **렌더링 과정에서 특정 값이 바뀌었을 때에만 연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과들을 다시 사용하는 방식**

Average 코드를 수정하자

```jsx
// src\Average.js

import React, { useState, useMemo } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const onChange = (e) => {
    setNumber(e.target.value);
  };
  const onInsert = (e) => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}> 등록 </button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값 : </b> {getAverage(avg)}
      </div>
    </div>
  );
};

export default Average;
```

list 배열의 내용이 바뀔 때만 getAverage 함수가 호출된다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a22ed7d1-9ac5-4800-97b0-f2f6e5797f20/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a22ed7d1-9ac5-4800-97b0-f2f6e5797f20/Untitled.png)

# 8.5. useCallback

```jsx
const memorizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

useCallback은 useMemo와 상당히 비슷한 함수

- 주로 렌더링 성능을 최적화 하는 상황에서 사용

이 Hook를 사용하면 만들어 놨던 함수의 재사용 가능

<Average> 컴포넌트를 참고하자면...

- onChange, onInsert 함수 선언 해주었는데 이런 경우 컴포넌트가 리렌더링될 때마다 새로 만들어진 함수를 사용하게 됨.
- 대부분의 경우에는 문제 없지만 렌더링할 컴포넌트가 많을 수록 최적화 하는 것이 좋음

useCallback을 통한 최적화하기

```jsx
// src\Average.js

import React, { useState, useMemo, useCallback } from 'react';

const getAverage = numbers => {
    console.log('평균값 계산 중..');
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b);
    return sum/numbers.length;
    };

const Average = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');

    **const onChange = useCallback(e => {
        setNumber(e.target.value);
    }, []); //처음 컴포넌트가 렌더링 될 때에만 함수 생성
    const onInsert = useCallback(() => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
    }, [number, list]); //number 혹은 list가 바뀌었을 때만 함수 생성**

    const avg = useMemo(() => getAverage(list), [list]);

    return (
        <div>
            <input value={number} onChange={onChange} />
            <button onClick={onInsert}> 등록 </button>
            <ul>
                {list.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값 : </b> {avg}
            </div>
        </div>
    );
};

export default Average;
```

- useCallback의 첫 번째 파라미터에는 생성하고 싶은 함수 넣고
- 두 번째 파라미터에는 배열을 넣기
  - 이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시해야 함.
- onChange 처럼 비어 있는 배열을 넣을 경우 컴포넌트가 렌더링 될 때 만들었던 함수를 계속해서 재사용하게 됨.
- onInsert처럼 배열 안에 numbers와 list를 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가될 때 새로 만들어진 함수 사용
- 함수 내부에서 상태 값에 의존해야할 때는 그 값을 반드시 두 번째 파라미터 안에서 포함시켜 주어야 함.
  - ex) onChange의 경우 : 기존의 값을 초기화하지 않고 바로 설정만 하므로 배열이 비어있어도 상관없지만 onInsert는 기존의 number와 list를 조회하여 nextList를 생성하기 때문에 배열안에 number와 list를 꼭 넣어 주어야 함.

# 8.6. useRef

```jsx
const refContainer = useRef(initialValue);
```

useRef Hook은 함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해줌

Average 컴포넌트에서 등록 버튼을 눌렀을 때 포커스가 인풋쪽으로 넘어가도록 코드 작성하기

```jsx
// src\Average.js

import React, { useState, useMemo, useCallback, useRef } from 'react';

const getAverage = numbers => {
    console.log('평균값 계산 중..');
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b);
    return sum/numbers.length;
    };

const Average = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');
    **const inputEI = useRef(null);**

    const onChange = useCallback(e => {
        setNumber(e.target.value);
    }, []); //처음 컴포넌트가 렌더링 될 때에만 함수 생성
    const onInsert = useCallback(() => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
    }, [number, list]); //number 혹은 list가 바뀌었을 때만 함수 생성

    const avg = useMemo(() => getAverage(list), [list]);

    return (
        <div>
            <input value={number} onChange={onChange} **ref={inputEI}** />
            <button onClick={onInsert}> 등록 </button>
            <ul>
                {list.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값 : </b> {avg}
            </div>
        </div>
    );
};

export default Average;
```

useRef를 사용하여 ref를 설정하면 useRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가리킨다.

## 8.6.1. 로컬 변수 사용하기

추가로 컴포넌트 로컬 변수를 사용해야 할 때도 useRef 활용 가능

- 로컬 변수 : 렌더링과 상관없이 바뀔 수 있는 값
- 클래스 형태로 작성된 컴포넌트의 경우 로컬 변수를 사용해야 할 때 다음과 같이 작성 가능

```jsx
// 예시 코드

import React, { Component } from "react";

class MyComponent extends Componenet {
  id = 1;
  setId = (n) => {
    this.id = n;
  };
  printId = () => {
    console.log(this.id);
  };
  render() {
    reuturn(<div>MyComponenet</div>);
  }
}

export default MyComponent;
```

이 코드를 함수형 컴포넌트로 작성 해보자

```jsx
// 예시 코드

import React, { useRef } from "react";

const RefSample = () => {
  const id = useRef(1);
  const setId = (n) => {
    id.current = n;
  };
  const printId = () => {
    console.log(id.current);
  };
  reuturn(<div>MyComponenet</div>);
};

export default RefSample;
```

이렇게 ref 안의 값이 바뀌어도 컴포넌트가 렌더링되지 않는다는 점에는 주의해야 함.

렌더링과 관련되지 않은 값을 관리할 때만 이러한 방식으로 코드를 작성하기

# 8.7. 커스텀 Hooks 만들기

- 여러 컴포넌트에서 비슷한 기능을 공유할 경우 스스로의 Hook으로 작성하여 로직을 재사용할 수 있음
- 기존 Info 컴포넌트에서 여러 개의 인풋 관리를 위해 userReducer로 작성했던 로직을 useInputs라는 Hook으로 따로 분리하기

```jsx
// src\useInputs.js

import { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.vlaue,
  };
}

export default function useInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = (e) => {
    dispatch(e.target);
  };
  return [state, onChange];
}
```

이 Hook을 Info 컴포넌트에서 사용해보면

```jsx
// src\Info.js

import React, { useReducer } from "react";
import useInputs from "./useInputs";

const Info = () => {
  const [state, onChange] = useInputs({
    name: "",
    nickname: "",
  });
  const { name, nickname } = state;

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b>
          {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```

훨씬 깔끔하게 사용 가능하다

# 8.8. 다른 Hooks

- 우리가 커스텀 Hooks를 만들어 사용한 것 처럼 다른 개발자가 만든 Hooks도 라이브러리로 설치하여 사용 가능함

[https://nikgraf.github.io/react-hooks/](https://nikgraf.github.io/react-hooks/)

[https://github.com/rehooks/awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)

# 8.9. 정리

리액트에서 Hooks 패턴을 사용하면 클래스형 컴포넌트 작성 없이도 대부분의 기능 구현이 가능하다.

리액트에서 가능해졌다고 해서 기존 setState 방식이 잘못된 것은 아니다.

리액트 메뉴얼에 따르면, 기존 클래스형 컴포넌트는 앞으로도 계속해서 지원될 예정이기 때문에 만약 유지 보수하고 있는 프로젝트에서 클래스형 컴포넌트를 사용하고 있다면 굳이 Hooks와 함수형 컴포넌트의 형태로 바꿀 필요는 없다.

그러나 메뉴얼에서는 새로 작성하는 컴포넌트의 경우 함수형 컴포넌트와 Hooks를 사용할 것을 권장.

프로젝트 개발시에는 함수형 컴포넌트의 사용을 우선으로 두고 꼭 필요한 상황에서만 클래스형 컴포넌트를 구성하도록 한다.ek
