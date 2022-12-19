![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d8b8bd83-82f7-4507-8e1b-4a1c66dda194/Untitled.png)

- [https://newsapi.org/](https://newsapi.org/에서) 에서 제공하는 API를 사용하여 데이터를 받아오기
- styled-components 활용하여 프로젝트를 스타일링

## 14.1. 비동기 작업의 이해

- 웹 어플리케이션에서 서버 쪽 데이터가 필요할 때는 Ajax 기법을 활용해 서버의 API를 호출함ㄹ으로써 데이터 수신
  - 이 경우 네트워크 송수신 과정에서 시간이 걸려 **응답을 받을 때까지 기다렸다가 전달받은 응답 데이터를 처리함 ⇒ 이 작업을 비동기적으로 처리함.**
- 비동기적으로 처리할 경우
  1. 웹 애플리케이션이 멈추지 않아 동시에 여러 가지 요청 처리 가능
  2. 기다리는 과정에서 다른 함수 호출 가능
- 서버 API 호출 외에도 setTimeout 함수를 사용해 특정 작업 예약할 경우 작업을 비동기적으로 처리할 수 있다.

```jsx
function printMe() {
  console.log("Hello World!");
}
setTimeout(printMe, 3000);
console.log("대기 중...");
```

```jsx
대기 중 ...
Hello World!
```

- setTimeout이 사용되는 시점에서 코드가 3초 동안 멈추는 것이 아닌 일단 코드가 위부터 아래까지 다 호출되고, 3초 뒤에 우리가 지정해 준 printMe가 호출됨.
- 자바스크립트에서 비동기 작업에서 가장 흔히 사용되는 방법은 **콜백 함수 사용**
  - `위 코드에서는 printMe가 3초 뒤에 호출되도록 printMe 함수 자체를 setTimeout 함수의 인자로 전달해 주었는데, 이런 함수를 콜백 함수라고 부름`

### 14.1.1. 콜백 함수

- 파라미터 값이 주어지면 1초 뒤에 10을 더해서 반환하는 함수가 있다고 가정했을 때,
  해당 함수가 처리된 직후 어떠한 작업을 하고 싶다면 다음과 같이 콜백 함수를 활용해서 작업

```jsx
function increase(number, callback) {
  setTimeout(() => {
    const result = number + 10;
    if (callback) {
      callback(result);
    }
  }, 1000);
}

increase(0, (result) => {
  console.log(result);
});
```

1초에 걸쳐서 10, 20, 30, 40과 같은 형태로 여러 번 순차적으로 처리하고 싶다면 콜백 함수를 중첩하여 구현 가능함.

```jsx
function increase(number, callback) {
  setTimeout(() => {
    const result = number + 10;
    if (callback) {
      callback(result);
    }
  }, 1000);
}

console.log("작업 시작");
increase(0, (result) => {
  console.log(result);
  increase(result, (result) => {
    console.log(result);
    increase(result, (result) => {
      console.log(result);
      increase(result, (result) => {
        console.log(result);
        console.log("작업 완료");
      });
    });
  });
});
```

```jsx
//실행 결과
작업 시작
10
20
30
40
작업 완료
```

- 중첩이 계속 되어서 코드 가독성이 안좋아짐
  - **콜백 지옥** 이라고 부르며 지양해야하는 형태

### 14.1.2. Promise

- 콜백 지옥 같은 코드가 형성되지 않도록 ES6에 도입
- 앞 코드를 Promise를 사용해 구현

```jsx
function increase(number) {
	const promise = new Promise((resolve, reject) => {
	// resolve는 성공, reject는 실패
	setTimeout(() => {
		const result = number + 10;
		if (result > 50) {
			// 50보다 높으면 에러 발생시키기
			const e = new Error('NumberTooBig');
			return reject(e);
		}
		resolve(result); //numbet 값에 +10 후 성공 처리
	}, 1000);
}});
return promise;
}

increase(0)
	.then(numnber => {
	// Promise에서 resolve된 값은 .then을 통해 받아 올 수 있음
	console.log(number);
	return increase(number);
})
	.then(number => {
		//또 .then으로 처리 가능
		console.log(number)';
		return increase(number);
})
	.then(number => {
		console.log(number)';
		return increase(number);
})
	.then(number => {
		console.log(number)';
		return increase(number);
})
	.then(number => {
		console.log(number)';
		return increase(number);
})
	.catch(e => {
		// 도중에 에러가 발생한다면 .catch를 통해 알 수 있음
	 console.log(e);
});
```

- 여러 작업을 연달아 처리한다고 해서 함수를 여러번 감싸지 않음
- .then을 사용해서 그 다음 작업을 설정해 콜백 지옥이 형성되지 않음.

### 14.1.3. async / await

- Promise를 더욱 쉽게 사용할 수 있도록 해 주는 ES8 문법.
- 사용 방법
  1. 함수 앞부분에 async 키워드를 추가
  2. 해당 함수 내부에서 Promise 앞부분에 await 키워드 사용
  3. Promise가 끝날 때까지 기다리고, 결과 값을 특정 변수에 담을 수 있음.

```jsx
function increase(number) {
	const promise = new Promise((resolve, reject) => {
	// resolve는 성공, reject는 실패
	setTimeout(() => {
		const result = number + 10;
		if (result > 50) {
			// 50보다 높으면 에러 발생시키기
			const e = new Error('NumberTooBig');
				return reject(e);
		}
			resolve(result); //numbet 값에 +10 후 성공 처리
	}, 1000);
}});
return promise;
}

async function runTasks() {
	try { // try/catch 구문을 사용하여 에러를 처리.
		let result = await increase(0);
		console.log(result);
		result = await increase(result);
		console.log(result);
		result = await increase(result);
		console.log(result);
		result = await increase(result);
		console.log(result);
		result = await increase(result);
		console.log(result);
		result = await increase(result);
		console.log(result);
} catch (e) {
	console.log(e);
	}
}
```

## 14.2. axios로 API 호출해서 데이터 받아오기

- axios는 현재 가장 많이 사용되는 자바스크립트 http 클라이언트
  - http 요청을 promise 기반으로 처리

실습해보자~

프로젝트 생성

```jsx
$ yarn create react-app news-viewer
$ cd news-viewer
$ yarn add axios
```

**prittierrc, jsconfig 설정**

```json
//.prettierrc

{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}
```

```json
//jsconfig.json

{
  "compilerOptions": {
    "target": "es6"
  }
}
```

App.js 작성

- 불러오기 버튼을 누르면 JSONplaceholder에서 제공하는 가짜 API를 호출하고 이에 대한 응답을 컴포넌트 상태에 넣어서 보여주는 예제

```json
import { useState } from "react";
import axios from "axios";

import React from 'react'

const App = () => {
  const [data, setData] = useState(null);
  const onClick = () => {
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
				 .then(response => {
      setData(response.data);
    });
  }
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly={true} />}
    </div>
  );
};

export default App
```

- axios.get 함수를 사용하여 파라미터로 전달된 주소에 GET 요청
- 이에 대한 결과는 .then을 통해 비동기적으로 확인 가능

위 코드에 async 를 적용하면

```json
import { useState } from "react";
import axios from "axios";

import React from 'react'

const App = () => {
  const [data, setData] = useState(null);
  const onClick = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1',
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
    };
  }
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly={true} />}
    </div>
  );
};
export default App
```

- 화살표 함수에 async/await를 적용할 때는 async () ⇒ {}와 같은 형식으로 적용

## 14.3. newsapi API 발급받기

[News API - Search News and Blog Articles on the Web](https://newsapi.org/)

- 우리가 사용할 API 주소

  1. 전체뉴스 불러오기

  `GET` `https://newsapi.org/v2/top-headlines?**country=kr**
  &apiKey=d50b9493091443a48657199e0a0b4c22`

  1. 특정 카테고리 뉴스 불러오기

  `GET https://newsapi.org/v2/top-headlines?country=kr&category=business&apiKey=API_KEY`

  - 카테고리
    - business, entertainment, health, science, sports, technology

- API의 Key 값 숨기기
  .env 파일 생성
  ```json
  REACT_APP_WEATHER_API_KEY = 'd50b9493091443a48657199e0a0b4c22'
  ```

App.js

```json
···
const WeatherAPIKEY = process.env.REACT_APP_WEATHER_API_KEY;

···
const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${WeatherAPIKEY}`,
      );
```

## 14.4. 뉴스 뷰어 UI 만들기

styled-components를 사용하여 뉴스 정보를 보여 줄 컴포넌트 만들기

```json
$ yarn add styled-components
```

NewsItem.js (각 뉴스 정보를 보여주는 컴포넌트) / NewsList.js (뉴스 데이터가 들어있는 배열을 컴포넌트 배열로 변환하여 렌더링해주는 컴포넌트) 생성

### 14.4.1. NewsItem 만들기

- 우선 뉴스 데이터 필드 확인
  ```json
  {
        "source": {
          "id": null,
          "name": "Hani.co.kr"
        },
        "author": null,
        "title": "[만리재사진첩] 이태원 참사 유족 눈물 호소 “성역 없는 국정조사를” - 한겨레",
        "description": "10·29 이태원참사 유가족협의회(협의회)가 13일 국회를 찾아 성역 없는 국정조사와 대통령의 공식적인 사과를 촉구했다. 고 ...",
        "url": "https://www.hani.co.kr/arti/society/society_general/1071396.html",
        "urlToImage": "https://flexible.img.hani.co.kr/flexible/normal/970/646/imgdb/original/2022/1213/20221213502344.jpg",
        "publishedAt": "2022-12-13T06:35:29Z",
        "content": ", []\r\n :2022-12-13 15:35 :2022-12-13 15:43"
      },
  ```
  - title : 제목
  - description : 내용
  - url : 링크
  - urlToImage : 뉴스 이미지
  NewsItem 컴포넌트는 article이라는 객체를 props로 통째로 받아와서 사용.
  ```json
  // 뉴스 정보를 보여주는 컴포넌트

  import React from 'react'
  import styled from 'styled-components'

  const NewsItemBlock = styled.div`
      display: flex;
      .thumnail {
          margin-right: 1rem;
          img {
              display: block;
              width: 160px;
              height: 100px;
              object-fit: cover;
          }
      }
      .contents {
          h2 {
              margin:0;
              a {
                  color: black;
              }
          }
          p {
              margin: 0;
              line-height: 1.5;
              margin-top: 0.5rem;
              white-space: normal;
          }
      }
      & + & {
          margin-top: 3rem;
      }
  `;

  const NewsItem = ({ article }) => {
      const { title, description, url, urlToImage } = article;
      return (
          <NewsItemBlock>
              {urlToImage && (
                  <div className='thumnail'>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                          <img src={urlToImage} alt="thumnail" />
                      </a>
                  </div>
              )}
              <div className='contents'>
                  <h2>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                          {title}
                      </a>
                  </h2>
                  <p>{description}</p>
              </div>
        </NewsItemBlock>
    )
  }

  export default NewsItem
  ```

### 14.4.2. NewsList 만들기

- 아직 데이터를 안불러오고 있으므로 sampleArticle에 미리 예시 데이터 넣기

```json
//  API를 요청하고 뉴스 데이터가 들어있는 배열을 컴포넌트 배열로 변환하여 렌더링해 주는 컴포넌트

import React from 'react'
import styled from 'styled-components'
import NewsItem from './NewsItem'

const NewsItemBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    `;

const sampleArticle = {
    title: '제목',
    description: '내용',
    url: 'http://google.com',
    urlToImage: 'https://via.placeholder.com/160',
};

const NewsList = () => {
    return (
      <NewsItemBlock>
            <NewsItem article={sampleArticle} />
            <NewsItem article={sampleArticle} />
            <NewsItem article={sampleArticle} />
            <NewsItem article={sampleArticle} />
            <NewsItem article={sampleArticle} />
            <NewsItem article={sampleArticle} />
            <NewsItem article={sampleArticle} />
      </NewsItemBlock>
  )
}

export default NewsList
```

## 14.5. 데이터 연동하기

- 컴포넌트가 화면에 보이는 시점에 API 요청
  - useEffect를 사용해 컴포넌트가 처음 렌더링되는 시점에 API 요청하기
  - 주의할 점
    - useEffect에 등록하는 함수에 async를 붙이면 안됨!!
    - 뒷 정리 함수를 반환해야하기 때문
  - useEffect 내붕레서 async를 사용하고 싶다면, 함수 내부에 async 키워드가 붙은 또 다른 함수를 만들어서 사용해주어야함.
  - loading 이라는 상태도 관리해 API 요청이 대기 중인지 판별
    - 요청이 대기 중일 때 ⇒ loading 값 true
    - 요청이 끝 ⇒ loading 값 false
  ```json
  //  API를 요청하고 뉴스 데이터가 들어있는 배열을 컴포넌트 배열로 변환하여 렌더링해 주는 컴포넌트

  import React,{useState, useEffect} from 'react'
  import styled from 'styled-components'
  import axios from 'axios';
  import NewsItem from './NewsItem'

  const NewsItemBlock = styled.div`
      box-sizing: border-box;
      padding-bottom: 3rem;
      width: 768px;
      margin: 0 auto;
      margin-top: 2rem;
      @media screen and (max-width: 768px) {
          width: 100%;
          padding-left: 1rem;
          padding-right: 1rem;
      }
      `;

  const NewsList = () => {

      const [articles, setArticles] = useState(null);
      const [loading, setLoading] = useState(false);
      const WeatherAPIKEY = process.env.REACT_APP_WEATHER_API_KEY;
      useEffect(() => {
          // async를 사용하는 함수 따로 선언
          const fetchData = async () => {
              setLoading(true);
              try {
                  const response = await axios.get(
                      `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${WeatherAPIKEY}`,
                  );
                  setArticles(response.data.articles);
              } catch (e) {
                  console.log(e);
              }
              setLoading(false);
          }; fetchData();
      }, []);
      // 대기 중일 떄
      if (loading) {
          return <NewsItemBlock>대기 중...</NewsItemBlock>
      }
      // 아직 articles 값이 설정되지 않았을 때
      if (!articles) {
          return null;
      }
      // articles 값이 유효할 때
      return (
          <NewsItemBlock>
              {articles.map(article => (
                  <NewsItem key={article.url} article={article} />
              ))}
        </NewsItemBlock>
    )
  }

  export default NewsList
  ```
  - 데이터를 불러와서 뉴스 데이터 배열을 map 함수를 사용하여 컴포넌트 배열로 변환할 때 신경 쓸 부분
    - 꼭 !articles를 조회하여 해당 값이 현재 null값인지 검사
      ⇒ 아직 데이터가 없을 때 null에는 map 함수가 없어 렌더링 과정에서 오류가 발생해 애플리케이션이 제대로 나타나지 않음

## 14.6. 카테고리 기능 구현

| business      | science    |
| ------------- | ---------- |
| entertainment | sports     |
| health        | technology |

- 한글로 보여준 뒤 클릭했을 때는 영어로 된 카테고리 값 사용하도록 구현하기.
- 모양만

```json
import React from 'react'
import styled from 'styled-components'

const categories = [
    {
        name: 'all',
        text: '전체보기'
    },
    {
        name: 'business',
        text: '비즈니스'
    },
    {
        name: 'entertainment',
        text: '엔터테인먼트'
    },
    {
        name: 'health',
        text: '건강'
    },
    {
        name: 'science',
        text: '과학'
    },
    {
        name: 'sport',
        text: '스포츠'
    },
    {
        name: 'technology',
        text: '기술'
    },
]

const CategoriesBlock = styled.div`
    display: flex;
    padding: 1rem;
    width: 768px;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
        width:100%;
        overflow-x: auto;
    }
