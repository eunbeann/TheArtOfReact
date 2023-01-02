//modules/todos.js

import { createAction, handleActions } from "redux-actions";
const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값 변경
const INSERT = 'todos/INSERT'; //새로운 todo를 등록함
const TOGGLE = 'todos/TOGGLE'; //todo를 체크/ 체크 해제함
const REMOVE = 'todos/REMOVE'; // todo를 제거함

export const changeInput = createAction(CHANGE_INPUT,
    input => input
);

let id = 3; //insert가 호출될 때마다 1씩 더해짐
// 다음 절에서 초기 상태 작성할 때 todo 객체 두 개를 사전에 미리 넣어둘 것이므로 그다음에 새로 추가될 항목의 id가 3임

export const insert = createAction(INSERT, text => ({
        id: id++,
        // 호출될 때마다 id 값에 1씩 더해 줌. 
        // 이 id 값은 todo 객체가 들고 있게 될 고윳값
        text,
        done: false
    }));

export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

const initialState = {
    input: '',
    todos: [
        {
            id: 1,
            text: '리덕스 기초 배우기',
            done: true
        },
        {
            id: 2,
            text: '리액트와 리덕스 사용하기',
            done: false
        },
    ]
};

const todos = handleActions(
    {
        [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
        [INSERT]: (state, { payload: todo }) => ({
            ...state,
            todos: state.todos.concat(todo),
        }),
        [TOGGLE]: (state, { payload: id }) => ({
            ...state,
            todos: state.todos.map(todo =>
                todo.id === id ? { ...todo, done: !todo.done } : todo,),
        }),
        [REMOVE]: (state, {payload: id}) => ({
            ...state,
            todos: state.todos.filter(todo => todo.id !== id),
        }),
    }, initialState, );

export default todos;