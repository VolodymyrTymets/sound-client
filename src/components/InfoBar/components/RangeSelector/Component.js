import React from 'react';
import { Range, getTrackBackground } from 'react-range';
import '../MicLevelControl/style.css';

const STEP = 5;
const MIN = 0;
const MAX = 100;

const RangeSelectorComponent = ({ rate, setRate }) => (
    <div className="d-flex flex-row">
        <p className="indicator">0</p>
        <div className="range-container">
            <Range
                step={STEP}
                min={MIN}
                max={MAX}
                values={rate}
                onChange={setRate}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            background: getTrackBackground({
                                values: rate,
                                colors: ['#aaa', '#000000', '#aaa'],
                                min: MIN,
                                max: MAX,
                            }),
                        }}
                        className="line"
                    >
                        <div
                            ref={props.ref}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({props, isDragged}) =>(
                    <div
                    {...props}
                    style={{
                        ...props.style,
                    }}
                    className="toggle"
                    >
                        <div className="circle-container">
                            <div className={`circle ${isDragged ? 'active' : ''}`}> </div>
                            <div className={`circle ${isDragged ? 'active' : ''}`}> </div>
                            <div className={`circle ${isDragged ? 'active' : ''}`}> </div>
                        </div>
                    </div>)
                }
            />
        </div>
        <p className="indicator">100</p>
    </div>
);


RangeSelectorComponent.propTypes = {

};

export { RangeSelectorComponent };
