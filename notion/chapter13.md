# SPA란?

SPA(Single Page Application)(싱글 페이지 애플리케이션) 으로 한 개의 페이지로 이루어진 애플리케이션이라는 의미.

전통적인 웹 페이지는 아래와 같이 여러 페이지로 구성되어 있다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3620ce3e-4195-4eb5-a761-21f941876d5e/Untitled.png)

기존에는 사용자가 다른 페이지로 이동할 때마다 새로운 html을 받아오고,

페이지 로딩 시 마다 서버에서 리소스를 전달받아 해석해 화면에 보여주고,

화면에 보이는 화면은 서버 측에서 준비

→ 사전에 html을 만들거나, 데이터에 따라 유동적인 html을 생성해 주는 템플릿 엔진을 사용

웹에서 제공되는 정보가 많아 새 화면을 보여주어야 할 때마다 서버 측에서 모든 뷰를 준비하면 성능상 **문제**가 발생할 수 있음.

ex) 과도한 트래픽, 사용자가 몰릴 경우 서버에 높은 부하가 쉽게 걸림

속도와 트래픽 측면의 경우 캐싱, 압축을 통해 서비스를 제공하면 최적화를 할 순 있지만 사용자와의 인터렉션이 자주 발생하는 모던 웹에서는 적당하지 않을 수 있음.

→ 화면 전환 시 마다 html을 계속 서버에 요청할 경우 사용자의 인터페이스에서 사용하고 있던 상태를 유지하는 것도 번거롭고, 바뀌지 않는 부분까지 새로 불러와 보여주어야 하므로 불필요한 로딩으로 인한 비효율 발생

리액트 같은 라이브러리, 프레임워크를 사용하여 뷰 렌더링을 사용자의 브라우저에게 담당하게 한다.

애플리케이션을 브라우저로 불러와 실행 후 사용자의 인터렉션 발생시 필요 부분만 자바스크립트를 통해 업데이트

→ 만약 새로운 데이터 필요시 서버 API를 호출해 필요한 데이터만 새로 불러와 애플리케이션에서 사용

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6e87a93e-7a5f-4be7-821e-e26cfc0afeef/Untitled.png)

싱글 페이지라고 해서 페이지가 한 종류인 것만은 아님.

EX) 블로그 개발시

→ 홈, 포스트 목록, 포스트, 글쓰기 등의 화면이 있을 때

→ SPA의 경우 **서버에서 사용자에게 제공하는 페이지는 한 종류**이나, 해당 페이지에서 로딩된 JS와 현재 브라우저 주소 상태에 따라 다양한 화면 제공 가능

**라우팅 : 다른 주소에 다른 화면을 보여주는 것**

리액트 라이브러리에 내장되어 있진 않지만 브라우저의 API를 사용하여 이를 관리하거나, 라이브러리 사용을 통해 쉽게 구현할 수 있음

- 리액트 라우팅 라이브러리
  1. **리액트 라우더**
  2. 리치 라우터
  3. Next.js

등 여러가지가 있다.

우리는 리액트 라우터 사용! 사용 빈도가 가장 높다.

**리액트 라우터**

클라이언트 사이드에서 이루어지는 라우팅을 아주 간단하게 구현할 수 있게 해준다.

서버 사이드 렌더링 때에도 라우팅을 돕는 컴포넌트를 제공한다.

- 서버사이드렌더링 : 서버에서 페이지를 그려 클라이언트(브라우저)로 보낸 후 화면에 표시하는 기법

## 13.1.1. SPA의 단점

- 앱의 규모가 커지면 JS 파일이 너무 커짐.
  페이지 로딩 시 실제로 사용자가 방문하지 않을 수도 있는 페이지의 스크립트까지 불러오기 때문.
  → 이는 코드 스플리팅(code spliting)을 사용, 라우터별로 파일을 나누어서 트래픽과 로딩 속도를 개선할 수 있다.
