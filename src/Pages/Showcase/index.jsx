import './showcase.css'
import WindowProducer from '../../Components/MovableWindow/WindowProducer'


const Showcase = () => WindowProducer([
    {
        title: "Random Title",
        content: "Welcome to IR Freelance",
        col: 1,
        row: 1
    },
    {
        title: "Test",
        content: "Welcome to IR Freelance",
        col: 2,
        row: 1
    },
    {
        title: "Showcase",
        content: "Welcome to IR Freelance",
        col: 1,
        row: 2
    },
    {
        title: "Showcase 1",
        content: "Welcome to IR Freelance",
        col: 2,
        row: 2,
        img: "",
    }
], 2, 2, "showcase")


export default Showcase;