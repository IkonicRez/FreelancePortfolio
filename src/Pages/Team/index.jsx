import React from 'react'
import { WindowFrame } from '../../Components'

const normalize = (val, max, min) => { return (val - min) / (max - min) }

export default function Team() {

    const getPosition = (x, y, row, column, gap) => {
        // done: ratio of window size to 1920x1080 (1.2)
        // done: apply ratio to x, y and gap to ensure scaling
        // todo: FUNCTION STILL NEEDS A GOOD WAY TO RERUN ON RESCALE
        var winSize = {x: normalize(window.innerWidth, 1920, 0), y: normalize(window.innerHeight, 927, 0)}
        x = x * winSize.x
        y = y * winSize.y
        return {
            x: x + (column * (gap * winSize.x)),
            y: y + (row * (gap * winSize.y))
        }
    }

    return (
        <div className='window-area'>
            <WindowFrame title="Random Title">
                <p style={{margin: 0}}>Welcome to IR Freelance</p>
            </WindowFrame>
            <WindowFrame title="Test">
                <p style={{margin: 0}}>Welcome to IR Freelance</p>
            </WindowFrame>
            <WindowFrame title="Showcase">
                <p style={{margin: 0}}>Welcome to IR Freelance</p>
            </WindowFrame>
            <WindowFrame title="Showcase 1">
                <p style={{margin: 0}}>Welcome to IR Freelance</p>
            </WindowFrame>
        </div>
    )
}