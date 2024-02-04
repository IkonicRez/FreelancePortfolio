import React, { useState } from "react";
import { MousePositionContext } from "./context/MousePositionContext";
import { MinimizedWindowContext } from "./context/WindowContext";

export default function WindowManager(props) {

    const [mousePos, setMousePos] = useState(props.default ? props.default : {x: 0, y: 0} )
    const [minimizedWindows, setMinimizedWindows] = useState(0)
    const [windowStates, setWindowStates] = useState(
        {
            windows: ["", "", "", ""],
            minimized: [""]
        }
    )

    const handleMousePosition = (e) => {
        e.preventDefault();
        if (e.pageX !== mousePos.x && e.pageY !== mousePos.y) {
            setMousePos({x: e.pageX, y: e.pageY})
        }
    }

    return (
        <section 
            className={"movable-window-area" + props.className ? props.className : ""} 
            id={props.id ? props.id : "default_movable_area"}
            onMouseMove={handleMousePosition}
        >   
            <MinimizedWindowContext.Provider value={{minimizedWindows, setMinimizedWindows}}>
                <MousePositionContext.Provider value={mousePos}>
                    {props.children}
                </MousePositionContext.Provider>
            </MinimizedWindowContext.Provider>
        </section>
    );

}