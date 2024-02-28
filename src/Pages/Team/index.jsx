import './team.css'
import WindowProducer from '../../Components/MovableWindow/WindowProducer'


const Team = () => WindowProducer([
    {
        title: "Callum",
        content: "Partner, Head of Programming and Optimization"
    },
    {
        title: "Michael",
        content: "Partner, Head of Project Management and Communication, Full Stack Development"
    },
    {
        title: "Ceasar",
        content: "VFX, Graphic Designer, Web Designer"
    }
], "team")


export default Team;