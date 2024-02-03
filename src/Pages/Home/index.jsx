import WindowFrame from "../../Components/MovableWindow/WindowFrame";


export default function Team() {
    return (
        <div>
            <WindowFrame 
                title="Welcome" 
                pos={{
                    x: (window.innerWidth / 2), 
                    y: (window.innerHeight / 2) }}
                size={{width: 800, height: 400}}
            />
        </div>
    )
}