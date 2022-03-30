반복되는 형태의 코드가 반복 될 때 이에 대한 내용을 효율적으로 보여주고 관리하는방법

src 디렉터리에 lterationSample.js 파일 작성

```jsx
// src/IterationSample.js

import React from 'react';

const IterationSample = () => {
    return (
        <ul>
            <li>눈사람</li>
            <li>얼음</li>
            <li>눈</li>
            <li>바람</li>    
        </ul>
    );
};

export default IterationSample;
```

# 6.1. 자바스크립트 배열의 map() 함수

자바스크립트 배열 객체의 내장 함수인 map 함수를 사용

- map함수 : 파라미터로 전달된 함수를 사용해서 배열 내 각 요소를 원하는 규칙에 따라 변환한 후 그 결과로 새로운 배열을 생성

 

## 6.1.1. 문법

```jsx

arr.map(callback, [thisArg])

```

- callback : 새로운 배열 요소를 생성하는 함수, 파라미터는 아래의 세 가지
    
    -currentValue : 현재 처리하고 있는 요소
    
    -index: 현재 처리하고 있는 요소의 index 값
    
    -array: 현재 처리하고 있는 원본 배열
    
- thisArg(선택항목) : callback 함수 내부에서 사용할 this 레퍼런스

## 6.1.2 예제

map 함수를 사용 > 배열 [1,2,3,4,5]의 각 요소를 제곱한 새로운 배열 생성

```jsx
var numbers = [ 1,2,3,4,5];

var processed = numbers.map(function(num){
	return num*num;
});

console.log(processed);
```

위 코드를 ES6 문법으로 작성

```jsx
const numbers = [1,2,3,4,5];
const result = numbers.map(num => num * num);
console.log(result);
```

- var > const
- function(...){...} > 화살표 함수

# 6.2. 데이터 배열을 컴포넌트 배열로 변환하기

## 6.2.1. 컴포넌트 수정하기

IterationSample.js 다음과 같이 수정

```jsx
// src/IterationSample.js

import React from 'react';

const IterationSample = () => {
    const names = ['눈사람', '얼음', '눈', '바람'];
    const nameList = names.map(name => <li>{name}</li>);
    return (
        <ul>{nameList}</ul>
    );
};

export default IterationSample;
```

## 6.2.2. App 컴포넌트에서 예제 컴포넌트 렌더링

```jsx
// src/App.js

import React, { Component } from 'react';
import IterationSample from './IterationSample'; 
// 우리가 만든 컴포넌트 불러오기

class App extends Component {
  render() {
    return (
      <IterationSample/>
    );
  }
}

export default App;
```

화면에는 의도한대로 뜨지만 개발자도구를 열어보면 key가 없다는 경고 메시지가 뜸

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1f1c9ab7-7d42-44ec-9399-6b37a40251ac/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1f1c9ab7-7d42-44ec-9399-6b37a40251ac/Untitled.png)

# 6.3. key

리액트에서 키 

: 컴포넌트 배열을 렌더링 했을 때 어떤 원소에 변동이 있었는지를 알아내려고 사용함.

key가 없을 때 → VIrtual DOM을 비교하는 과정에서 리스트를 순차적으로 비교하면서 변화 감지

key가 있을 때 → key값 을 이용하여 변화를 빠르게 알아낼 수 있음

## 6.3.1. key 설정

: map 함수의 인자로 전달되는 함수 내부에서 컴포넌트 props를 설정하듯이 설정함.

- key 값은 언제나 유일 → 데이터가 가진 고유값을 key 값으로 설정
    - 게시판의 게시물 렌더링할 경우는 게시물 번호가 key 값으로 지정 됨

앞서 만들었던 컴포넌트에는 고유 번호가 없으므로 map 함수에 전달되는 콜백 함수의 인수인 index 값 사용