- 리액트 라우터처럼 브라우저에서 JS를 사용해 라우팅을 관리하는 것은 JS를 실행하지 않는 일반 크롤러에서는 페이지의 정보를 제대로 수집하지 못한다는 잠재적인 단점이 따름
  → 검색 엔진(구글, 다음, 네이버)의 결과에 페이지가 잘 나타나지 않을 수도 있음
- JS가 실행될 때까지 페이지가 비어 있어 JS파일이 실행되는 시간 동안 흰 페이지만 나타날 수 도있음
  → 서버 사이드 렌더링(server-side rendering)으로 해결 가능

# 13.2. 프로젝트 준비 및 기본적인 사용법

SPA에 대해 알았고, 리액트 라우터의 역할도 알았으므로 본격적으로 리액트 라우터를 사용하자.

<aside>
🗒️ 진행 순서

1. 프로젝트 생성 및 리액트 라우터 적용
2. 페이지 만들기
3. Route 컴포넌트로 특정 주소에 컴포넌트 연결
4. 라우트 이동하기
5. URL의 파라미터와 쿼리 이해하기
6. 서브 라우트
7. 부가 기능 알아보기
</aside>

## 13.2.1. 프로젝트 생성 및 라우터 적용

리액트 라우터를 적용해 볼 리액트 프로젝트 새로 생성

```scss
$ yarn create react-app router-tutorial
// 리액트 프로젝트 새로 생성

```

해당 프로젝트 디렉터리로 이동.

리액트 라우터 라이브러리를 설치한다.

```scss
$ cd router-tutorial
// 해당 디렉터리로 이동

$ yarn add react-router-dom
// 리액트 라우터 라이브러리 설치
$ npm install react-router-dom --save
```

## 13.2.2. 프로젝트에 라우터 적용

src/index.js 파일에서 react-router-dom에 내장되어 있는 BrowserRouter라는 컴포넌트를 사용하여 감싸 적용한다.

→ 웹 애플리케이션에 HTML5의 History API를 사용하여

페이지를 새로고침하지 않고도 주소를 변경하고,

현재 주소에 관련된 정보를 props로 쉽게 조회, 사용할 수 있게 함.

```jsx
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
**import { BrowserRouter } from 'react-router-dom';**
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  **<BrowserRouter>**
    <App />
  **</BrowserRouter>,**
  document.getElementById('root')
);
```

## 13.2.3. 페이지 만들기

라우트를 사용할 페이지 컴포넌트를 만든다.

Home - 웹사이트에 접속했을 때 제일 처음 보여줄 화면

About - 웹 사이트를 소개하는 페이지

src에 두 파일을 만든다.

```jsx
// Src/Home.js

import React from "react";

const Home = () => {
  return (
    <div>
      <h1>홈</h1>
      <p>홈, 그 페이지는 가장 먼저 보여지는 페이지.</p>
    </div>
  );
};

export default Home;
```

```jsx
// Src/About.js

import React from "react";

const About = () => {
  return (
    <div>
      <h1>소개</h1>
      <p>리액트 라우터 기초 실습 예제 프로젝트</p>
    </div>
  );
};

export default About;
```

## 13.2.4. Route 컴포넌트로 특정 주소에 컴포넌트 연결

Route 컴포넌트를 사용해 사용자의 현재 경로에 따라 다른 컴포넌트를 보여준다.

→ 이 컴포넌트를 사용해 어떤 규칙을 가진 경로에 어떤 컴포넌트를 보여 줄지 정의할 수 있다.

```jsx
<Route path="주소규칙" component={보여 줄 컴포넌트} />
```

와 같이 사용한다.

App.js를 수정

Route 컴포넌트를 사용하여 방금 만든 Home 컴포넌트와 About 컴포넌트를 보여주도록 설정해보자.

```jsx
// src/App.js

import React from 'react';
**import { Route } from 'react-router-dom';
import About from './About';
import Home from './Home';**

**const App = () => {
  return (
    <div>
      <Route path="/" component={Home} />
			//홈페이지를 키면 처음 보여주는 화면
      <Route path="/about" component={About} />
    </div>**
  );
};

export default App;
```

