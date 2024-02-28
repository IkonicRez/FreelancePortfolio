import React, { useCallback, useEffect, useReducer, useState, useRef } from "react";
import { WindowContext, WindowEventContext, MouseEventContext } from "./context/WindowManagerContext";
import WindowFrame from "../WindowFrame";
import './window_manager.css'
import WindowMinimizer from "../WindowMinimizer";


export default function WindowManager(props) {

    const [currentMinimizedIndex, setCurrentMinimizedIndex] = useState(1)
    //Used to force a re-render at certain points. This solves issue #9 with re renders only triggering on mouse move.
    const [triggerRender, setTriggerRender] = useState(false)
    //This is for better css control over indivual pages, value is set in the indivdual pages.
    const [currentPage, setCurrentPage] = useState("")

    // This is used as part of the main React Reducer that allows the window system to work
    // This allows other components in the structure to run events from this component easily
    // These can be indivual functions but for simplicity is one large function.
    // Example: 
    // dispatchWindowEvent({type: "initialize", data: data})
    // Any amount of items can be added to the object. 
    // The object will come through as action and tasks will be the current state of the reducer.
    // For our case tasks is a list of the object data we store for each window but could be any array of data.
    // Each case must return a list of what tasks should become. This doesn't need to return tasks itself but tasks is mutable.
    function windowStateReducer(tasks, action) {
        switch (action.type) {
            // Called on page load by the page. Adds all required windows for that page in a loop and sets currentPage to ensure proper css.
            case "initialize": {
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
                setCurrentPage(action.title)
                return tasks
            }
            case "minimizeAll": {
                Object.keys(tasks).forEach((v, i) => {
                    tasks[v].minimized = true
                })
                return tasks
            }
            case "change": {
                if (tasks[action.id] === undefined) return
                //Add all keys and values from the action.data object to the specified tasks object.
                Object.assign(tasks[action.id], action.data)
                //Sets that the window has been moved. This is/will be used to stop windows moving back to their original position constantly.
                tasks[action.id].moved = true;
                return tasks
            }
            case "minimize": {
                if (tasks[action.id] === undefined) return
                //Add all keys and values from the action.data object to the specified tasks object.
                Object.assign(tasks[action.id], action.data)
                return tasks
            }
            case "focus": {
                if (tasks[action.id] === undefined) return;
                //Loops the windows and sets focus on the window firing the event and unfocuses all other windows
                Object.keys(tasks).forEach((v, i) => {
                    if (v === action.id) { 
                        setCurrentMinimizedIndex(currentMinimizedIndex + 1)
                        tasks[v].minimizedIndex = currentMinimizedIndex
                        tasks[v].focus = true }
                    else { tasks[v].focus = false }
                })
                return tasks
            }
            // Possible unused case now.
            case "reset": {
                return {}
            }
            default: {
                throw Error(`Unknown Action: ${action.type}`)
            }
        }
    }

    // Used to create an map of objects that should receive mouse events
    const subscribers = useRef(new Map()) 
    const [mousePos, setMousePos] = useState({x: 0, y: 0})
    const [prevPos, setPrevPos] = useState({ x: 0, y: 0});
    // This creates the React Reducer. Similar to state but requires a function to be passed that is used to manipulate the data.
    // This way we dont have to pass lots of functions down to unknown numbers of components
    const [windows, dispatchWindowEvent] = useReducer(windowStateReducer, {})
    
    //This is what we actually pass components rather than dispatchWindowEvent to ensure re-renders when windows are updated.
    const dispatchCallbackEvent = useCallback(action => { 
        dispatchWindowEvent(action)
        setTriggerRender(!triggerRender)
    }, [triggerRender])

    // Seems complicated but any component with the WindowManagerContext can call this function.
    // Calling this will add the component to the subscribers list when it mounts and remove itself from the list when it is destroyed
    // The useEffects inside this run inside the component calling the function when it is called. 
    // Having an anonyomous function in a useEffect causes it to run on unmount.
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

    // Each subscriber runs this callback when the mouse moves
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

    // Might reuse this for the later resizing code
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

    // Returns a list of the window depending on if they are minimized or not
    const getWindowsByMinimizedState = (getMinimized) => {
        return Object.keys(windows).filter(v => {
            return windows[v].minimized === getMinimized
        }).map((v, i) => {
            const d = windows[v]
            return (
                <WindowFrame title={v} key={i}>
                    {d ? <p>{windows[v].content}</p> : ""} 
                </WindowFrame>
            )
        })
    }

    // Adds and removes event listeners from this component on mount and unmount
    // windows can be removed as a dependancy when the console log is removed
    useEffect(()=>{
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
            id={`default-movable-area ${currentPage}`}
        >   
            <WindowContext.Provider value={windows}>
                <WindowEventContext.Provider value={dispatchCallbackEvent}>
                    <MouseEventContext.Provider value={useMouseTracker}>
                        {props.children}
                        <div className="window-area">
                            { getWindowsByMinimizedState(false) }
                        </div>
                        <WindowMinimizer>
                            { getWindowsByMinimizedState(true) }
                        </WindowMinimizer>
                    </MouseEventContext.Provider>
                </WindowEventContext.Provider>
            </WindowContext.Provider>
        </section>
    );

}