`;

const Category = styled.div`
    font-size: 1.125rem;
    cursor: pointer;
    white-space: pre;
    text-decotaion: none;
    color: inherit;
    padding-bottom: 0.25rem;

    &:hover {
        color: #495057;
    }

    & + & {
        margin-left: 1rem;
    }
`;

const Categories = () => {
    return (
        <CategoriesBlock>
            {categories.map(c => (
                <Category key={c.name}>{c.text}</Category>
            ))}
      </CategoriesBlock>
  )
}

export default Categories
```

- categories 배열 안에 name과 text 값이 들어가 있는 객체들을 넣어 주어서 한글로 된 카테고리와 실제 카테고리 값을 연결시켜 줌.
- 여기서 name은 실제 카테고리 값을, text 값은 렌더링할 때 사용할 한글 카테고리를 가리킴

```json
import Categories from "./components/Categories";
import NewsList from "./components/NewsList";
const App = () => {
  return (
    <>
    <Categories />
    <NewsList />
    </>
  )
}

export default App
```

- 다 만든 컴포넌트는 App에서 NewsList 컴포넌트 상단에 렌더링하기

- app에서 categoty 상태를 useState로 관리하기.
- category 값을 업데이트하는 onSelect 함수 만들기
  - category와 onSelect 함수를 Categories 컴포넌트에게 props로 전달해주기
  - category 값을 NewsList 컴포넌트에게도 전달해주기

