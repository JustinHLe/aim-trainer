import './classic.css'
import { useState, useEffect } from 'react';


function Classic (){
    const [hit, setHit] = useState(0)
    var timer = null
    const hitSound = new Audio("/hit.wav")
    useEffect(()=>{
        clearInterval(timer)
        timer = setInterval(moveSquare, 1000)
    },[hit])
    function handleHit(){
        hitSound.play()
        setHit(hit+1)
        resetSquare()
    }
    function resetSquare(){
        clearInterval(timer)
        moveSquare()
    }

    function moveSquare(){
        const gameContainer = document.getElementById("game-container")
        const height = gameContainer.offsetHeight
        const width = gameContainer.offsetWidth
        const square = document.getElementById("square")
        square.style.top = (Math.random() * (height - 100)) + "px";
        square.style.left = (Math.random() * (width - 100)) + "px";
    }
    return (
        <>
        <section className='game-section'>
            <div className='counter'>
                {hit}
            </div>
            <div className='game-container' id = "game-container">
                <div className="square" id = "square" onClick={handleHit}></div>
            </div>
        </section>
        </>
    )
}

export default Classic