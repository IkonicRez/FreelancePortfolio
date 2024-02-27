import React, { useState, useCallback, useLayoutEffect, useContext } from 'react'
import { WindowManagerContext } from '../WindowManager/context/WindowManagerContext';
import "./window_frame.css"


const WindowFrame = (props) => {

    const {useMouseTracker, windows, dispatchCallbackEvent} = useContext(WindowManagerContext);
    const [bDragging, setDragging] = useState(false);
    const stateValid = windows[props.title] !== undefined
    const self = windows[props.title]


    const isValueValid = (pos, minPos) => {
        return `${stateValid ? (self.minimized ? minPos : pos) : 0}px`
    }

    const mousePosCallback = (mousePos, prevPos) => {
        if (bDragging) {
            dispatchEvent({
                type: "change",
                pos: {
                    x: (self.pos.x - (prevPos.x - mousePos.x)),
                    y: (self.pos.y - (prevPos.y - mousePos.y)) 
                },
                moved: true
            })
        }
    };

    useMouseTracker(mousePosCallback)

    const dispatchEvent = useCallback((action) => {
        let type = action.type
        delete action.type
        dispatchCallbackEvent({
            type: type,
            data: action,
            id: props.title
        })
    }, [props.title, dispatchCallbackEvent])
    
    const handleMouseDown = (e) => {
        e.preventDefault();
        dispatchEvent({ type: "focus" })
        setDragging(true);
    }

    const handleMouseUp = (e) => {
        e.preventDefault();
        setDragging(false);
    }
    
    const handleMinimize = (e) => {
        e.preventDefault()
        dispatchEvent({ type: "minimize", minimized: !self.minimized })
    }

    return (
        <div
            className={`window ${stateValid ? (self.minimized ? 'minimized' : '') : ''}`}
            style={{ 
                position: stateValid ? (self.minimized ? "unset" : "absolute") : "absolute", 
                zIndex: stateValid ? (self.focus ? 99 : 10) : 10,
                transform: stateValid ? `translate(${isValueValid(self.pos.x, self.minimizedPos.x)}, ${isValueValid(self.pos.y, self.minimizedPos.y)})` : "none", 
            }}
        >
            <div className="window-border">
                <div className="window-header" 
                    id={props.title}
                    onMouseDown={handleMouseDown} 
                    onMouseUp={handleMouseUp} 
                >
                    <span className="unselectable">{props.title}</span>
                    <section>
                        <button aria-label={"Minimize " + props.title} onClick={handleMinimize}></button>
                    </section>
                </div>
                {props.children}
            </div>
        </div>
    )
}

export default WindowFrame
