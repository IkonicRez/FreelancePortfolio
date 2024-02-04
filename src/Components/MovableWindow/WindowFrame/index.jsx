import React, { useState, useEffect } from 'react'
import "./window_frame.css"
import { useContext } from "react";
import { WindowManagerContext } from '../WindowManager/context/WindowManagerContext';

const WindowFrame = (props) => {

    const {mousePos, windowStates, addWindowState, updateWindowState} = useContext(WindowManagerContext);
    const [bDragging, setDragging] = useState(false);
    const [prevPos, setPrevPos] = useState({ x: props.pos.x, y: props.pos.y});
    const [pos, setPos] = useState({ x: props.pos.x, y: props.pos.y});
    const [bInitialized, setInitialized] = useState(false)
    var element = document.getElementById(props.title);
    
    
    // const setElementPosition = (x, y) => {
    //     let _x = (window.innerWidth / 100) * 3
    //     return {
    //         x: ((x - (props.size.width / 2)) - _x),
    //         y: ((y - (props.size.height / 2)) - _x)
    //     }
    // }
    
    const handleMouseDown = (e) => {
        e.preventDefault();
        // Started setup for allowing window manager to control focus
        element.parentElement.parentElement.style.zIndex = 99;
        setPrevPos({ x: mousePos.x, y: mousePos.y});
        setDragging(true);
    }

    const handleMouseUp = (e) => {
        e.preventDefault();
        element.parentElement.parentElement.style.zIndex = "auto";
        setDragging(false);
    }

    const handleMouseMove = () => {
        setPos({
            x: (pos.x - (prevPos.x - mousePos.x)),
            y: (pos.y - (prevPos.y - mousePos.y)) 
        })
        setPrevPos({ x: mousePos.x, y: mousePos.y})
    }
    
    const handleMinimize = () => {
        // NEEDS WORK (TEMP USE TO BE THE NUMBER OF MINIMIZED TABS BUT THAT HAS BEEN REMOVED)
        if (!windowStates[props.title].minimized) {
            var temp = 0
            updateWindowState(props.title, 
                {
                    minimized: true,
                    minimizedPos: {
                        x: 0 + (element.getBoundingClientRect().width * temp),
                        y: window.innerHeight - (element.getBoundingClientRect().height)
                    }
                }
            )
            console.log(windowStates)
        } else {
            updateWindowState(props.title, { minimized: false })
            console.log(windowStates)
        }
    }

    useEffect(()=> {
        // IGNORE USEEFFECT WARNING ABOUT WINDOWSTATES ITS JUST THE CONSOLE LOG (DONT ADD HANDLEMOUSEMOVE EITHER OR SHIT BRICKS)
        if (!bInitialized) {
            addWindowState(props)
            console.log(windowStates)
            setInitialized(true)
        }
        if (bDragging) {
            handleMouseMove()
        }
    }, [mousePos, bDragging, bInitialized, addWindowState, props])

    return (
        <div
            className={`window ${windowStates[props.title] !== undefined ? (windowStates[props.title].minimized ? 'minimized' : '') : ''}`}
            style={{ 
                position: "absolute", 
                // HATE THIS BUT IT HAD TO BE DONE (MIGHT BE ABLE TO MOVE CHECK TO SOME VAR OR FUNCTION TO REMOVE REPEAT LINES)
                top: `${windowStates[props.title] !== undefined ? (windowStates[props.title].minimized ? windowStates[props.title].minimizedPos.y : pos.y) : pos.y}px`, 
                left: `${windowStates[props.title] !== undefined ? (windowStates[props.title].minimized ? windowStates[props.title].minimizedPos.x : pos.x) : pos.x}px`}}
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
