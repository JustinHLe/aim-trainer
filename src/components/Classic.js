import './classic.css'
import { useState, useEffect } from 'react';

function Classic (){
    const [hit, setHit] = useState(0)
    const [count, setCount] = useState(0)
    const [timer, setTimer] = useState()
    const [end, setEnd] = useState(false)
    const [form, setForm] = useState(false)
    const [restart, setRestart] = useState()
    const [viewList, setViewList] = useState(false)
    const hitSound = new Audio("/hit.wav")
    useEffect(()=>{
        console.log("run")
        if (restart === undefined || restart === true){
            var t = setInterval(moveSquare, 1000)
            setTimer(t)
            setRestart(false)
        }
        return () => {
            console.log("clean up")
            clearInterval(timer)
        }
    },[restart])
    useEffect(()=>{
        if (count === 5){
            setEnd(true)
            clearInterval(timer)
        }
    },[count])
    function handleHit(){
        hitSound.play()
        setHit(hit+1)
        moveSquare()
        clearInterval(timer)
        var t = setInterval(moveSquare, 1000)
        setTimer(t)
        //no need to declare another interval, the timer will always be called in the useEffect
    }
    function moveSquare(){
        //everytime state is updated the component is rerendered so count will always be 0
        //in order to use the previousCount we need to pass a function that passes in the previousCount to increment
        setCount(prevCount => prevCount + 1)
        const gameContainer = document.getElementById("game-container")
        const height = gameContainer.offsetHeight
        const width = gameContainer.offsetWidth
        const square = document.getElementById("square")
        square.style.top = (Math.random() * (height - 100)) + "px";
        square.style.left = (Math.random() * (width - 100)) + "px";
    }
    function resetGame(){
        setEnd(false)
        setHit(0)
        setCount(0)
        setRestart(true)
        setTimer()
    }
    function submitData(){
        setForm(true)
        setViewList(false)
    }
    function viewScores(){
        setForm(true)
        setViewList(true)
    }
    return (
        <>
        <section className='game-section'>
            <div className='counter'>
                {count}
                {hit}
            </div>
            <div className='game-container' id = "game-container">
                <div className={count === 5 ? null : "square"} id = "square" onClick={handleHit}></div>
            </div>
        </section>
        <div className={end ? 'modal-overlay' : 'hidden'} >
            <div className='modal-container'>
                {!form ? 
                <>
                    <h3 className='modal-container-header'>Game Over</h3>
                    <span className='modal-container-score'>Your Score {hit}</span>
                    <span className='modal-container-span' onClick={viewScores}>View High Scores</span>
                    <span className='modal-container-span' onClick={submitData}>Submit Score</span>
                    <span className='modal-container-span' onClick={resetGame}>Play Again</span>
                    <span className='modal-container-span'>Choose a Mode</span>
                </>
                :
                <>
                    {!viewList ? 
                        <>
                            <span className='back-btn' onClick={()=>setForm(false)}>Back</span>
                            <input className='input-field' placeholder='Enter your name'></input>
                            <input className='submit-btn' type="submit"></input>
                        </>
                    :
                        <>
                            <span className='back-btn' onClick={()=>setForm(false)}>Back</span>
                            <div>top scores</div>
                        </>
                
                }
                </>
                }
            </div>
        </div>
        </>
    )
}

export default Classic