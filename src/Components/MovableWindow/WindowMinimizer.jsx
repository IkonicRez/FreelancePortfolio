import React, { useState, useEffect, useMemo, useRef, useCallback, useContext } from 'react'
import { WindowEventContext } from './WindowManager/context/WindowManagerContext'


const WindowMinimizer = (props) => {

    const [showScrollbar, setShowScrollbar] = useState(false)
    const dispatchCallbackEvent = useContext(WindowEventContext)

    useEffect(() => {
        const minimizer = document.getElementsByClassName("window-minimizer")[0]
        if (minimizer !== undefined) setShowScrollbar(minimizer.scrollWidth > window.innerWidth)
        
    })

    return (
        <div className="window-minimizer-container">
            <div className={`window-minimizer ${showScrollbar}`}>
                {props.children}
            </div>
            <div className={`window-minimizer-scrollbar-container ${showScrollbar}`}></div>
        </div>
    )

} 

export default WindowMinimizer