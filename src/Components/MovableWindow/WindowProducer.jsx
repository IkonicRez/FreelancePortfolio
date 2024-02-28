import { useEffect, useCallback, useContext, useState } from 'react'
import { WindowManagerContext } from './WindowManager/context/WindowManagerContext'


// This is what we use to create pages. This can be passed an array of the windows data and will run the necessary event to generate them.
const WindowProducer = (data, title) => {
    
    const [bInitialized, setInitialized] = useState(false);
    const {_, windows, dispatchCallbackEvent} = useContext(WindowManagerContext)

    // Will only re run if data is changed. This could allow for windows to be added and removed dynamically later with some more work.
    // Mainly used as a way to trigger inside useEffect without looping due to the bInitialized state.
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

export default WindowProducer