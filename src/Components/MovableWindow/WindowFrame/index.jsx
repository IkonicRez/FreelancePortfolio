import React, { useState, useEffect } from 'react'
import "./window_frame.css"
import { useContext } from "react";
import { PositionContext } from "../WindowManager/context/PositionContext";

const WindowFrame = (props) => {
    const mousePos = useContext(PositionContext);
    const [bDragging, setDragging] = useState(false);
    const [bMinimized, setMinimized] = useState(false);
    const [prevPos, setPrevPos] = useState({ x: props.pos.x, y: props.pos.y});
    const [pos, setPos] = useState({ x: props.pos.x, y: props.pos.y});
    var element = document.getElementById(props.title);

    const handleMouseDown = (e) => {
        e.preventDefault();
        element.parentElement.parentElement.style.zIndex = 99;
        console.log("Pointer Down")
        setPrevPos({ x: mousePos.x, y: mousePos.y})
        setDragging(true)
    }

    const handleMouseUp = (e) => {
        e.preventDefault();
        console.log("Pointer Up")
        element.parentElement.parentElement.style.zIndex = "auto";
        setDragging(false)
    }

    const handleMouseMove = () => {
        console.log("Pos:", pos)
        console.log("prev:", prevPos, mousePos)
        console.log("Difference: ", {x:  (prevPos.x - mousePos.x), y: (prevPos.y - mousePos.y)})
        console.log("offset:", element.offsetTop, element.offsetLeft)
        setPos(
            { x: (pos.x - (prevPos.x - mousePos.x)), 
              y: (pos.y - (prevPos.y - mousePos.y)) }
        )
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
        <div className="window-border" style={{height: "400px", width: "400px"}}>
            <div className="window-header" 
                id={props.title}
                onMouseDown={handleMouseDown} 
                onMouseUp={handleMouseUp} 
            >
                <span className="unselectable">{props.title}</span>
                <section>
                    <button className="unselectable" onClick={handleMinimize}></button>
                </section>
            </div>
            {props.children}
        </div>
    </div>
  )
}

export default WindowFrame
