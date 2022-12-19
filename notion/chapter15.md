- Context API는 리액트 프로젝트에서 전역적으로 사용할 데이터가 있을 떄 유용한 기능
  - 사용자 로그인 정보
  - 애플리케이션 환경 설정
  - 테마 등
- 리덕스, 리액트 라우터, Styled-components 등의 라이브러리는 Context 기반으로 구현 됨.

- Context API 실습흐름
  1. Context API를 사용한 전역 상태 관리 흐름 이해하기
  2. 기본적인 사용법 익히기
  3. 동적 Context 사용하기
  4. Consumer 대신 Hook 또는 static contextType 사용하기

## 15.1. Context API를 사용한 전역 상태 관리 흐름 이해하기

- 리액트 애플리케이션은 컴포넌트 간의 데이터를 props로 전달하기 때문에 컴포넌트 여기저기에 필요한 데이터가 있을 때에는 주로 최상위 컴포넌트인 App의 state에 넣어서 관리
- 예시로 보기
  - G 컴포넌트는 전역 상태를 업데이트시키고, F와 J 컴포넌트는 업데이트된 상태로 렌더링.
  - APP 컴포넌트에서는 다음과 같이 상태와 업데이트 함수를 정의해야 함.
    ```jsx
    const [value, setValue] = useState("hello");
    const onSetValue = useCallback((value) => setValue(value), []);
    ```
  - App이 지니고 있는 value 값을 F 컴포넌트와 J 컴포넌트에 전달하려면 여러 컴포넌트를 거쳐야 함. | 복잡하게 여러 번 거쳐서 전달해야 함.
  - F의 경우
    App → A → B → F의 흐름
  - J의 경우
    App → H → J의 흐름.
  - G 컴포넌트에 상태 업데이트 함수를 전달할 때도
    App → A → B → E → G의 흐름
  - 이런 방식은 유지 보수성이 낮아질 가능성이 있음.
  - 이에 따라 리덕스나 MobX와 같은 상태 관리 라이브러리를 사용해 전역 관리 작업을 더 편하게 처리하기도 하지만 최신 버전의 경우 Context API의 개선으로 별도 라이브러리 없이도 ㅈ

![일반적인 전역 상태 관리 흐름](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/485874a8-c08c-4f55-9b76-b5084787c395/Untitled.png)

일반적인 전역 상태 관리 흐름

![Context API를 사용한 전역 상태 관리 ](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/269a93e3-4f60-439c-8522-78d9801c9f98/Untitled.png)

Context API를 사용한 전역 상태 관리

Context API 사용시 Context를 만들어 단 한 번에 원하는 값을 받아와 사용할 수 있음

## 15.2. Context API 사용법 익히기

리액트 프로젝트 생성

```bash
$ yarn create react-app context-tutorial
```

### 15.2.1. 새 Context 만들기

- 프로젝트 생성후 src/context/colors.js 생성
- Context를 만들 때 반드시 context 디렉토리를 만들 필요는 없지만 본 프로젝트에서는 다른 파일과 구분하기 위해 경로 생성

```jsx
import { createContext } from "react";

const ColorContext = createContext({ color: "black" });

export default ColorContext;
```

- 새 Context를 만들 때는 createContext 함수 사용
- 파라미터에는 해당 Context의 기본 상태 지정

### 15.2.2 Consumer 사용하기

- ColorBox라는 컴포넌트를 만들어 ColorContext 안에 들어 있는 색상을 보여주기
- 색상을 props로 받아오지 않고, ColorContext 안에 들어 있는 Consumer라는 컴포넌트를 통해 색상 조회

- src/components/ColorBox.js 파일을 생성해 코드 입력

```jsx
import React from "react";
import ColorContext from "../contexts/colors";

const ColorBox = () => {
  return (
    <ColorContext.Consumer>
      {(value) => (
        <div
          style={{
            width: "64px",
            height: "64px",
            background: value.color,
          }}
        />
      )}
    </ColorContext.Consumer>
  );
};

export default ColorBox;
```

- Comsumer 사이에 중괄호를 열어 함수를 넣어줌
- 이런 패턴을 `Function as Child` 혹은 `Render Props` 라고 함
- 컴포넌트의 children이 있어야 할 자리에 일반 JSX 혹은 문자열이 아닌 함수를 전달하는 것
- Render Props 패턴이 헷갈릴 때 살펴볼 예제
  ```jsx
  import React from 'react';
  const RenderPropsSample = ({ children }) => {
  	return <div>결과: {children(5)}></div>
  };

  export default RenderPropsSample;

  만약 위와 같은 컴포넌트가 있다면 추후 사용시 아래와 같이 사용 가능

  <RenderPropsSample>{value => 2*value}</RenderPropsSample>;

  RenderPropsSample에게 children props로 파라미터에 2를 곱해서 반환하는 함수를 전달하면 해당 컴포넌트에서는 이 함수에 5를 인자로 넣어서 "결과 : 10"을 렌더링함.

  ```

