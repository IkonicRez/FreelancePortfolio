import './showcase.css'
import WindowProducer from '../../Components/MovableWindow/WindowProducer'


const Showcase = () => WindowProducer([
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