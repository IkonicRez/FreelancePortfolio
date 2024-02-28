import React, { useState, useEffect } from 'react'


const WindowMinimizer = (props) => {

    const [showScrollbar, setShowScrollbar] = useState(false)

    // ADDING A USE EFFECT DEPEND ARRAY WILL BREAK THIS. A GOOD WAY TO TRIGGER THIS IS REQUIRED BEFORE ADDING A DEPEND LIST
    // eslint-disable-next-line
    useEffect(() => {
        const minimizer = document.getElementsByClassName("window-minimizer")[0]
        if (minimizer !== undefined) setShowScrollbar(minimizer.scrollWidth > window.innerWidth)
    })

    return (
        <div className="window-minimizer-container">
            <div className={`window-minimizer ${showScrollbar}`}>
                {props.children}
            </div>
            <div className={`window-minimizer-scrollbar-container ${showScrollbar}`} aria-label="Container used to create space for the scrollbar"></div>
        </div>
    )

} 

export default WindowMinimizer