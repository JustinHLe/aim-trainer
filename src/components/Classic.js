import './classic.css'
import { useState, useEffect } from 'react';


function Classic (){
    const [hit, setHit] = useState(0)
    var intervalInProgress = false
    var timer = null
    useEffect(()=>{
        timer = setInterval(moveSquare, 2000)
    },[])
    function handleHit(){
        setHit(hit+1)
        resetSquare()
    }
    function resetSquare(){
        moveSquare()
        clearInterval(timer)
        timer = setInterval(moveSquare, 2000)
    }

    function moveSquare(){
        if (intervalInProgress){
            return 
        } else {
            const gameContainer = document.getElementById("game-container")
            const height = gameContainer.offsetHeight
            const width = gameContainer.offsetWidth
            const square = document.getElementById("square")
            square.style.top = (Math.random() * (height - 100)) + "px";
            square.style.left = (Math.random() * (width - 100)) + "px";
        }
    }
    return (
        <>
        <section className='game-section'>
            <div>
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