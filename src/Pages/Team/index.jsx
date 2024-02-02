import React from 'react'
import './team.css'
import { WindowFrame } from '../../Components'
export default function Team() {
    return (
        <div>
            <WindowFrame title="Random Title" pos={{x: window.innerWidth/2, y: window.innerHeight / 2}}/>
        </div>
    )
}