```jsx
// src/IterationSample.js

import React from 'react';

const IterationSample = () => {
    const names = ['눈사람', '얼음', '눈', '바람'];
    const nameList = names.map((**name, index) => <li key={index}>{name}**</li>);
    return (
        <ul>{nameList}</ul>
    );
};

export default IterationSample;
```

코드 수정 이후 개발자 도구의 오류 사라짐

고유한 값이 없을 때에만 index 사용 ⇒ index를 key로 사용하는 것은 비효율적임

# 6.4. 응용

- 동적인 배열을 렌더링 구현
- index 값을 key로 사용해야 하는 상황에 고윳값을 만드는 방법
- 유동적인 데이터 렌더링
    1. 초기 상태 설정하기
    2. 데이터 추가 기능 구현하기
    3. 데이터 제거 기능 구현하기

## 6.4.1. 초기 상태 설정하기

IterationSample 컴포넌트에서 useState로 세 가지 상태 설정

1. 데이터 배열
2. 텍스트를 입력할 수 있는 input 상태
3. 데이터 배열에서 새로운 항목을 추가할 때 사용 할 고유 id를 위한 상태

- 객체 형태로 이루어진 배열을 만들 것 (객체에는 문자열과 고유 id 값이 있음)

```jsx
// src/IterationSample.js

import React, { useState } from 'react';

const IterationSample = () => {
    const [names, setNames] = useState ([
        { id: 1, text: '눈사람'},
        { id: 2, text: '얼음'},
        { id: 3, text: '눈'},
        { id: 4, text: '바람'},
        
    ]);
    const [inputText,setInputText ] = useState('');
    const [nextId, setNextId] = useState(5); // 새로운 항목 추가 시 사용할 id

    const nameList = names.map(name => <li key={name.id}>{name.text}</li>);
    return (
        <ul>{nameList}</ul>
    );
};

export default IterationSample;
```

코드 수정 후 브라우저 창에서 이전과 같은 결과 나오는지 확인하기

## 6.4.2. 데이터 추가 기능 구현하기

1. ul 태그 상단에 input과 button을 렌더링
2. input 상태 관리

```jsx
// src/IterationSample.js

import React, { useState } from 'react';

const IterationSample = () => {
    const [names, setNames] = useState ([
        { id: 1, text: '눈사람'},
        { id: 2, text: '얼음'},
        { id: 3, text: '눈'},
        { id: 4, text: '바람'},
        
    ]);
    const [inputText,setInputText ] = useState('');
    const [nextId, setNextId] = useState(5); // 새로운 항목 추가 시 사용할 id

    const onChange = e => setInputText(e.target.value);

    const nameList = names.map(name => <li key={name.id}>{name.text}</li>);
    return (
        <>
        <input value={inputText} onChange={onChange} />
        <button>추가</button>
        <ul>{nameList}</ul>
        </>
    );
};

export default IterationSample;
```

그 다음 

1. 버튼 클릭시 호출할 onClick 함수 선언
2. 선언한 함수를 버튼의 onClick 이벤트로 설정
3. onClick 함수 → 배열의 내장 함수 concat을 사용하여 새로운 항목을 추가한 배열을만들고, setNames를 통해 상태 업데이트

```jsx
// src/IterationSample.js

import React, { useState } from 'react';

const IterationSample = () => {
    const [names, setNames] = useState ([
        { id: 1, text: '눈사람'},
        { id: 2, text: '얼음'},
        { id: 3, text: '눈'},
        { id: 4, text: '바람'},
        
    ]);
    const [inputText,setInputText ] = useState('');
    const [nextId, setNextId] = useState(5); // 새로운 항목 추가 시 사용할 id

    const onChange = e => setInputText(e.target.value);
    **const onClick = () => {
        const nextNames = names.concat({
            id: nextId, //nextID 값을 id로 설정
            text : inputText
        });
        setNextId(nextId + 1); // nextID 값에 1을 더해 줌
        setNames(nextNames); //names 값을 업데이트
        setInputText('') //inputText를 비운다.**
    };

    const nameList = names.map(name => <li key={name.id}>{name.text}</li>);
    return (
        <>
        <input value={inputText} onChange={onChange} />
        <button **onClick={onClick**}>추가</button>
        <ul>{nameList}</ul>
        </>
    );
};

export default IterationSample;
```

