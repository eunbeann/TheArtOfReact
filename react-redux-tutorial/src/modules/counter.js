//src/modules/counter
import { createAction, handleActions } from "redux-actions";

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = {
    // 초기 상태에서는 number 값
    number: 0
};

const counter = handleActions(
    {
        [INCREASE]: (state, action) => ({ number: state.number +1 }),
        [DECREASE]: (state, action) => ({ number: state.number -1 }),
    },
)

// 함수 내보내기
export default counter