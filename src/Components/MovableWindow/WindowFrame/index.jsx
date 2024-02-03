import React, { useState, useEffect } from 'react'
import "./window_frame.css"
import { useContext } from "react";
import { PositionContext } from "../WindowManager/context/PositionContext";

const WindowFrame = (props) => {
    // POSITION CONTEXT => Gives access to mouse coordinates, updates on mouse movement
    const mousePos = useContext(PositionContext);
    const [bDragging, setDragging] = useState(false);
    const [bMinimized, setMinimized] = useState(false);
    const [prevPos, setPrevPos] = useState({ x: props.pos.x, y: props.pos.y});
    const [pos, setPos] = useState({ x: props.pos.x, y: props.pos.y});

    var element = document.getElementById(props.title);

    const handleMouseDown = (e) => {
        e.preventDefault();
        // NEEDS WORK: Proposed change, use another context provider to increment an index constantly starting from 10 to give room for other elements and ending at 2,000,000 before looping. 
        // prevents int overflow and saves updating an array/object with window zindexs
        // Context/Provider should originate in WindowManager and might require it to pass a function into children and return the data. 
        // That way when a window is clicked it can run the provided function, incrementing the index and then setting it on the target
        // ISSUES: the current proposed idea doesnt handle for what to do after a window has been moved and may require some extra logic in WindowManager that makes storing an object worth while
        element.parentElement.parentElement.style.zIndex = 99;
        setPrevPos({ x: mousePos.x, y: mousePos.y});
        setDragging(true);
    }

    const handleMouseUp = (e) => {
        e.preventDefault();
        // SEE COMMENT IN handleMouseDown
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
        setMinimized(!bMinimized)
    }

    useEffect(()=> {
        if (bDragging) {
            handleMouseMove()
        }
    }, [mousePos, bDragging])

    return (
    <div
        className={`window $bMinimized ? 'minimized' : ''}`}
        style={{ position: "absolute", top: `${pos.y}px`, left: `${pos.x}px`}}
    >
        <div className="window-border" style={{height: "150px", width: "150px"}}>
            <div className="window-header" 
                id={props.title}
                onMouseDown={handleMouseDown} 
                onMouseUp={handleMouseUp} 
            >
                <span className="unselectable">{props.title}</span>
                <section>
                    <button className="unselectable" aria-label={"Minimize " + props.title} onClick={handleMinimize}></button>
                </section>
            </div>
            {props.children}
        </div>
    </div>
  )
}

export default WindowFrame