개발 서버를 시작해보자.

```scss
$ yarn start
```

첫 화면에는 Home 컴포넌트가 나타난다

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4ff4164f-0f36-4eb8-87c1-d67df9a6b0f0/Untitled.png)

주소창 경로에 /about을 추가해보자

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e25d051e-4e95-4c96-830f-c95fc23f35ee/Untitled.png)

about 페이지로 이동시 두 컴포넌트가 모두 나타난다.

/about 경로가 / 규칙에도 일치하기 때문

Home을 위한 Route 컴포넌트를 사용할 때, exact라는 props를 true로 설정하자

```jsx
// src/App.js

import React from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () => {
  return (
    <div>
      <Route path="/" component={Home} **exact={true}** />
      <Route path="/about" component={About} />
    </div>
  );
};

export default App;
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/08c00bc8-45ec-475e-a38b-29117bde6bb4/Untitled.png)

하나의 컴포넌트만 나타난다

## 13.2.5. Link 컴포넌트를 사용하여 다른 주소로 이동

- Link 컴포넌트는 클릭시 다른 주소로 이동시켜주는 컴포넌트
- 일반 웹 페이지의 a태그와 유사하지만 리액트 라우터 사용시에 a태그를 이용하면 페이지 전환 과정에서 새로운 페이지를 불러오기 때문에 기존의 상태가 모두 날아가 다시 처음부터 렌더링하게 된다.

- Link 컴포넌트를 사용하여 페이지 전환시 페이지를 새로 불러오지 않고, 애플리케이션은 그대로 유지한 상태에서 HTML5 History API를 사용하여 페이지의 주소만 변경
- Link 컴포넌트 자체는 a 태그로 이루어져 있으나 페이지 전환 방지 기능 내장

```jsx
<Link to="주소"> 내용 </Link>
```

로 사용한다.

App 컴포넌트에서 Link 태그로 경로 이동을 시켜주자.

```jsx
// src/App.js

import React from 'react';
import { Route, **Link** } from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () => {
  return (
    <div>
      **<ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>**
      <Route path="/" component={Home} exact={true} />
      <Route path="/about" component={About} />
    </div>
  );
};

export default App;
```

페이지가 잘 전환된다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c6f73346-6247-437c-a686-6d00e9831f85/Untitled.png)

# 13.3. Route 하나에 여러 개의 path 설정

최신 버전인 라우트 v5부터 적용된 기능

path props를 배열로 설정해주면 여러 경로에서 같은 컴포넌트를 보여줄 수 있다.

```scss
// src/App.js

import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>
      <Route path="/" component={Home} exact={true} />
      <Route path={['/about', '/**info**']} component={About} />
    </div>
  );
};

export default App;
```

[http://localhost:3000/info](http://localhost:3000/info) 입력시 소개 페이지를 보여준다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c201ae44-33b3-45d6-8918-1f38aa52c3f3/Untitled.png)

# 13.4. URL 파라미터와 쿼리 [ 꼭 확인 하기 ]

페이지 주소 정의시 유동적인 값을 전달해야 할 때도 있다.

파라미터와 쿼리로 나눌 수 있음

- 파라미터 예시 : /profile/**velopert**
- 쿼리 예시 : /about?**details=true**

유동적 상황에서 특정한 것을 사용해야하는 절대적인 규칙은 없지만

일반적으로

파라미터 → 특정 아이디 혹은 이름 조회 시 사용

쿼리 → 키워드 검색, 페이지에 필요한 옵션 전달 시 사용

## 13.4.1. URL 파라미터

profile 페이지에서 파라미터 사용해보자

/profile/velopert와 같은 형식으로 뒷부분에 유동적인 username 값을 넣어 줄 때 해당 값을 props로 받아 와서 조회하는 방법을 알아보자

profile 컴포넌트를 먼저 만들자

```jsx
// Src/Profile.js

import React from 'react';

