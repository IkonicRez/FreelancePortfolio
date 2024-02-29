import './team.css'
import WindowProducer from '../../Components/MovableWindow/WindowProducer'


const Team = () => WindowProducer([
    {
        title: "Callum",
        content: "Partner, Head of Programming and Optimization",
        col: 1,
        row: 1
    },
    {
        title: "Michael",
        content: "Partner, Head of Project Management and Communication, Full Stack Development",
        col: 2,
        row: 1
    },
    {
        title: "Ceasar",
        content: "VFX, Graphic Designer, Web Designer",
        col: 1,
        row: 2
    }
], 2, 2, "team")


export default Team;