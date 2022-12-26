//src/modules/counter

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

export const increase = () => ({ type : INCREASE })
export const decrease = () => ({ type: DECREASE })

const initialState = {
    // 초기 상태에서는 number 값
    number: 0
};

function counter(state = initialState, action) {
    // 리듀서 함수에서는 현재 상태를 참조해서 새로운 객체를 생성해서 반환하는 코드 작성
    switch (action.type) {
        case INCREASE:
            return {
                number: state.number + 1
                };
        case DECREASE:
            return {
                number: state.number - 1
            };
        default:
            return state;
    }
}

// 함수 내보내기
export default counter