컴포넌트를 App에 렌더링하자

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9220153a-32c6-446b-9747-f27602f1ca9b/Untitled.png)

```jsx
import "./App.css";
import ColorBox from "./componenets/ColorBox";

function App() {
  return (
    <div>
      <ColorBox />
    </div>
  );
}

export default App;
```

### 15.2.3. Provider

- Provider를 사용하면 Context의 value를 변경 가능
- App 컴포넌트를 수정

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/47ef0770-9fcc-4113-8bbf-cdcbd40f0cd9/Untitled.png)

```jsx
import "./App.css";
import ColorBox from "./componenets/ColorBox";
import ColorContext from "./contexts/colors";

function App() {
  return (
    <ColorContext.Provider value={{ color: "red " }}>
      <div>
        <ColorBox />
      </div>
    </ColorContext.Provider>
  );
}

export default App;
```

- 기존 createContext 함수를 사용할 때는 파라미터로 Context의 기본값을 넣어주었는데, 이 기본값은 Provider를 사용하지 않았을 때만 사용됨.
- 만약 Provider는 사용했는데 value를 명시하지 않았다면, 이 기본값을 사용하지 않기 때문에 오류 발생.

- **오류 발생 코드 확인하기**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c69202a5-9140-4ff4-8c93-a13e3353ef2a/Untitled.png)

```jsx
import "./App.css";
import ColorBox from "./componenets/ColorBox";
import ColorContext from "./contexts/colors";

function App() {
  return (
    <ColorContext.Provider>
      <div>
        <ColorBox />
      </div>
    </ColorContext.Provider>
  );
}

export default App;
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5a2256d7-3fc5-4ea7-bedc-aace160b8f7d/Untitled.png)

- Provider 사용시에는 value 값을 꼭 명시해주기

## 15.3. 동적 Context 사용하기

- 앞에서의 코드들은 고정 값만 사용 가능
- Context의 값을 업데이트해야 하는 경우 알아보기

### 15.3.1. Context 파일 수정하기

- Context의 value 값에는 상태값만이 아닌 함수 전달도 가능
- ColorContext의 코드 수정하기
  - 오류가 발생하지만 나중에 수정할 것 이므로 일단 진행
  ```jsx
  import { createContext, useState } from "react";

  const ColorContext = createContext({
    state: { color: "black", subcolor: "red " },
    actions: {
      setColor: () => {},
      setSubcolor: () => {},
    },
  });

  const ColorProvider = ({ children }) => {
    const [color, setColor] = useState("black");
    const [subcolor, setSubcolor] = useState("red");

    const value = {
      state: { color, subcolor },
      actions: { setColor, setSubcolor },
    };
    return (
      <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
    );
  };

  // const ColorConsumer = ColorContext.Comsumer와 같은 의미
  const { Consumer: ColorConsumer } = ColorContext;

  // ColorProvider와 ColorConsumer 내보내기
  export { ColorProvider, ColorConsumer };

  export default ColorContext;
  ```
  - ColorProvider라는 컴포넌트 새로 작성
  - 그 컴포넌트에는 ColorContext.Provider를 렌더링함.
  - 이 Provider의 value에는 상태는 state로, 업데이트 함수는 actions로 묶어서 전달.
  - Context에서 값을 동적으로 사용할 때 반드시 묶어줄 필요는 없으나 state와 actions 객체를 따로따로 분리해 주면 나중에 다른 컴포넌트에서 Context 값을 사용할 때 편함.
    -
  - createContext를 사용할 때 기본값으로 사용할 객체도 수정.
    - createContext의 기본값은 실제 Provider의 value에 넣는 객체의 형태와 일치시켜 주는 것이 좋음.
    - Context의 코드를 볼 때 내부 값이 어떻게 구성되어 있는지 파악하기도 쉽고, 실수로 Provider를 사용하지 않았을 때 리액트 애플리케이션에서 에러가 발생하지 않음.

### 15.3.2. 새로워진 Context를 프로젝트에 반영하기

- App 컴포넌트에서 ColorContext.Provider를 ColorProvider로 대체하기

```jsx
import "./App.css";
import ColorBox from "./componenets/ColorBox";
import { ColorProvider } from "./contexts/colors";

function App() {
  return (
    <ColorProvider>
      <div>
        <ColorBox />
      </div>
    </ColorProvider>
  );
}

export default App;
```

- ColorBox도 마찬가지로 ColorContext.Consumer로 변경하기.
- 사용할 value의 형태도 바뀌었으므로 이에 따른 변화를 다음과 같이 반영

```jsx
import React from "react";
import ColorContext, { ColorConsumer } from "../contexts/colors";

const ColorBox = () => {
  return (
    <ColorConsumer>
      {(value) => (
        <>
          <div
            style={{
              width: "64px",
              height: "64px",
              background: value.state.color,
            }}
          />
          <div
            style={{
              width: "32px",
              height: "32px",
              background: value.state.subcolor,
            }}
          />
        </>
      )}
    </ColorConsumer>
  );
};

