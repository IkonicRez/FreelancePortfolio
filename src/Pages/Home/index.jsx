import WindowFrame from "../../Components/MovableWindow/WindowFrame";


export default function Team() {

    return (
        <div>
            <WindowFrame 
                title="Welcome" 
                centered={true}
                size={{width: 800, height: 400}}
                pos={{
                    x: window.innerWidth / 2, 
                    y: window.innerHeight / 2}}
            />
        </div>
    )
}