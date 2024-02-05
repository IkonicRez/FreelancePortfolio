import React, { useCallback, useEffect, useReducer, useState, useRef } from "react";
import { WindowManagerContext } from "./context/WindowManagerContext";


export default function WindowManager(props) {
    
    function windowStateReducer(tasks, action) {
        switch (action.type) {
            case "add": {
                tasks[action.id] = {
                    pos: action.data.props.pos,
                    moved: false,
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

    const subscribers = useRef(new Map()) 
    const [mousePos, setMousePos] = useState({x: 0, y: 0})
    const [prevPos, setPrevPos] = useState({ x: 0, y: 0});
    const [windows, dispatchWindowEvent] = useReducer(windowStateReducer, {})
    
    const dispatchCallbackEvent = useCallback(action => { dispatchWindowEvent(action) }, [])

    const useMouseTracker = callback => {
        const [id] = useState(new Date()); // This value is not 0, it's a system-wide per-component constant, guaranteed, tried and tested
      
        const subscribe = useCallback(() => {
          subscribers.current.set(id, callback);
        }, [id, callback]);
      
        const unsubscribe = useCallback(() => {
          subscribers.current.delete(id);
        }, [id]);
      
        useEffect(() => {
          subscribe();
        }, [subscribe]);
      
        useEffect(() => unsubscribe, [unsubscribe]);
    };

    const mouseMoveHandler = useCallback(event => {
        if (event) {
            if ((event.pageX !== mousePos.x) || (event.pageY !== mousePos.y)) {
                setPrevPos(mousePos);
                setMousePos({x: event.pageX, y: event.pageY})
                subscribers.current.forEach(callback => {
                    callback(mousePos, prevPos)
                })
            }
            
        }
    }, [mousePos, prevPos])

    const handleResize = useCallback(event => {
        // TRIGGER RESIZING
    }, [])


    useEffect(()=>{
        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('resize', handleResize)
    
        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('resize', handleResize)
        };
    }, [mouseMoveHandler, handleResize])


    return (
        <section 
            className={"movable-window-area" + props.className ? props.className : ""} 
            id={props.id ? props.id : "default_movable_area"}
        >   
            <WindowManagerContext.Provider value={{useMouseTracker, windows, dispatchCallbackEvent}}>
                {props.children}
            </WindowManagerContext.Provider>
        </section>
    );

}