**const data = {
    jspark: {
        name: '박지성',
        description: '축구선수 박지성'
    },
    gildong: {
        name:'홍길동',
        description:'고전 소설 홍길동전의 주인공'
    }
};**

**const Profile = ({match}) => {
    const { username } = match.params;
		//path에 설정한 파라미터 값에 username 정의
    const profile = data[username];
    if (!profile) {
        return (<div>존재하지 않는 사용자 입니다.</div>);
    }
    return (
        <div>
            <h3>
                {username}({[profile.name]})
            </h3>
            <p>{profile.description}</p>
        </div>**
    );
};

export default Profile;
```

- URL 파라미터 사용시 라우트로 사용되는 컴포넌트에서 받아오는 match라는 객체 안의 params 값을 참조
- match 객체 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해 보이는지에 대한 정보가 있음

App에서 Profile 컴포넌트를 위한 라우터를 정의

→ path 규칙은 /profile/:username

→ math.params.username 값을 통해 현재 username 값을 조회할 수 있다.

```jsx
// src/App.js

import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
**import Profile from './profile';**

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        **<li>
          <Link to="/profile/jspark">jspark 프로필</Link>
        </li>
        <li>
          <Link to="/profile/gildong">gildong 프로필</Link>
        </li>**
      </ul>
      <Route path="/" component={Home} exact={true} />
      <Route path={['/about', '/info']} component={About} />
      **<Route path={['/profile/:username']} component={Profile} />**
    </div>
  );
};

export default App;
```

라우트 정의와 상단에 각 프로필 페이지로 이동하는 링크를 추가해주자

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/36583b66-4215-449c-8ae0-c607c8562c0b/Untitled.png)

## 13.4.2. URL 쿼리

About 페이지에서 쿼리를 받아오자

쿼리는 location 객체에 들어 있는 search값에서 조회 가능

location 객체는 라우트로 사용된 컴포넌트에 props로 전달되며, 웹 애플리케이션의 현재 주소에 대한 정보를 지님

location의 형태

```scss
{
	"pathname": "/about",
	"search": "?detail=true",
	"hash": "",
}
```

위 location 객체는 [http://localhost:3000/](http://localhost:3000/profile/gildong)about?detail=true 주소로 들어갔을 때의 값

URL 쿼리를 읽을 때는 위 객체가 지닌 값 중 search 값을 확인해야함.

→ 이 값은 문자열 형태

→ ?detail=true&another=1과 같이 문자열에 여러가지 값 설정 가능

→ serach 값에서 특정 값을 읽어 오기 위해서는 문자열을 객체 형태로 변환해야함

쿼리 문자열을 객체로 변환할 때는 qs 라이브러리 사용

```scss
$ yarn add qs
```

[location.search](http://location.search) 값에 있는 detail이 true인지 여부에 따라 추가 정보를 보여주도록 수정해보자

```jsx
// Src/About.js

import React from 'react';
**import qs from 'qs';**

const About = (**{ location }**) => {
    **const query = qs.parse(location.search, {
        ignoreQueryPrefix: true** // 이 설정을 통해 문자열 맨 앞의 ? 생략.
    });
    **const showDetail = query.detail === 'true'**; //쿼리의 파싱 결과 값은 문자열
    return (
        <div>
            <h1>소개</h1>
            <p>리액트 라우터 기초 실습 예제 프로젝트</p>
            **{showDetail && <p>detail값을 true로 설정함.</p>}**
        </div>
    );
};

export default About;
```

쿼리사용할 떄는 쿼리 문자열을 객체로 파싱하는 과정에서 결과 값은 언제나 문자열

→ 숫자를 받아와야하는 경우 praseInt 함수로 숫자로 변환하는 과정 필요

→ 논리 자료형 값이 필요하다면 정확히 true문자열과 일치하는지 비교해야함

[http://localhost:3000/about?detail=true](http://localhost:3000/about?detail=true) 를 주소로 직접 검색해 들어가면

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/aefc5edf-1d9f-4ebc-989d-01b87147024e/Untitled.png)

문구 정상적으로 확인 가능

# 13.5. 서브 라우트

라우트 내부에 또 라우트를 정의하는 것

라우트로 사용되고 있는 컴포넌트의 내부에 Route 컴포넌트를 또 사용하면 됨

기존 App 컴포넌트에서 보여준 두 종류의 프로필 링크를 잘라내서

프로필 링크를 보여주는 profiles라는 라우트 컴포넌트를 따로 만들고

그 안에서 profile 컴포넌트를 서브 라우트로 사용하도록 해보자

```jsx
// Src/Profiles.js