```json
import { useState, useCallback } from "react";
import Categories from "./components/Categories";
import NewsList from "./components/NewsList";

const App = () => {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback(category => setCategory(category), [])
  return (
    <>
      <Categories category={category} onSelect={onSelect} />
    <NewsList category={category} />
    </>
  )
}

export default App
```

- Categories에서는
  props로 전달받은 onSelect를 각 Category 컴포넌트의 onClick으로 설정해 주고,
  현재 선택된 카테고리 값에 따라 다른 스타일을 적용시키기

```json
import React from 'react'
import styled, {css} from 'styled-components'

const categories = [
    {
        name: 'all',
        text: '전체보기'
    },
    {
        name: 'business',
        text: '비즈니스'
    },
    {
        name: 'entertainment',
        text: '엔터테인먼트'
    },
    {
        name: 'health',
        text: '건강'
    },
    {
        name: 'science',
        text: '과학'
    },
    {
        name: 'sport',
        text: '스포츠'
    },
    {
        name: 'technology',
        text: '기술'
    },
]

const CategoriesBlock = styled.div`
    display: flex;
    padding: 1rem;
    width: 768px;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
        width:100%;
        overflow-x: auto;
    }
`;

const Category = styled.div`
    font-size: 1.125rem;
    cursor: pointer;
    white-space: pre;
    text-decotaion: none;
    color: inherit;
    padding-bottom: 0.25rem;

    &:hover {
        color: #495057;
    }

    ${props =>
    props.active && css`
        font-weight: 600;
        border-bottom: 2px solid #22b8cf;
        color: #22b8cf;
        &:hover {
            color: #3bc9db;
        }` }

    & + & {
        margin-left: 1rem;
    }
