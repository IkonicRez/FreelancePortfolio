import React, { useState, useCallback, useLayoutEffect, useContext } from 'react'
import { WindowManagerContext } from '../WindowManager/context/WindowManagerContext';
import "./window_frame.css"


const WindowFrame = (props) => {

    const {useMouseTracker, windows, dispatchCallbackEvent} = useContext(WindowManagerContext);
    const [bDragging, setDragging] = useState(false);
    const [bInitialized, setInitialized] = useState(false);
    const stateValid = windows[props.title] !== undefined
    const self = windows[props.title]

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
    
    // const setElementPosition = (x, y) => {
    //     let _x = (window.innerWidth / 100) * 3
    //     return {
    //         x: ((x - (props.size.width / 2)) - _x),
    //         y: ((y - (props.size.height / 2)) - _x)
    //     }
    // }
    
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

    useLayoutEffect(() => {
        if (!bInitialized) {
            let element = document.getElementById(props.title)
            let pos = {x: element.getBoundingClientRect().x  , y: element.getBoundingClientRect().y}
            dispatchEvent({ type: "add", props: props, pos: pos })
            setInitialized(true)
        }
    }, [bInitialized, props, dispatchEvent])

    return (
        <div
            className={`window ${stateValid ? (self.minimized ? 'minimized' : '') : ''}`}
            style={{ 
                position: "absolute", 
                zIndex: stateValid ? (self.focus ? 99 : 10) : 10,
                top: `${stateValid ? (self.minimized ? self.minimizedPos.y : self.pos.y) : 0}px`, 
                left: `${stateValid ? (self.minimized ? self.minimizedPos.x : self.pos.x) : 0}px`}}
        >
            <div className="window-border">
                <div className="window-header" 
                    id={props.title}
                    onMouseDown={handleMouseDown} 
                    onMouseUp={handleMouseUp} 
                >
                    <span className="unselectable">{props.title}</span>
                    <section>
                        <button aria-label={"Minimize " + props.title} onClick={handleMinimize}>_</button>
                    </section>
                </div>
                <div className="window-content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default WindowFrame