import React from 'react';
**import { Link, Route } from 'react-router-dom';
import Profile from './profile';**

const Profiles = () => {
    **return (
        <div>
            <h3> 사용자 목록 </h3>
            <ul>
              <li>
                <Link to="/profiles/jspark">jspark</Link>
              </li>
              <li>
                <Link to="/profiles/gildong">gildong</Link>
              </li>
            </ul>**

        <Route
        path="/profiles"
        exact
        **render={() => <div> 사용자를 선택해주세요. </div>}
				//리액트 라우터를 통해 렌더링되는 컴포넌트에 props 넘기기**
        />
        <Route path="/profiles/:username" component={Profile} />
        </div>
    );
}

export default Profiles;
```

첫 번째 Route 컴포넌트에는 component 대신 render라는 props를 넣어줌

→ 컴포넌트 자체를 전달하는 것이 아닌 보여주고 싶은 JSX를 넣을 수 있음

→ 따로 컴포넌트를 애매한 상황에 사용가능

→ 컴포넌트에 props를 별도로 넣어주고 싶을 때 사용할 수도 있음

JSX에서 props를 설정할 때 값을 생략하면 자동으로 true 값 설정

ex) exact={true}대신 exact라고만 적어주어도 같은 의미

App 컴포넌트를 수정하자

```jsx
// src/App.js

import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
**import Profiles from './profiles';**

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        **<li>
          <Link to="/profiles">프로필</Link>
        </li>**
      </ul>
      <Route path="/" component={Home} exact={true} />
      <Route path={['/about', '/info']} component={About} />
      **<Route path={['/profiles']} component={Profiles} />**
    </div>
  );
};

export default App;
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fa876a0a-c984-45a1-8878-09bdb095d71c/Untitled.png)

서브 라우트가 잘 작동한다

# 13.6 리액트 라우터 부가 기능

history, withRouter, Switch

## 13.6.1. history

라우트로 사용된 컴포넌트에 match, location과 함께 전달되는 props 중 하나

→ 이 객체를 통해 컴포넌트 내에 구현하는 메서드에서 라우터 API를 호출할 수 있음.

→ 특정 버튼을 눌렀을 때 뒤로가기, 로그인 후 화면 전환하기, 다른 페이지 이탈 방지에 활용

history 객체를 사용하는 예제 페이지를 만들어보자

```jsx
//src/HistorySample.js

import React, { Component } from 'react';

class HistorySample extends Component {
    //뒤로 가기
    **handleGoBack = () => {
        this.props.history.goBack();
    };**

    //홈으로 이동
    **handleGoHome = () => {
        this.props.history.push('/');
    }**

    componentDidMount() {
        // 이것을 실행하고나면 페이지에 변화가 생길때마다 나갈건지 물어봄
        this.unblock = this.props.history.block('정말 떠나실 건가요?');
    }

    componentWillUnmount() {
        //컴포넌트가 언마운트되면 질문 멈춤
        if(this.unblock) {
            this.unblock();
        }
    }

    render() {
        return(
            **<div>
                <button onClick={this.handleGoBack}>뒤로</button>
                <button onClick={this.handleGoHome}>홈으로</button>
            </div>**
        );
    }
}

export default HistorySample;
```

App에서 /history 경로를 추가해 확인해보자

