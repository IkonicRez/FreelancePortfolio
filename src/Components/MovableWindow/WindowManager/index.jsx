import React, { useState } from "react";
import { PositionContext } from "./context/PositionContext";

export default function WindowManager(props) {

    const [mousePos, setMousePos] = useState(props.default ? props.default : {x: 0, y: 0} )

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
            <PositionContext.Provider value={mousePos}>
                {props.children}
            </PositionContext.Provider>
        </section>
    );

}