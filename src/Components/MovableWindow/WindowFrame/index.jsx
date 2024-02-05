import React, { useState, useEffect, useCallback } from 'react'
import "./window_frame.css"
import { useContext } from "react";
import { WindowManagerContext } from '../WindowManager/context/WindowManagerContext';


const WindowFrame = (props) => {

    const {mousePos, windows, dispatchWindowEvent} = useContext(WindowManagerContext);
    const [bDragging, setDragging] = useState(false);
    const [prevPos, setPrevPos] = useState({ x: props.pos.x, y: props.pos.y});
    const [pos, setPos] = useState({ x: props.pos.x, y: props.pos.y});
    const [bInitialized, setInitialized] = useState(false)
    const stateValid = windows[props.title] !== undefined
    var element = document.getElementById(props.title);

    const dispatchEvent = useCallback((action) => {
        let type = action.type
        delete action.type
        dispatchWindowEvent({
            type: type,
            data: action,
            id: props.title
        })
    }, [props.title, dispatchWindowEvent])
    
    
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
        setPrevPos({ x: mousePos.x, y: mousePos.y});
        setDragging(true);
    }

    const handleMouseUp = (e) => {
        e.preventDefault();
        setDragging(false);
    }

    const handleMouseMove = useCallback(() => {
        setPos({
            x: (pos.x - (prevPos.x - mousePos.x)),
            y: (pos.y - (prevPos.y - mousePos.y)) 
        })
        setPrevPos({ x: mousePos.x, y: mousePos.y})
    }, [pos, prevPos, mousePos])
    
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

    useEffect(()=> {
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
        if (bDragging) {
            // SHOULD PROBABLY BE USELAYOUTEFFECT()
            handleMouseMove()
        }
    }, [windows, bDragging, bInitialized, props, handleMouseMove, dispatchEvent])

    return (
        <div
            className={`window ${stateValid ? (windows[props.title].minimized ? 'minimized' : '') : ''}`}
            style={{ 
                position: "absolute", 
                zIndex: stateValid ? (windows[props.title].focus ? 99 : 10) : 10,
                top: `${stateValid ? (windows[props.title].minimized ? windows[props.title].minimizedPos.y : pos.y) : pos.y}px`, 
                left: `${stateValid ? (windows[props.title].minimized ? windows[props.title].minimizedPos.x : pos.x) : pos.x}px`}}
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