```scss
// src/App.js

import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './profiles';
**import HistorySample from './HistorySample';**

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필</Link>
        </li>
        **<li>
          <Link to="/history">history 예제</Link>
        </li>**
      </ul>
      <Route path="/" component={Home} exact={true} />
      <Route path={['/about', '/info']} component={About} />
      <Route path="/profiles" component={Profiles} />
      **<Route path="/history" component={HistorySample} />**
    </div>
  );
};

export default App;
```

[http://localhost:3000/history](http://localhost:3000/history) 로 이동한 뒤

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/20b22155-1802-43b0-a684-51f05223320a/Untitled.png)

버튼이 잘 작동하는지, 링크를 눌러 페이지를 이동하려고 할때 다음과 같은 브라우저 메시지 창이 뜨는 지를 확인하자.

## 13.6.2. withRouter

이 함수는 HoC(Higher-order Component)이다.

라우터로 사용된 컴포넌트가 아니여도 match, location, history 객체에 접근할 수 있게 해준다.

WithRouterSample이라는 컴포넌트를 만들어 사용해보자

```jsx
import React from 'react';
import { withRouter } from 'react-router-dom';
const WithRouterSample = ({ location, match, history}) => {
    return (
        **<div>
            <h4> location </h4>
            <textarea
            value={JSON.stringify(location, null, 2)}
						// 두번째 세번째 파라미터 설정을 통해 JSON에 들여쓰기 적용된 상태로 문자열이 만들어짐
            rows= {7}
            readOnly={true}
            />
            <h4>match</h4>
            <textarea
            value={JSON.stringify(match, null, 2)}
            rows= {7}
            readOnly={true}
            />
            <button onClick={()=>history.push('/')}>홈으로</button>**
        </div>
    );
};

**export default withRouter(WithRouterSample);**
```

withRouter을 사용할 때는 컴포넌트를 내보내줄 때 함수로 감싸줌

JSON, Stringfy의 두 번째 파라미터(객체에 포함될 문자열 설정), 세 번째 파라미터(공백 설정) 같이 null, 2로 설정해주면 JSON에 들여쓰기가 적용된 상태로 문자열이 만들어짐

Profiles 컴포넌트에 렌더링해보자

```jsx
// Src/Profiles.js

import React from 'react';
import { Link, Route } from 'react-router-dom';
import Profile from './profile';
**import WithRouterSample from './WithRouterSample';**

const Profiles = () => {
    return (
        <div>
            <h3> 사용자 목록 </h3>
            <ul>
              <li>
                <Link to="/profiles/jspark">jspark</Link>
              </li>
              <li>
                <Link to="/profiles/gildong">gildong</Link>
              </li>
            </ul>

        <Route
        path="/profiles"
        exact
        render={() => <div> 사용자를 선택해주세요. </div>}
        />
        <Route path="/profiles/:username" component={Profile} />
        **<WithRouterSample />**
        </div>
    );
}

export default Profiles;
```

[http://localhost:3000/profiles](http://localhost:3000/profiles) 페이지에 들어가 두 객체 정보가 잘 나타나는지 확인하자

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0887938e-d1e9-42c3-9653-65b72dd76107/Untitled.png)

match 객체를 보면 params가 비어있다

→ withRouter를 사용하면 현재 자신을 보여주고 있는 컴포넌트 (현재 Profiles)를 기준으로 match가 전달 됨

→ Profiles를 위한 라우트를 설정할 때 path="/profiles"라고만 입력했으므로 username 파라미터를 읽어오지 못하는 상태

WithRouterSample 컴포넌트를 Profiles에서 지우고 profile 컴포넌트에 넣으면

match 쪽에 URL 파라미터가 제대로 보인다.

