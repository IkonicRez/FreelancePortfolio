import React, { useCallback, useEffect, useReducer, useState, useRef } from "react";
import { WindowManagerContext } from "./context/WindowManagerContext";
import WindowFrame from "../WindowFrame";
import { createBrowserHistory } from "../../../Utils/BrowserHistory";
import './window_manager.css'

export default function WindowManager(props) {

    const [triggerRender, setTriggerRender] = useState(false)
    // This is how we add new options to the handler
    // WindowFrames can run these switch statements and pass data to it for saving later
    // all information from calling dispatchEvent will be in action.data
    function windowStateReducer(tasks, action) {
        switch (action.type) {
            case "initialize": {
                console.log(action)
                action.data.forEach((v) => {
                    tasks[v.title] = {
                        content: v.content,
                        pos: {x: 0, y: 0},
                        moved: false,
                        minimized: false,
                        minimizedIndex: 0,
                        minimizedPos: {x: 0, y: 0},
                        focus: false
                    }
                })
                return tasks
            }
            case "add": {
                tasks[action.id] = {
                    pos: {x: 0, y: 0},
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
                tasks[action.id].moved = true;
                console.log(tasks[action.id].pos)

                return tasks
            }
            case "minimize": {
                if (tasks[action.id] === undefined) return
                Object.assign(tasks[action.id], action.data)
                // var element;
                // var minimizedWindows = 0;
                // var container = document.getElementsByClassName("window-area")[0]
                // if (container === undefined) return
                // container = container.getBoundingClientRect()
                // Object.keys(tasks).forEach((v, i) => {
                //     if (tasks[v].minimized === true) {
                //         element = document.getElementById(v)
                //         tasks[v].minimizedPos = {
                //             x: 0 + (element.getBoundingClientRect().width * minimizedWindows),
                //             y: (container.height) - (element.getBoundingClientRect().height)
                //         }
                //         minimizedWindows += 1
                //     }
                // })
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
            case "reset": {
                return {}
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
    
    const dispatchCallbackEvent = useCallback(action => { 
        dispatchWindowEvent(action)
        setTriggerRender(!triggerRender)
    }, [triggerRender])

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
        // var element;
        // var minimizedWindows = 0;
        // Object.keys(windows).forEach((v, i) => {
        //     if (windows[v].minimized === true) {
        //         element = document.getElementById(v)
        //         windows[v].minimizedPos = {
        //             x: 0 + (element.getBoundingClientRect().width * minimizedWindows),
        //             y: window.innerHeight - (element.getBoundingClientRect().height)
        //         }
        //         minimizedWindows += 1
        //     }
        // })
        setTriggerRender(!triggerRender)
    }, [triggerRender])


    useEffect(()=>{
        console.log(windows)
        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('resize', handleResize)
        };
    }, [mouseMoveHandler, handleResize, windows])

    return (
        <section 
            className={props.className ? "movable-window-area" + props.className : "movable-window-area"} 
            id={props.id ? `default-movable-area ${props.id}` : "default-movable-area"}
        >   
            <WindowManagerContext.Provider value={{useMouseTracker, windows, dispatchCallbackEvent}}>
                {props.children}
                <div className="window-area">
                    {
                        Object.keys(windows).filter((v) => {
                            console.log(windows[v])
                            return windows[v].minimized !== true
                        }).map(v => {
                            console.log(v);
                            return (
                                <WindowFrame title={v}>
                                    {windows[v].content}
                                </WindowFrame>
                            )
                        })
                    }
                </div>
                <div className="window-minimzer">
                    {
                        Object.keys(windows).filter((v) => {
                            console.log(windows[v])
                            return windows[v].minimized === true
                        }).map(v => {
                            console.log(v);
                            return (
                                <WindowFrame title={v}>
                                    {windows[v].content}
                                </WindowFrame>
                            )
                        })
                    }
                </div>
            </WindowManagerContext.Provider>
        </section>
    );

}