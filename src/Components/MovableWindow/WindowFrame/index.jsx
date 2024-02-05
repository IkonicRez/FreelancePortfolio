import React, { useState, useCallback, useLayoutEffect, useContext } from 'react'
import { WindowManagerContext } from '../WindowManager/context/WindowManagerContext';
import "./window_frame.css"


const WindowFrame = (props) => {

    const {useMouseTracker, windows, dispatchCallbackEvent} = useContext(WindowManagerContext);
    const [bDragging, setDragging] = useState(false);
    const [bInitialized, setInitialized] = useState(false)
    const stateValid = windows[props.title] !== undefined

    const mousePosCallback = (mousePos, prevPos) => {
        if (bDragging) {
            // SHOULD PROBABLY BE USELAYOUTEFFECT()
            dispatchEvent({
                type: "change",
                pos: {
                    x: (windows[props.title].pos.x - (prevPos.x - mousePos.x)),
                    y: (windows[props.title].pos.y - (prevPos.y - mousePos.y)) 
                }
            })
        }
    };

    useMouseTracker(mousePosCallback)
    var element = document.getElementById(props.title);

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
        dispatchEvent({
            type: "focus"
        })
        setDragging(true);
    }

    const handleMouseUp = (e) => {
        e.preventDefault();
        setDragging(false);
    }
    
    const handleMinimize = () => {
        //NEEDS WORK (TEMP USE TO BE THE NUMBER OF MINIMIZED TABS BUT THAT HAS BEEN REMOVED)
        if (!windows[props.title].minimized) {
            var temp = 0
            dispatchEvent({
                type: "minimize",
                minimized: true,
                minimizedPos: {
                    x: 0 + (element.getBoundingClientRect().width * temp),
                    y: window.innerHeight - (element.getBoundingClientRect().height)
                }
            })
        } else {
            dispatchEvent({
                type: "minimize",
                minimized: false
            })
        }
    }

    useLayoutEffect(() => {
        // IGNORE USEEFFECT WARNING ABOUT windows ITS JUST THE CONSOLE LOG (DONT ADD HANDLEMOUSEMOVE EITHER OR SHIT BRICKS)
        if (!bInitialized) {
            // SHOULD PROBABLY BE USELAYOUTEFFECT()
            dispatchEvent({
                type: "add",
                props: props
            })
            console.log(windows)
            setInitialized(true)
        }
    }, [bInitialized, props, dispatchEvent, windows])

    return (
        <div
            className={`window ${stateValid ? (windows[props.title].minimized ? 'minimized' : '') : ''}`}
            style={{ 
                position: "absolute", 
                zIndex: stateValid ? (windows[props.title].focus ? 99 : 10) : 10,
                top: `${stateValid ? (windows[props.title].minimized ? windows[props.title].minimizedPos.y : windows[props.title].pos.y) : props.pos.y}px`, 
                left: `${stateValid ? (windows[props.title].minimized ? windows[props.title].minimizedPos.x : windows[props.title].pos.x) : props.pos.x}px`}}
        >
            <div className="window-border" style={props.size ? props.size : {height: "150px", width: "150px"}}>
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