```jsx
// Src/Profile.js

import React from 'react';
**import { withRouter} from 'react-router-dom';
import WithRouterSample from './WithRouterSample';**

const data = {
    jspark: {
        name: '박지성',
        description: '축구선수 박지성'
    },
    gildong: {
        name:'홍길동',
        description:'고전 소설 홍길동전의 주인공'
    }
};

const Profile = ({match}) => {
    const { username } = match.params;
    const profile = data[username];
    if (!profile) {
        return (<div>존재하지 않는 사용자 입니다.</div>);
    }
    return (
        <div>
            <h3>
                {username}({[profile.name]})
            </h3>
            <p>{profile.description}</p>
            **<WithRouterSample />**
        </div>
    );
};

export default Profile;
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/20bbc016-1e33-4191-b9bb-147730ed2251/Untitled.png)

이제는 params.usernames를 제대로 보여준다.

## 13.6.3. Switch

여러 Route를 감싸서 그 중 일치하는 단 하나의 라우트만을 렌더링 시켜준다.

→ 모든 규칙과 일치하지 않을 때 보여 줄 Not Found 페이지 구현 가능

```jsx
// src/App.js

import React from 'react';
import { Route, Link, **Switch** } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './profiles';
import HistorySample from './HistorySample';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필</Link>
        </li>
        <li>
          <Link to="/history">history 예제</Link>
        </li>
      </ul>
      <hr />
      **<Switch>**
      <Route path="/" component={Home} exact={true} />
      <Route path={['/about', '/info']} component={About} />
      <Route path="/profiles" component={Profiles} />
      <Route path="/history" component={HistorySample} />
      **<Route
      //path를 따로 정의하지 않으면 모든 상황에 렌더링
      render={({ location }) => (
        <div>
          <h2> 이 페이지는 존재하지 않습니다 : </h2>
          <p>{location.pathname}</p>
        </div>
      )}
    />
    </Switch>**
    </div>
  );
};

export default App;
```

존재하지 않는 페이지에 들어가보자

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/42e72b62-1ea9-41ed-b6aa-0bbe682718f8/Untitled.png)

## 13.6.4. NavLink

Link와 비슷하다. 현재 링크와 Link에서 사용하는 경로가 일치하는 경우 특정 스타일, CSS 클래스를 적용할 수 있는 컴포넌트

- 링크가 활성화 되었을 떄의 스타일을 적용할 때
  - activeStyle 값
- CSS 클래스를 적용할 때
  - activeClassName 값

을 props로 넣어준다.

Profiles에서 아욯나고 있는 컴포넌트에서 Link 대신 NavLink를 사용하게 하고.

현재 선택되어 있는 경우 검정 배경에 흰 글씨로 스타일을 보여주자

```jsx
// Src/Profiles.js

import React from 'react';
import { **NavLink**, Route } from 'react-router-dom';
import Profile from './profile';
// import WithRouterSample from './WithRouterSample';

const Profiles = () => {
    **const activeStyle = {
        background: 'black',
        color: 'white'**
    };
    return (
        <div>
            <h3> 사용자 목록 </h3>
            <ul>
              <li>
                **<NavLink activeStyle={activeStyle} to="/profiles/jspark">jspark</NavLink>**
              </li>
              <li>
                **<NavLink activeStyle={activeStyle} to="/profiles/gildong">gildong</NavLink>**
              </li>
            </ul>

        <Route
        path="/profiles"
        exact
        render={() => <div> 사용자를 선택해주세요. </div>}
        />
        <Route path="/profiles/:username" component={Profile} />
        {/* <WithRouterSample /> */}
        </div>
    );
}

export default Profiles;
```

사용자 목록에 있는 링크 클릭시 색상이 제대로 바뀌는지 확인하자

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d319d670-9147-41b6-bcc6-61484ef6b498/Untitled.png)

# 13.7. 정리

- 리액트 라우터를 사용하여 주소 경로에 따라 다양한 페이지를 보여주는 방법을 알아보았다.
- 큰 규모 프로젝트 진행시 컴포넌트, 로직, 그 외 여러 기능을 구현하는 함수가 쌓일수록 JS 파일의 크기가 쌓임
- /about 페이지에 들어왔을 때 당장 필요하지 않은 profile 컴포넌트까지 불러온다. 라우트에 다라 필요한 컴포넌트만 불러오고, 다른 컴포넌트는 필요할 때 불러오면 더 효율적일것.
  → 이를 가능하게 하는 것이 스플리팅
