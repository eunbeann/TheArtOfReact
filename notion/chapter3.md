- 컴포넌트의 기능은 단순한 템플릿 이상
    1. 데이터에 맞추어 UI 생성
    2. 라이프사이클 API를 이용하여 컴포넌트가 화면에서 나타날 때, 사라질 때, 변화가 일어날 때 주어진 작업들을 처리
    3. 임의의 메서드를 만들어 특별한 기능 추가
    

# 클래스형 컴포넌트

- 지금까지 봐온 App 컴포넌트 > 함수형 컴포넌트

```fortran
// src/App.js
**{/* 함수형 컴포넌트의 구조 */}**

import React from 'react';
import './App.css';

function App() {
  const name = '리액트';
  return <div className="react">{name}</div>;
}

export default App;
```

- 컴포넌트의 선언 방식
    1. 함수형 컴포넌트
    2. 클래스형 컴포넌트
    

클래스형 컴포넌트의 구조

```fortran
// src/App.js

import React, { Component } from 'react';

class App extends Component {
  render() {
    const name = 'react';
    return <div className="react">{name}</div>
  }
}
export default App;
```

- **클래스형 컴포넌트**
    1. state 기능, 라이프 사이클 기능 사용 가능
    2. 임의 메서드 정의 가능
    3. render 함수 필수 > 그 안에서 보여주어야 할 JSX 반환해야 함.
    
- **함수형 컴포넌트는**
    1. 선언하기 편함
    2. 메모리 자원 비교적 적게 사용
    3. 빌드 이후 배포 단계에서도 비교적으로 파일 크기가 더 작음
    4. state, 라이프사이클 API 사용 불가능 > v16.8 업데이트 이후 Hooks 기능 도입으로 해결.
    5. 매뉴얼에서는 함수형과 Hooks 사용을 권고함.
    

# 3.2. 첫 컴포넌트 생성하기 🤩

1. 파일 만들기
2. 코드 작성하기
3. 모듈 내보내기 및 불러오기

## 3.2.1. src 디렉터리에 MyComponent.js 파일 생성

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/efd5b61d-2b2c-4bcb-90db-2ca91367bc15/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/efd5b61d-2b2c-4bcb-90db-2ca91367bc15/Untitled.png)

## 3.2.2 코드 작성하기

새 컴포넌트의 코드 작성

```jsx
// src/MyComponent.js

import React  from 'react';

const MyComponent = () => {
    return <div>나의 새롭고 멋진 컴포넌트</div>;
};

export default MyComponent;
```

## 3.2.3. 모듈 내보내기 및 불러오기

### 3.2.3.1. 모듈 내보내기 (export)

제일 아래 코드는  다른 파일에서 이 파일을 import 할 때, 위에서 선언함 MyComponent 클래스를 불러오도록 설정함.

```jsx

export default MyComponent;

```

### 3.2.3.2. 모듈 불러오기 (import)

App 컴포넌트에서 MyComponent 컴포넌트를 불러와서 사용하기

App 컴포넌트를 다음과 같이 작성

```jsx
// src/App.js

import React from 'react';
import MyComponent from './MyComponent'; 
// 우리가 만든 컴포넌트 불러오기

const App = () => {
  return <MyComponent />;
};

export default App;
```

 

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/940fa278-13bb-41f7-9e2d-22f4fb71e70f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/940fa278-13bb-41f7-9e2d-22f4fb71e70f/Untitled.png)

 

위와 같이 렌더링 되었다면 정상 작동!

# 3.3 props

1. properties를 줄인 표현, 컴포넌트 속성 설정시에 사용하는 요소

## 3.3.1. JSX 내부에서 props 렌더링

1. props 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 설정
    1. 현재의 상황에서는 App 컴포넌트
    

MyCoponent 컴포넌트를 수정하여 해당 컴포넌트에서 name이라는 porps 렌더링하기.

```jsx
// src/MyComponent.js

import React from 'react';

const MyComponent = props => {
	return <div> 안녕하세요, 제 이름은 {props.name} 입니다.</div>;
};

export default MyComponent;
```

## 3.3.2. 컴포넌트를 사용할 때 props 값 지정하기

App 컴포넌트에서 MyComponent의 props 값 지정

