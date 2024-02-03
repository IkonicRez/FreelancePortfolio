import React from 'react'
import { WindowFrame } from '../../Components'

export default function Team() {
    return (
        <div>
            <WindowFrame title="Random Title" pos={{x: (window.innerWidth / 6) * 1, y: 200}}>
                <p style={{margin: 0}}>Welcome to IR Freelance</p>
            </WindowFrame>
            <WindowFrame title="Test" pos={{x: window.innerWidth/6 * 3, y: 200}}>
                <p style={{margin: 0}}>Welcome to IR Freelance</p>
            </WindowFrame>
            <WindowFrame title="Showcase" pos={{x: window.innerWidth/6 * 3, y: 200}}>
                <p style={{margin: 0}}>Welcome to IR Freelance</p>
            </WindowFrame>
        </div>
    )
}