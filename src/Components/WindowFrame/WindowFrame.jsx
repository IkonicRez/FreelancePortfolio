import React, { useState} from 'react'
import "./window_frame.css"

const WindowFrame = (props) => {
    const [bDragging, setDragging] = useState(false);
    const [bMinimized, setMinimized] = useState(false);
    const [prevPos, setPrevPos] = useState({ x: props.pos.x, y: props.pos.y});
    const [pos, setPos] = useState({ x: props.pos.x, y: props.pos.y});
    console.log(pos)
    const handleMouseDown = (e) => {
        e.preventDefault();
        setPrevPos({x: e.clientX, y: e.clientY})
        setDragging(true)
    }

    const handleMouseUp = (e) => {
        e.preventDefault();
        setDragging(false)
    }

    const handleMouseMove = (e) => {
        e.preventDefault();
        if (bDragging) {
            let elem = document.getElementById(e.target.id)
            if (elem == null) return;
            console.log("prev:", prevPos)
            console.log("offset:", elem.offsetTop, elem.offsetLeft)
            let current = { 
                x: (elem.offsetLeft - (prevPos.x - e.clientX)), 
                y: (elem.offsetTop - (prevPos.y - e.clientY)) }
            setPos(current)
            console.log("current:", current)
        }
    }
    
    const handleMinimize = () => {
        setMinimized(!bMinimized)
    }

  return (
    <div
        className={`window $bMinimized ? 'minimized' : ''}`}
        style={{ position: "absolute", top: `${pos.y}px`, left: `${pos.x}px`}}
    >
        <div className="window-border" style={{height: "400px", width: "400px"}}>
            <div className="window-header" 
                id={props.title}
                onPointerDown={handleMouseDown} 
                onPointerUp={handleMouseUp} 
                onPointerLeave={handleMouseUp}
                onPointerMove={handleMouseMove}
            >
                <span className="unselectable">{props.title}</span>
                <section>
                    <button className="unselectable" onClick={handleMinimize}></button>
                </section>
            </div>
        </div>
    </div>
  )
}

export default WindowFrame
