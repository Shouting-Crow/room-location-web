import React from "react";
import './RoomSidebar.css';

const RoomSidebar = ({onShapeClick, sizeX, sizeY, sizeZ, setSizeX, setSizeY, setSizeZ, currentStep, selectedShape}) => {
    const shapes = [
        { id: 'shape1', thumbnail: '/models/thumbnail/thumbnail1.jpg', name: '방 1'},
    ];

    return (
        <div className="sidebar">
            {/* 1단계: 방 모양 선택 */}
            {currentStep === 1 && (
                <>
                    {shapes.map(shape => (
                        <div key={shape.id}
                             className={`shape-container ${selectedShape === shape.id ? 'selected' : ''}`}
                             onClick={() => onShapeClick(shape.id)}>
                            <img src={shape.thumbnail} alt={shape.name} className="shape-thumbnail"/>
                            <p>{shape.name}</p>
                        </div>
                    ))}
                </>
            )}

            {/* 2단계: 크기 조절 */}
            {currentStep === 2 && (
                <div className="size-controls">
                    <label>가로: {sizeX.toFixed(1)}</label>
                    <input
                        type="range"
                        min="5"
                        max="20"
                        step="0.1"
                        value={sizeX}
                        onChange={(e) => setSizeX(parseFloat(e.target.value))}
                    />
                    <label>높이: {sizeY.toFixed(1)}</label>
                    <input
                        type="range"
                        min="5"
                        max="20"
                        step="0.1"
                        value={sizeY}
                        onChange={(e) => setSizeY(parseFloat(e.target.value))}
                    />
                    <label>세로: {sizeZ.toFixed(1)}</label>
                    <input
                        type="range"
                        min="5"
                        max="20"
                        step="0.1"
                        value={sizeZ}
                        onChange={(e) => setSizeZ(parseFloat(e.target.value))}
                    />
                </div>
            )}

            {/* 나중에 3단계, 4단계 추가 */}
        </div>
    );
};

export default RoomSidebar;