export default ColorBox;
```

- 위 코드에서 객체 비구조화 할당 문법을 사용해 다음과 같이 value 조회 생략 가능

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/116d47e1-6de3-4d44-b533-9cada3ae8e5d/Untitled.png)

```jsx
import React from "react";
import ColorConsumer from "../contexts/colors";

const ColorBox = () => {
  return (
    <ColorConsumer>
      {({ state }) => (
        <>
          <div
            style={{
              width: "64px",
              height: "64px",
              background: state.color,
            }}
          />
          <div
            style={{
              width: "32px",
              height: "32px",
              background: state.subcolor,
            }}
          />
        </>
      )}
    </ColorConsumer>
  );
};

export default ColorBox;
```

### 15.3.3. 색상 선택 컴포넌트 만들기

- Context의 actions에 넣어 준 함수를 호출하는 컴포넌트 만들기
- components 디렉터리에 SelectColors.js라는 파일을 생성해 코드 작성하기
- Consumer 사용 없이 UI만 준비

```jsx
//components/SelectColors.js

import React from "react";

const colors = ["red", "orange", "yellow", "blue", "indigo", "violet"];

const SelectColors = () => {
  return (
    <div>
      <h2>색상을 선택하세요.</h2>
      <div style={{ display: "flex" }}>
        {colors.map((color) => (
          <div
            key={color}
            style={{
              background: color,
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default SelectColors;
```

- App 컴포넌트 ColorBox 위에 렌더링하기

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a92c73aa-1ca7-41ef-93c3-b9f8ec956811/Untitled.png)

```jsx
import "./App.css";
import ColorBox from "./componenets/ColorBox";
import SelectColors from "./componenets/SelectColors";
import { ColorProvider } from "./contexts/colors";

function App() {
  return (
    <ColorProvider>
      <div>
        <SelectColors />
        <ColorBox />
      </div>
    </ColorProvider>
  );
}

export default App;
```

- 기능 추가
  - 해당 SelectColors에서
    - 마우스 왼쪽 버튼 클릭시 큰 정사각형의 색상 변경,
    - 마우스 오른쪽 버튼 클릭시 작은 정사각형의 색상 변경

```jsx
import React from "react";
import { ColorConsumer } from "../contexts/colors";

const colors = ["red", "orange", "yellow", "blue", "indigo", "violet"];

const SelectColors = () => {
  return (
    <div>
      <h2>색상을 선택하세요.</h2>
      <ColorConsumer>
        {({ actions }) => (
          <div style={{ display: "flex" }}>
            {colors.map((color) => (
              <div
                key={color}
                style={{
                  background: color,
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
                onClick={() => actions.setColor(color)}
                // 마우스 오른쪽 버튼 클릭 이벤트
                onContextMenu={(e) => {
                  // 브라우저 메뉴 호출 금지
                  e.preventDefault();
                  actions.setSubcolor(color);
                }}
              />
            ))}
          </div>
        )}
      </ColorConsumer>
      <hr />
    </div>
  );
};

export default SelectColors;
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a4d9e37a-6d67-401b-bd0e-3055d59b1943/Untitled.png)

마우스 오른쪽 버튼 클릭 이벤트 ⇒ onContextMenu 사용

오른쪽 클릭 시 원래 브라우저 메뉴가 나타나지만 e.preventDefault()를 호출하면 메뉴가 뜨지 않음

## 15.4. Consumer 대신 Hook 또는 static contextType 사용하기

- Context에 있는 값을 사용할 때 Consumer 대신 다른 방식을 사용하여 값을 받아오기

```jsx
//components/ColorBox.js

import React, { useContext } from "react";
import ColorContext from "../contexts/colors";

const ColorBox = () => {
  const { state } = useContext(ColorContext);
  return (
    <>
      <div
        style={{
          width: "64px",
          height: "64px",
          background: state.color,
        }}
      />
      <div
        style={{
          width: "32px",
          height: "32px",
          background: state.subcolor,
        }}
      />
    </>
  );
};

export default ColorBox;
```

- 훨씬 간결해졌다!
- 만약 children 함수를 전달하는 Render Props 패턴이 불편하다면, useContext Hook을 사용하여 훨씬 편하게 Context 값 조회 가능
- Hook은 함수형 컴포넌트에서만 사용할 수 있음! 클래스형 컴포넌트에서는 Hook 사용 불가

## 15.5. 정리

- 기존 컴포넌트 간에 상태를 교류해야 할 때 무조건 부모 → 자식 흐름으로 전달했지만 Context API를 통하면 더욱 쉽게 상태 교류가 가능함.
- 프로젝트의 컴포넌트 구조가 간단하고 다루는 상태의 종류가 많지 않다면 굳이 Context를 사용할 필요는 없음.
- 전역적으로 사용되는 상태가 있고, 컴포넌트의 개수가 많다면 Context API를 사용하는 것을 권장
