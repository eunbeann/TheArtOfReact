import React from 'react'
import { ColorConsumer } from '../contexts/colors';

const colors = ['red', 'orange', 'yellow', 'blue', 'indigo', 'violet'];


const SelectColors = () => {
    return (
        <div>
            <h2>색상을 선택하세요.</h2>
            <ColorConsumer>
                {({ actions }) => (
                    <div style={{ display: 'flex' }}>
                        {colors.map(color => (
                            <div
                                key={color}
                                style={{ background: color, width: '24px', height: '24px', cursor: 'pointer' }}
                                onClick={() => actions.setColor(color)}
                                // 마우스 오른쪽 버튼 클릭 이벤트
                                onContextMenu={e => {
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

export default SelectColors