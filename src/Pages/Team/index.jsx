import './team.css'
import WindowPage from '../../Components/MovableWindow'


const Team = () => WindowPage([
    {
        title: "Callum",
        content: "Partner, Head of Programming and Optimization"
    },
    {
        title: "Mike",
        content: "Partner, Head of Project Management and Communication, Full Stack Development"
    },
    {
        title: "Ceasar",
        content: "VFX, Graphic Designer, Web Designer"
    }
], "team")


export default Team;