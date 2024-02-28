import './showcase.css'
import WindowPage from '../../Components/MovableWindow'


const Showcase = () => WindowPage([
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
        content: "Welcome to IR Freelance",
        img: "",
    }
], "showcase")


export default Showcase;