```jsx
// src/App.js

import React from 'react';
import MyComponent from './MyComponent'; 
// 우리가 만든 컴포넌트 불러오기

const App = () => {
  return <MyComponent name="React" />;
};

export default App;
```

코드를 브라우저 실행시 다음과 같은 결과

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b2abd7ac-3584-47fd-a02b-f0fdb480b87e/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b2abd7ac-3584-47fd-a02b-f0fdb480b87e/Untitled.png)

## 3.3.3. props 기본값 설정: defaultProps

방금 설정한 name 값을 지우고 다시 설정

```jsx
// src/App.js

import React from 'react';
import MyComponent from './MyComponent'; 
// 우리가 만든 컴포넌트 불러오기

const App = () => {
  return <MyComponent />;
};

export default App;
```

defaultProps : props값을 따로 지정하지 않았을 때 보여 줄 기본 값을 설정

```jsx
// src/MyComponent.js
import React from 'react';

const MyComponent = props => {
	return <div> 안녕하세요, 제 이름은 {props.name} 입니다.</div>;
};

MyComponents.defaultProps = {
	name: '기본 이름'
};

export default MyComponent;
```

이 경우 브라우저에는 기본 이름이 출력 됨

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f8e4ba74-8964-4e9e-b218-155231a51fcf/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f8e4ba74-8964-4e9e-b218-155231a51fcf/Untitled.png)

## 3.3.4. 태그 사이의 내용을 보여주는 children

- children : 컴포넌트 태그 사이의 내용을 보여주는 porps

App 컴포넌트를 다음과 같이 수정함

```jsx
// src/App.js

import React from 'react';
import MyComponent from './MyComponent'; 
// 우리가 만든 컴포넌트 불러오기

const App = () => {
  return <MyComponent> 리액트 </MyComponent>;
};

export default App;
```

MyComponent 태그 사이에 작성한 문자열을 MyComponent 내부에서 보여 주려면 props.children 값을 보여주어야 함.

MyComponents를 다음과 같이 수정

```jsx
// src/MyComponent.js

import React from 'react';

const MyComponent = props => {
	return (
     <div>
          안녕하세요, 제 이름은 {props.name} 입니다. <br />
          children 값은 {props.children}
          입니다.
    </div>
     );};

MyComponent.defaultProps = {
    name: '기본 이름'
}
export default MyComponent;
```

브라우저 실행시  다음과 같은 화면 출력됨.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8f0f5101-d435-4554-aefd-99715a936a05/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8f0f5101-d435-4554-aefd-99715a936a05/Untitled.png)

## 3.3.5. 비구조화 할당 문법을 통해 props 내부 값 추출하기

## propTypes를 통한 props 검증

지금까지 props 값을 조회할 때 마다 props. 라는 키워드를 앞에 붙여주었으나 이 작업을 편하게 하기 위해 ES6의 비구조화 할당 문법을 사용하여 내부 값을 추출하기

더 짧은 코드로 사용 가능함.

```jsx
// src/MyComponent.js

import React from 'react';

const MyComponent = props => {
    const { name, children } = props;
	return (
     <div>
          안녕하세요, 제 이름은 {name} 입니다. <br />
          children 값은 {children}
          입니다.
    </div>
     );
    };

MyComponent.defaultProps = {
    name: '기본 이름'
}
export default MyComponent;
```

- 비구조화 할당(destructuring assignment) : 객체에서 값을 추출하는 문법
- (= 구조 분호 문법), 함수의 파라미터 부분에서도 사용할 수 있음.

```jsx
// src/MyComponent.js

import React from 'react';

const MyComponent = ( { name, children } ) => {
	return (
     <div>
          안녕하세요, 제 이름은 {name} 입니다. <br />
          children 값은 {children}
          입니다.
    </div>
     );
    };

MyComponent.defaultProps = {
    name: '기본 이름'
}
export default MyComponent;
```

위와 같이 더욱 편하게 표현 가능함.

---

- propTypes : 컴포넌트의 필수 props를 지정하거나, props의 타입 지정할 때 사용

propTypes를 지정해보자

코드 상단에 import 구문으로 불러오고 , 코드 하단에서 설정해준다.

