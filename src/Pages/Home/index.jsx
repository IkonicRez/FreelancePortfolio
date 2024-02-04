import WindowFrame from "../../Components/MovableWindow/WindowFrame";

const normalize = (val, max, min) => { return (val - min) / (max - min) }

export default function Team() {
    const getPosition = (x, y, row, column, gap) => {
        // done: ratio of window size to 1000x800 (1.2)
        // done: apply ratio to x, y and gap to ensure scaling
        // todo: FUNCTION STILL NEEDS A GOOD WAY TO RERUN ON RESCALE
        var winSize = {x: normalize(window.innerWidth, 1000, 0), y: normalize(window.innerHeight, 800, 0)}
        x = x * winSize.x
        y = y * winSize.y
        return {
            x: x + (column * (gap * winSize.x)),
            y: y + (row * (gap * winSize.y))
        }
    }


    return (
        <div>
            <WindowFrame 
                title="Welcome" 
                centered={true}
                size={{width: 800, height: 400}}
                pos={getPosition(150, 100, 0, 0, 0)}
            />
        </div>
    )
}