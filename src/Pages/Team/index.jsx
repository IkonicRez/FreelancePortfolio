import React from 'react'
import { WindowFrame } from '../../Components'

const normalize = (val, max, min) => { return (val - min) / (max - min) }

export default function Team() {

    const getPosition = (x, y, row, column, gap) => {
        // done: ratio of window size to 1920x1080 (1.2)
        // done: apply ratio to x, y and gap to ensure scaling
        // todo: FUNCTION STILL NEEDS A GOOD WAY TO RERUN ON RESCALE
        var winSize = {x: normalize(window.innerWidth, 1920, 0), y: normalize(window.innerHeight, 1080, 0)}
        x = x * winSize.x
        y = y * winSize.y
        return {
            x: x + (column * (gap * winSize.x)),
            y: y + (row * (gap * winSize.y))
        }
    }

    return (
        <div>
            <WindowFrame 
                title="Random Title" 
                pos={getPosition(25, 300, 0, 0, 250)}
            >
                <p style={{margin: 0}}>Welcome to IR Freelance</p>
            </WindowFrame>
            <WindowFrame 
                title="Test" 
                pos={getPosition(25, 300, 0, 1, 250)}
            >
                <p style={{margin: 0}}>Welcome to IR Freelance</p>
            </WindowFrame>
            <WindowFrame 
                title="Showcase" 
                pos={getPosition(25, 300, 0, 2, 250)}
            >
                <p style={{margin: 0}}>Welcome to IR Freelance</p>
            </WindowFrame>
            <WindowFrame 
                title="Showcase 1" 
                pos={getPosition(25, 300, 0, 3, 250)}
            >
                <p style={{margin: 0}}>Welcome to IR Freelance</p>
            </WindowFrame>
        </div>
    )
}