```jsx
// src/MyComponent.js

import React from 'react';
**import PropTypes from 'prop-types';**

const MyComponent = ( { name, children } ) => {
	return (
     <div>
          안녕하세요, 제 이름은 {name} 입니다. <br />
          children 값은 {children}
          입니다.
    </div>
     );
    };

MyComponent.defaultProps = {
    name: '기본 이름'
};

**MyComponent.propTypes = {
    name: PropTypes.string
};**

export default MyComponent;
```

위와 같이 설정할 시 > name 값은 무조건 문자열의 형태로 전달해야함을 의미.

컴포넌트에 설정한 props 가 propTypes에서 지정한 형태와 일치하지 않을 경우 화면에 값이 나타나기는 하지만 개발자 도구에서 경고 메시지가 출력 됨.

 

### 3.3.6.1. isRequired를 사용하여 필수 propTypes 설정

- propTypes를 지정하지 않았을 때 경고 메시지를 띄우는 작업
- **propTypes를 지정할 때 뒤에 isRequired를 붙인다.**

favoriteNumber라는 숫자를 필수 props로 지정함.

```jsx
// src/MyComponent.js

import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ( { name, **favoriteNumber**, children } ) => {
	return (
     <div>
          안녕하세요, 제 이름은 {name} 입니다. <br />
          children 값은 {children}
          입니다.
          <br />
          **제가 좋아하는 숫자는 {favoriteNumber} 입니다.**
    </div>
     );
    };

MyComponent.defaultProps = {
    name: '기본 이름'
};

MyComponent.propTypes = {
    name: PropTypes.string,
    **favoriteNumber: PropTypes.number.isRequired**
};

export default MyComponent;
```

위 코드 실행 후 개발자 도구 확인 시 다음과 같은 경고창이 뜬다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/82b80126-00ae-45a0-9445-55214f78312a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/82b80126-00ae-45a0-9445-55214f78312a/Untitled.png)

이에 대한 에러 해결을 위해 favoriteNumber 값을 제대로 전달

```jsx
// src/App.js

import React from 'react';
import MyComponent from './MyComponent'; 
// 우리가 만든 컴포넌트 불러오기

const App = () => {
  return (
    <MyComponent name="React" **favoriteNumber={1}**> 리액트 </MyComponent>
    );
  };

export default App;
```

관리자 도구 확인시 에러 메시지 뜨지 않음을 확인

### 3.3.6.2. 더 많은 PropTypes 종류

