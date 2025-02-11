import { handleActions } from "redux-actions";
import * api from "../lib/api";

// 액션 타입 선언하기;
// 한 요청당 세 개 만들기;

import { applyMiddleware } from "redux";

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS_SUCESS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_SUCESS';

// thunk 함수 생성
// thunk 함수 내부에서는 시작할 때, 성공했을 때, 실패했을 때 다른 액션을 디스패치함.

export const getPost = id => async dispatch => {
    dispatch({ type: GET_POST });// 요청 시작 알림
    try {
        const response = await api.getPost(id);

        dispatch({
            type: GET_POST_SUCCESS,
            payload: response.data
        }); // 요청 성공
    } catch (e) {
        dispatch({
            type: GET_POST_FAILURE,
            payload: e,
            error: true
        }) // 에러 발생
        throw e; //나중에 컴포넌트단에서 에러 조회 가능
    }
};

// 초기 상태를 선언하기
// 요청의 로딩 중 상태느 loading이라는 객체에서 관리

const initialState = {
    loading: {
        GET_POST: false,
        GET_USERS: false
    },
    post: null,
    users: null
};

const sample = handleActions(
    {
        [GET_POST]: state => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: true //요청시작
            }
        }),
        [GET_POST_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: false //요청 완료
            },
            post: action.payload
        }),
        [GET_POST_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: false //요청 완료
            }
        }),
        [GET_USERS]: state => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USERS: true // 요청 시작
            }
        }),
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USERS: false // 요청 완료
            },
            users: action.payload
        }),
        [GET_USERS_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USERS: false //요청 완료
            }
        })
    },
    initialState
);

export default sample;