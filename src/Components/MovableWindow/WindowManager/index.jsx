import React, { useEffect, useState } from "react";
import { WindowManagerContext } from "./context/WindowManagerContext";

export default function WindowManager(props) {
    
    const [mousePos, setMousePos] = useState(props.default ? props.default : {x: 0, y: 0} )
    const [windowStates, setWindowStates] = useState({})

    const addWindowState = (v) => {
        var state = windowStates
        state[v.title] = {
            pos: v.pos,
            minimized: false,
            minimizedIndex: 0,
            minimizedPos: {x: 0, y: 0},
            focus: false
        }
        // console.log({
        //     pos: v.pos,
        //     minimized: false,
        //     minimizedIndex: 0,
        //     minimizedPos: {x: 0, y: 0},
        //     focus: false
        // })
        setWindowStates(state) 
    }

    const updateWindowState = (key, value) => {
        if (windowStates[key] === undefined) return
        var state = windowStates[key];
        Object.assign(state, value)
    }

    const handleMousePosition = (e) => {
        e.preventDefault();
        if (e.pageX !== mousePos.x && e.pageY !== mousePos.y) {
            setMousePos({x: e.pageX, y: e.pageY})
        }
    }

    useEffect(()=>{
        window.addEventListener('resize', handleResize)
        return function() {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleResize = () => {
        // TRIGGER RESIZING
    }

    return (
        <section 
            className={"movable-window-area" + props.className ? props.className : ""} 
            id={props.id ? props.id : "default_movable_area"}
            onMouseMove={handleMousePosition}
        >   
            <WindowManagerContext.Provider value={{mousePos, windowStates, addWindowState, updateWindowState}}>
                {props.children}
            </WindowManagerContext.Provider>
        </section>
    );

}