[https://github.com/facebook/prop-types](https://github.com/facebook/prop-types) ****에서 확인 가능.

## 3.3.7. 클래스형 컴포넌트에서 props 사용하기

- 클래스형 컴포넌트에서 props를 사용
    1. render 함수에서 this.props를 조회
    2. default와 propTypes는 똑같은 방식으로 설정 가능.

MyComponent 클래스형 컴포넌트로 변환 하기

```jsx
// src/MyComponent.js

import React, **{ Component }** from 'react';
import PropTypes from 'prop-types';

**class MyComponent extends Component {
    render() {**
        const { name, favoriteNumber, children } **= this.props**
        // 비구조화 할당
        return (
            <div>
                 안녕하세요, 제 이름은 {name} 입니다. <br />
                 children 값은 {children}
                 입니다.
                 <br />
                 제가 좋아하는 숫자는 {favoriteNumber} 입니다.
           </div>
        );
    }
}

MyComponent.defaultProps = {
    name: '기본 이름'
};

MyComponent.propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired
};

export default MyComponent;
```

클래스형 컴포넌트에서 defaultProps, propTypes 설정시 class 내부에서 지정도 가능

```jsx
// src/MyComponent.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {
    **static defaultProps = {
        name: '기본 이름'
    };
    static propTypes = {
        name: PropTypes.string,
        favoriteNumber: PropTypes.number.isRequired
    };**
    render() {
        const { name, favoriteNumber, children } = this.props
        // 비구조화 할당
        return (
            <div>
                 안녕하세요, 제 이름은 {name} 입니다. <br />
                 children 값은 {children}
                 입니다.
                 <br />
                 제가 좋아하는 숫자는 {favoriteNumber} 입니다.
           </div>
        );
    }
}

export default MyComponent;
```

# 3.4. state

- state : 컴포넌트 내부에서 바뀔 수  있는 값
    - props는 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 값
    - 컴포넌트 자신은 해당 props를 읽기 전용으로만 사용 가능함.
    - props 변경은 부모 컴포넌트에서 진행해야 함
    - 종류
        1. 클래스형 컴포넌트가 지니고 있는 state
        2. 함수형 컴포넌트에서 useState라는 함수를 통해 사용하는 state
    

## 3.4.1. 클래스형 컴포넌트의 state

src 디렉토리에 Counter.js 파일을 생성하여 아래의 코드 작성 

```jsx
// src/Counter.js

import React, { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        // state의 초깃값 설정
        this.state = {
            number : 0
        };
    }
    render() {
        const { number } = this.state //state를 조회할 때는 this.state로 조회
        return (
            <div>
                <h1>{number}</h1>
                <button
                // onCLick을 통해 버튼이 클릭되었을 때 호출할 함수 지정
                onClick={() => {
                    // this.state를 사용하여 state에 새로운 값을 넣을 수 있음.
                    this.setState({ number: number + 1});
                }}
                >
                    +1
                </button>
           </div>
        );
    }
}

export default Counter;
```

- 각 코드의 역할 알아보기
    1. constructor 메서드를 작성하여 state 설정
        1. constructor 작성시 반드시 super(pros)를 호출해주어야 함. 
        2. 함수 호출 시 현재 클래스형 컴포넌트가 상속받고 있는 리액트의 Component 클래스가 지난 생성자 함수를 호출해줌.
        3. this.state의 초깃값 설정. 컴포넌트는 states는 개체 형식이어야 함
        
        ```jsx
        class Counter extends Component {
            constructor(props) {
                super(props);
                // state의 초깃값 설정
                this.state = {
                    number : 0
                };
            }
        ```
        
    2. render 함수 확인
        1. render 함수에서 현재 state를 조회할 때는 this.state를 조회하면 됨
        2. button 안에 onClick 이벤트를 넣어 버틀 클릭 시 호출시킬 함수를 설정 (4장에서 다룸)
            1. 이벤트 설정 함수를 넣어 줄 때 : 화살표 함수 문법을 사용하여 넣어 줌
        
        ```jsx
        render() {
                const { number } = this.state //state를 조회할 때는 this.state로 조회
                return (
                    <div>
                        <h1>{number}</h1>
                        <button
                        // onCLick을 통해 버튼이 클릭되었을 때 호출할 함수 지정
                        onClick={() => {
                            // this.state를 사용하여 state에 새로운 값을 넣을 수 있음.
                            this.setState({ number: number + 1});
                        }}
                        >
                            +1
                        </button>
                   </div>
                );
            }
        ```
        
    3. Counter 컴포넌트를 App에서 불러와 렌더링해주기
        
        ```jsx
        // src/App.js
        
        import React from 'react';
        import Counter from './Counter'; 
        // 우리가 만든 컴포넌트 불러오기
        
        const App = () => {
          return <Counter />
          };
        
        export default App;
        ```
        
        브라우저에서 코드 실행 시 버튼을 누를 때마다 숫자가 1씩 올라가는 것을 확인할 수 있다!
        
    
    ### 3.4.1.1. state 객체 안에 여러 값이 있을 때
    
    state 객체 안에는 여러 값이 있을 수 있음.  
    
    Counter 컴포넌트를 수정해보자
    
    ```jsx
    	// src/Counter.js
    
    import React, { Component } from 'react';
    
    class Counter extends Component {
        constructor(props) {
            super(props);
            // state의 초깃값 설정
            this.state = {
                number : 0,
                **fixedNumber: 0**
            };
        }
        render() {
            const { number, **fixedNumber** } = this.state //state를 조회할 때는 this.state로 조회
            return (
                <div>
                    <h1>{number}</h1>
                    **<h2>바뀌지 않는 값: {fixedNumber } </h2>**
                    <button
                    // onCLick을 통해 버튼이 클릭되었을 때 호출할 함수 지정
                    onClick={() => {
                        // this.state를 사용하여 state에 새로운 값을 넣을 수 있음.
                        this.setState({ number: number + 1});
                    }}
                    >
                        +1
                    </button>
               </div>
            );
        }
    }
    
    export default Counter;
    ```
    
    버튼 클릭 시 number 값만 변경하고자 함
    
    this.setState 함수 사용시 인자로 전달되는 개체 내부에 fixedNumber을 넣지는 않음.
    
    this.setState 함수는 인자로 전달된 객체 안에 들어 있는 값만 변경
    
    ### 3.4.1.2. state를 construntor에서 꺼내기
    
    constructor가 아닌 다른 방식으로 state 초깃값 지정해주기
    
    ```jsx
    // src/Counter.js
    
    import React, { Component } from 'react';
    
    class Counter extends Component {
            **state = {
                number : 0,
                fixedNumber: 0
            };**
    
        render() {
            const { number, fixedNumber } = this.state //state를 조회할 때는 this.state로 조회
            return (
                <div>
                    <h1>{number}</h1>
                    <h2>바뀌지 않는 값: {fixedNumber } </h2>
                    <button
                    // onCLick을 통해 버튼이 클릭되었을 때 호출할 함수 지정
                    onClick={() => {
                        // this.state를 사용하여 state에 새로운 값을 넣을 수 있음.
                        this.setState({ number: number + 1});
                    }}
                    >
                        +1
                    </button>
               </div>
            );
        }
    }
    
    export default Counter;
    ```
    
    construnctor 메서드 선언 없이 state 초깃값 설정 가능
    
    ### 3.4.1.3. this.setState에 객체 대신 함수 인자 전달하기
    
    - this.state로 state 값 업데이트시 비동기적으로 업데이트 됨
    - this.setState를 사용할 때 객체 대신 함수를 인자로 넣어줌.
    - 
    
    ```jsx
    this.setState((prevState, props) => {
    	return {
    	//업데이트 하고 싶은 내용
    	}
    }})
    ```
    
    prevSate : 기존 상태
    
    props : 현재 지니고 있는 props, 업데이트 과정에서 props가 필요하지 않다면 생략 가능하다.
    
    기존 코드를 수정해서 작성
    
    ```jsx
    	// src/Counter.js - button
    
    							
    
    							<button
                    // onCLick을 통해 버튼이 클릭되었을 때 호출할 함수 지정
                    onClick={() => {
                        // this.state를 사용하여 state에 새로운 값을 넣을 수 있음.
                        this.setState(prevState => {
                            return {
                                number: prevState.number + 1
                            };
                        });
                        //위 코드와 아래 코드는 완전히 같은 기능을 수행함
                        // 아래 코드는 함수에서 바로 객체를 반환한다는 의미.
                        this.setState(prevState => ({
                            number: prevState.number +1
                        }));
                    }}
                    >
                        +1
                    </button>
    
    ```
    
    이 코드 적용 시 숫자가 2씩 올라감.
    
    화살표 함수에서 값을 바로 반환하고자 한다면 코드 블록 { }을 생략하면 됨.
    
    ### 3.4.1.4. this.setState가 끝난 후 특정 작업 실행하기
    
    setState로 값을 업데이트 한 후 특정 작업을 하고 싶을 때는 setState의 두 번 째 파라미터로 콜백 함수를 등록하여 작업 처리
    
    onclick 함수 수정
    
    ```jsx
    <button
    	// onCLick을 통해 버튼이 클릭되었을 때 호출할 함수 지정
    	onClick={() => {
            // this.state를 사용하여 state에 새로운 값을 넣을 수 있음.
            this.setState (
    	    {
    				number : number + 1
    			},
    			() => {
    				console.log('방금 setState가 호출되었습니다.');
    				console.log(this.state);
    			}
    		);
    	}}
    >
    	+1
    /button>
    ```
    

## 3.4.2. 함수형 컴포넌트에서 useState 사용하기

16.8 리액트부터 함수형 컴포넌트에서 useState 사용 가능 : Hooks 사용

### 3.4.2.1. 배열 비구조화 할당

- 비구조화 할당
    
    : 배열 안에 들어 있는 값을 쉽게 추출할 수 있도록 해 주는 문법
    
    ```jsx
    const array = [1, 2];
    const one = array[0];
    const two = array[1];
    ```
    
    array 안에 있는 값을 one과 two에 담아주는 코드. 위 코드를 배열 비구조화 할당을 사용하면 다음과 같이 표현 가능하다.
    
    ```jsx
    const array = [1, 2];
    const [one, two] = array;
    ```
    

### 3.4.2.2. useState 사용하기

배열 비구조화 할당 문법으로 useState를 쉽게 이해 가능

src 디렉터리에 Say.js 파일 생성 후 코드 작성

```jsx
// src/Say.js

import React, { useState } from 'react';

const Say = () => {
    const [message, setMessage] = useState('');
    const onClickEnter = () => setMessage ('안녕하세요!');
    const onClickLeave = () => setMessage ('안녕히 가세요!');

    return(
        <div>
            <button onClick={onClickEnter}>입장</button>
            <button onClick={onClickLeave}>퇴장</button>
            <h1>{message}</h1>
        </div>
    );};

export default Say;
```

1. useState 함수 인자에는 상태의 초기값 넣어 주기 
    
    >> 반드시 객체가 아니어도 상관없음.
    
2. 배열의 첫번째 원소는 현재 상태, 두 번째 원소는 상태를 바꾸어주는 함수인 세터 함수임.
3. 배열 비구조화 할당을 통해 이름을 자유롭게 정해주어도 됨

Say 컴포넌트를 App에 렌더링하고 입장., 퇴장 버튼 눌러보기

```jsx
// src/App.js

import React from 'react';
import Say from './Say'; 
// 우리가 만든 컴포넌트 불러오기

const App = () => {
  return <Say />
  };

export default App;
```

### 3.4.2.3. 한 컴포넌트에서 useState 여러 번 사용하기

입장, 퇴장 이외에 글자에 색을 넣는 버튼을 넣어 한 컴포넌트에서 useState 여러번 사용해보기

```jsx
// src/Say.js

import React, { useState } from 'react';

const Say = () => {
    const [message, setMessage] = useState('');
    const onClickEnter = () => setMessage ('안녕하세요!');
    const onClickLeave = () => setMessage ('안녕히 가세요!');

    **const [color, setColor] = useState('black');**

    return(
        <div>
            <button onClick={onClickEnter}>입장</button>
            <button onClick={onClickLeave}>퇴장</button>
            <h1 style={{ **color** }}>{message}</h1>
            **<button style={{ color : 'red' }} onClick={() => setColor('red')}>
                빨간색
            </button>
            <button style={{ color : 'green' }} onClick={() => setColor('green')}>
                초록색
            </button>
            <button style={{ color : 'blue' }} onClick={() => setColor('blue')}>
                파란색
            </button>**
        </div>
    );
};

export default Say;
```

# 3.5. state 사용 시 주의 사항

setState나 useState를 통해 전달받은 세터 함수를 사용해야 함.

- 배열, 객체를 업데이트 할 때는 사본을 만들어 사본 값을 업데이트 하고 사본의 상태를 setState나 세터 함수를 통해 업데이트 해야함!!

사본 만들어 업데이트 하기

```jsx
//객체 다루기
const objecr = { a:1, b:2, c:3 };
const nextObject = { ...., b:2}; // 사본을 만들어 b 값만 덮어씌우기

// 배열 다루기

const array = [
{ id:1, value: true },
{ id:2, value : true },
{ id:3, value : false }];

let nextArray = array.concat({ id:4 }); // 새 항목 추가
nextArray.filter(item => item.id !== 2); //id가 2인 항목 제거
nextArray.map (item => (item.id === 1 ? { ....item, value:false } : item));
// id가 1인 항목의 vlaue를 false로 설정

```

# 3.6. 정리

** **props**와 **state** 모두 컴포넌트에서 사용하거나 렌더링할 데이터를 담고 있으므로 비슷해보일 수 있지만, 역할은 매우 다름 **

- props
    1. 부모 컴포넌트가 설정
    2. 값이 무조건 고정적인 것은 아님
    
- state
    1. 컴포넌트 자체적으로 지닌 값으로 컴포넌트 내부에서 값 업데이트 가능

리액트 개발팀이 함수형 컴포넌트와 Hooks를 사용하는 것이 주요 컴포넌트 개발방식이 될 것이라고 공지했기 때문에 useState사용을 권장함.