`;

const Categories = ( {onSelect, category}) => {
    return (
        <CategoriesBlock>
            {categories.map(c => (
                <Category key={c.name}
                    active={category === c.name}
                    onClick={() => onSelect(c.name)}>
                    {c.text}
                </Category>
            ))}
      </CategoriesBlock>
  )
}

export default Categories
```

### 14.6.2. API를 호출할 때 카테고리 지정하기

- 현재 props로 받아 온 category에 따라 카테고리를 지정하여 aPI 요청해보기

```json
//  API를 요청하고 뉴스 데이터가 들어있는 배열을 컴포넌트 배열로 변환하여 렌더링해 주는 컴포넌트

import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import NewsItem from './NewsItem'

const NewsItemBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    `;

const NewsList = ({ category }) => {

    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);
    const WeatherAPIKEY = process.env.REACT_APP_WEATHER_API_KEY;
    useEffect(() => {
        // async를 사용하는 함수 따로 선언
        const fetchData = async () => {
            setLoading(true);
            try {
                const query = category === 'all' ? '' : `&category=${category}`;
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${WeatherAPIKEY}`,
                );
                console.log("response", response.config.url)
                setArticles(response.data.articles);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        }; fetchData();
        // 카테고리 클릭시마다 렌더링 안돼서 이유가 뭐지 했는데 여기 []에 category 안 넣어줘서 그런거였음
    }, [category]);
    // 대기 중일 떄
    if (loading) {
        return <NewsItemBlock>대기 중...</NewsItemBlock>
    }
    // 아직 articles 값이 설정되지 않았을 때
    if (!articles) {
        return null;
    }
    // articles 값이 유효할 때
    return (
        <NewsItemBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
      </NewsItemBlock>
  )
}

export default NewsList
```

- category 값에 따라 요청 주소가 동적으로 바뀜
- **catery 값이 바뀔 때마다 뉴스를 새로 불러와야 하므로 useEffect의 의존 배열 (두 번째 파라미터로 설정하는 배열)에 category 넣어주기**

## 14.7. 리액트 라우터 적용하기

- 카테고리 값을 useState를 통해 관리했던걸 라우터의 URL 파라미터를 사용해서 관리하기

### 14.7.1. 리액트 라우터의 설치 및 적용

```json
$yarn add react-router-dom
```

index.js에서 리액트 라우터 적용하기

```json
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from '../node_modules/react-router-dom/dist/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  **</BrowserRouter>**
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

### 14.7.2. NewsPage 생성

- src/pages/NewsPage.js 생성 후 작성

```json
import React from 'react'
import { useParams } from 'react-router-dom';
import Categories from '../components/Categories';
import NewsList from '../components/NewsList';

const NewsPage = ({match}) => {
    // 카테고리 미선택시 기본값은 all
    //const category = match.params.category || 'all';
		//react-dom v.6 : useParams 사용
		const params = useParams();
    const category = params.category || 'all';
    return (
        <>
            <Categories />
            <NewsList category={category} />
      </>
  )
}

export default NewsPage
```

- category 값을 URL 파라미터로 사용할것이므로
  1. Categories 컴포넌트에서 현재 선택된 카테고리 값을 알려줄 필요 없음
  2. onSelect 함수를 따로 전달해 줄 필요 없음

App의 기존 내용 삭제 후 Route 정의

```json
import { Route,Routes } from "react-router-dom";
import NewsPage from "./pages/NewsPage";

const App = () => {
  return (
    // react-router-dom version 6부터 <Route>를 <Routes>로 감싸줘야함.
    // compoenet 대신 element 사용
		// 기본 경로 명시 (/)
    <Routes>
      <Route element={<NewsPage />} path="/"/>
      <Route element={<NewsPage />} path="/:category"/>
    </Routes>
  )
}

export default App
```

`"/:category?"` 는 category 값이 선택적(optional)이라는 의미

→ 없다면 전체 카테고리를 선택한 것으로 간주함.

### 14.7.3. Categories에서 NavLink 사용하기

- onSelect 함수를 호출해서 카테고리 선택, 스타일 적용을 NavLink로 대체
- 일반 HTML 요소가 아닌 특정 컴포넌트에 styeld-component를 사용할 때는 styled(컴포넌트 이름)`` 사용
→ styled.div`
      → styled(NavLink)`

```json
import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';

const categories = [
    {
        name: 'all',
        text: '전체보기'
    },
    {
        name: 'business',
        text: '비즈니스'
    },
    {
        name: 'entertainment',
        text: '엔터테인먼트'
    },
    {
        name: 'health',
        text: '건강'
    },
    {
        name: 'science',
        text: '과학'
    },
    {
        name: 'sport',
        text: '스포츠'
    },
    {
        name: 'technology',
        text: '기술'
    },
]

const CategoriesBlock = styled.div`
    display: flex;
    padding: 1rem;
    width: 768px;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
        width:100%;
        overflow-x: auto;
    }
`;

const Category = styled(NavLink)`
    font-size: 1.125rem;
    cursor: pointer;
    white-space: pre;
    text-decotaion: none;
    color: inherit;
    padding-bottom: 0.25rem;

    &:hover {
        color: #495057;
    }

    &.active {
        font-weight: 600;
        border-bottom: 2px solid #22b8cf;
        color: #22b8cf;
        &:hover {
            color: #3bc9db;
        }
    }

    & + & {
        margin-left: 1rem;
    }
`;

const Categories = () => {
    return (
        <CategoriesBlock>
            {categories.map(c => (
                <Category
                    key={c.name}
//isActive 사용
                    **className={({isActive}) => (isActive? 'active' :undefined)}**
                    to={c.name === 'all' ? '/' : `/${c.name}`}
                    >
                    {c.text}
                </Category>
            ))}
        </CategoriesBlock>
    );
};

export default Categories;
```

## 14.8. usePromise 커스텀 Hook 만들기

- API 호출 처럼 Promise를 사용해야 하는 경우 더욱 간결하게 코드 작성할 수 있는커스텀 Hook 만들기
- uesPromise
  - src/lib/usePromise.js

```json
import { useState, useEffect } from "react"

export default function usePromise(promiseCreator, deps) {
    // 대기중 / 완료 / 실패에 대한 상태 관리
    const [loading, setLoading] = useState(false);
    const [resolved, setResolved] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const process = async () => {
            setLoading(true);
            try {
                const resolved = await promiseCreator();
                setResolved(resolved);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };
        process();
        //  eslint-disable-nexs-line react-hooks/exhaustive-deps
    }, deps);

    return [loading,resolved, error]

}
```

- 다양한 곳에 사용될 수 있는 유틸 함수들은 src/lib를 만든 후 그 안에 작성
- usePromise
  - Promise의 대기중, 완료결과, 실패 결과에 대한 상태를 관리
  - usePromise의 의존 배열 deps를 파라미터로 받아옴
    - uesPromise 내부에서 사용한 useEffect의 의존 배열로 설정

NewsList 컴포넌트에서 usePromise를 사용해보자!!

```json
//  API를 요청하고 뉴스 데이터가 들어있는 배열을 컴포넌트 배열로 변환하여 렌더링해 주는 컴포넌트

import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import NewsItem from './NewsItem'
import usePromise from '../lib/usePromise';

const NewsItemBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    `;

const WeatherAPIKEY = process.env.REACT_APP_WEATHER_API_KEY;
const NewsList = ({ category }) => {
    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${WeatherAPIKEY}`,)
    }, [category])

    // 대기 중일 떄
    if (loading) {
        return <NewsItemBlock>대기 중...</NewsItemBlock>
    }
    // 아직 response 값이 설정되지 않았을 때
    if (!response) {
        return null;
    }
    // 에러가 발생했을 때
    if (error) {
        return <NewsItemBlock>에러 발생!</NewsItemBlock>
    }
    // response 값이 유효할 때
    const { articles } = response.data;
    return (
        <NewsItemBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
      </NewsItemBlock>
  )
}

export default NewsList
```

usePromise를 사용해 NewsList에서 대기 중 상태 관리와 useEffect 설정을 직접 하지 않아도 되므로 코드가 간결해짐

요청 상태를 관리할 때 무조건 사용해야하는 것은 아니나 상황에 따라 좋은 코드를 만들 수 있음.

## 14.9. 정리

- 외부 API 연동해서 사용하기
- 외부 API 연동에서 절대 잊지 말아야할 것
  - useEffect에 등록하는 함수는 async로 작성하면 안되고 함수 내부에 async 함수를 따로 만들어야 함!!!
- API 종류가 많아지면 리덕스와 리덕스 미들웨어로 요청에 대한 상태 관리를 할 수 있음
