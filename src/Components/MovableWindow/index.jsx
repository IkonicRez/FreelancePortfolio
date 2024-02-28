import React, { useEffect, useCallback, useContext, useState } from 'react'
import { WindowManagerContext } from './WindowManager/context/WindowManagerContext'

const WindowPage = (data, title) => {
    
    const [bInitialized, setInitialized] = useState(false);
    const {_, windows, dispatchCallbackEvent} = useContext(WindowManagerContext)

    const initDispatch = useCallback(() => {
        dispatchCallbackEvent(
            {
                type:"initialize", 
                data: data,
                title: title
            }
        )
        setInitialized(true)
    }, [dispatchCallbackEvent, data])

    useEffect(() => {
        if (!bInitialized) initDispatch()
    }, [initDispatch, bInitialized])

}

export default WindowPage