- push 함수가 아닌 concat 함수로 배열에 새 항목을 추가함
    
    → push는 기존 배열 자체를 변경하지만 concat은 새로운 배열을만들기 때문에
    
    → [불변성 유지] 리액트에서 상태 업데이트시 기존 상태를 그대로 두면서 새로운 값을 상태로 설정해야 함.
    
- onClick 함수
    1. 새로운 항목 추가시 객체의 id 값은 nextID 사용
    2. 클릭될 때마다 값이 1씩 올라가도록 구현
    3. 추가로 button이 클릭될 때 기존의 input 내용을 비우는 것도 구현

## 6.4.3. 데이터 제거 기능 구현

각 항목을 더블클릭 했을 때 해당 항목이 화면에서 사라지는 기능 구현

- 불변성 유지하면서 업데이트 해야 함. > 내장함수 filter 사용

```jsx
// filter 사용 예시

const numbers = [1,2,3,4,5,6];
const biggerThanThree = numbers.filter(number => number > 3);

// 결과 : [4,5,6]
```

- filter 함수의 인자에 분류하고 싶은 조건을 반환하는 함수를 넣어 쉽게 분류 가능

- 특정 배열에서 특정 원소만 제외 시키기도 가능

```jsx

const numbers = [1,2,3,4,5,6];
const withoutThree= numbers.filter(number => number!==> 3);

// 결과 : [1,2, 4,5,6]
```

- filter 함수로 컴포넌트 항목 제거 기능 구현하기
    1. HTML 요소 더블클릭 시 사용하는 이벤트 이름 onDoubleClick
    2. onRemove라는 함수를 만들어 각 li 요소에 이벤트 등록

```jsx
// src/IterationSample.js

import React, { useState } from 'react';

const IterationSample = () => {
    const [names, setNames] = useState ([
        { id: 1, text: '눈사람'},
        { id: 2, text: '얼음'},
        { id: 3, text: '눈'},
        { id: 4, text: '바람'},
        
    ]);
    const [inputText,setInputText ] = useState('');
    const [nextId, setNextId] = useState(5); // 새로운 항목 추가 시 사용할 id

    const onChange = e => setInputText(e.target.value);
    const onClick = () => {
        const nextNames = names.concat({
            id: nextId, //nextID 값을 id로 설정
            text : inputText
        });
        setNextId(nextId + 1); // nextID 값에 1을 더해 줌
        setNames(nextNames); //names 값을 업데이트
        setInputText('') //inputText를 비운다.
    };
    **const onRemove = id => {
        const nextNames = names.filter(name => name.id !== id);
        setNames(nextNames);
    }**

    const nameList = names.map(name => <li key={name.id} **onDoubleClick={() => onRemove(name.id)}**>{name.text}</li>);
    return (
        <>
        <input value={inputText} onChange={onChange} />
        <button onClick={onClick}>추가</button>
        <ul>{nameList}</ul>
        </>
    );
};

export default IterationSample;
```

코드 저장 후 브라우저에서 항목을 더블클릭하여 제거 되는지 확인하기.

# 6.5. 정리

- 반복되는 데이터 렌더링
    - 이를 으용한 유동적인 배열
    - 컴포넌트 배열 렌더링 시에는 key 값 설정 주의
    - key 값은 항상 유일함 → 중복시 렌더링 과정에서 오류 발생
- 상태 안에서 배열 변경시 직접 접근 하여 수정 ❌❌❌
    - concat, filter 등의 배열 내장 함수를 사용해 새로운 배열을 만든 후에 이를 새로운 상태로 설정해 주어야 함.