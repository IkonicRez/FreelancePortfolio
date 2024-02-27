import React, { useContext, useEffect, useCallback, useMemo, useState } from 'react'
import './team.css'
import { WindowManagerContext } from '../../Components/MovableWindow/WindowManager/context/WindowManagerContext'

export default function Team() {


    const {_, windows, dispatchCallbackEvent} = useContext(WindowManagerContext)

    const initDispatch = () => {
        console.log("init")
        dispatchCallbackEvent(
            {
                type:"initialize", 
                data: [
                    {
                        title: "Random Title",
                        content: "Welcome to IR Freelance"
                    },
                    {
                        title: "Test",
                        content: "Welcome to IR Freelance"
                    },
                    {
                        title: "Showcase",
                        content: "Welcome to IR Freelance"
                    },
                    {
                        title: "Showcase 1",
                        content: "Welcome to IR Freelance"
                    }
                ]
            }
        )

    }

    useEffect(() => {
        initDispatch()
    }, [])
    // return (
    //     <>
    //         {/* <WindowFrame title="Random Title">
    //             <p style={{margin: 0}}>Welcome to IR Freelance</p>
    //         </WindowFrame>
    //         <WindowFrame title="Test">
    //             <p style={{margin: 0}}>Welcome to IR Freelance</p>
    //         </WindowFrame>
    //         <WindowFrame title="Showcase">
    //             <p style={{margin: 0}}>Welcome to IR Freelance</p>
    //         </WindowFrame>
    //         <WindowFrame title="Showcase 1">
    //             <p style={{margin: 0}}>Welcome to IR Freelance</p>
    //         </WindowFrame> */}
    //     </>
    // )
}