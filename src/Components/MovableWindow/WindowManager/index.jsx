import React, { useEffect, useReducer, useState } from "react";
import { WindowManagerContext } from "./context/WindowManagerContext";

export default function WindowManager(props) {
    
    function windowStateReducer(tasks, action) {
        switch (action.type) {
            case "add": {
                tasks[action.id] = {
                    pos: action.data.props.pos,
                    minimized: false,
                    minimizedIndex: 0,
                    minimizedPos: {x: 0, y: 0},
                    focus: false
                }
                return tasks
            }
            case "change": {
                if (tasks[action.id] === undefined) return
                Object.assign(tasks[action.id], action.data)
                return tasks
            }
            case "minimize": {
                if (tasks[action.id] === undefined) return
                Object.assign(tasks[action.id], action.data)
                return tasks
            }
            case "focus": {
                if (tasks[action.id] === undefined) return;
                Object.keys(tasks).forEach((v, i) => {
                    if (v === action.id) {
                        tasks[v].focus = true;
                    } else { 
                        tasks[v].focus = false;
                    }
                })
                return tasks
            }
            default: {
                throw Error(`Unknown Action: ${action.type}`)
            }
        }
    }

    const [mousePos, setMousePos] = useState(props.default ? props.default : {x: 0, y: 0} )
    const [windows, dispatchWindowEvent] = useReducer(windowStateReducer, {})

    useEffect(()=>{
        const handleMouseMove = (event) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        };
    
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize)
    
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize)
        };
    }, [])

    const handleResize = () => {
        // TRIGGER RESIZING
    }

    return (
        <section 
            className={"movable-window-area" + props.className ? props.className : ""} 
            id={props.id ? props.id : "default_movable_area"}
        >   
            <WindowManagerContext.Provider value={{mousePos, windows, dispatchWindowEvent}}>
                {props.children}
            </WindowManagerContext.Provider>
        </section>
    );

}