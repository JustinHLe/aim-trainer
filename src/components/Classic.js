import './classic.css'
import { useState, useEffect, useRef } from 'react';

function Classic (){
    const [hit, setHit] = useState(0)
    const [count, setCount] = useState(0)
    const [timer, setTimer] = useState()
    const [end, setEnd] = useState(false)
    const [start, setStart] = useState(false)
    const [form, setForm] = useState(false)
    const [restart, setRestart] = useState()
    const [viewList, setViewList] = useState(false)
    const [user, setUser] = useState({username: '', game_type: 'Classic', score: 0, submitted: ''})
    const [topUsers, setTopUsers] = useState([])
    const backButton = useRef(null)
    const square = useRef(null)
    const hitSound = new Audio("/hit.wav")
    useEffect(()=>{
        const gameContainer = document.getElementById("game-container")
        const height = gameContainer.offsetHeight
        const width = gameContainer.offsetWidth
        square.current.style.top = (Math.random() * (height - 100)) + "px";
        square.current.style.left = (Math.random() * (width - 100)) + "px";
    },[])
    useEffect(()=>{
        if (restart === undefined || restart === true){
            var t = setInterval(moveSquare, 750)
            setTimer(t)
            setRestart(false)
        }
        return () => {
            console.log("clean up")
            clearInterval(timer)
        }
    },[restart])
    useEffect(()=>{
        if (count === 100){
            setEnd(true)
            clearInterval(timer)
        }
    },[count])
    function handleHit(){
        hitSound.play()
        setHit(hit+1)
        moveSquare()
        clearInterval(timer)
        var t = setInterval(moveSquare, 750)
        setTimer(t)
    }
    function moveSquare(){
        //everytime state is updated the component is rerendered so count will always be 0
        //in order to use the previousCount we need to pass a function that passes in the previousCount to increment
        setCount(prevCount => prevCount + 1)
        const gameContainer = document.getElementById("game-container")
        const height = gameContainer.offsetHeight
        const width = gameContainer.offsetWidth
        square.current.style.top = (Math.random() * (height - 100)) + "px";
        square.current.style.left = (Math.random() * (width - 100)) + "px";
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
    async function viewScores(){
        setForm(true)
        setViewList(true)
        const topScorers = await fetch('http://localhost:8081/getTopUsers', {
            method: 'GET'
        }).then(res => {
            return res.json()
        }).then(data => setTopUsers(data))
    }
    async function resetForm(){
        console.log(user)
        const newUser = await fetch('http://localhost:8081/create', {
            method: 'POST',
            //pass additional content to server with the HTTP request to clarify communication between client and server
            headers: {
                //content type tells it what type of resource
                'Content-Type': 'application/json',
                //specifies what content the client is able to understand
                'Accept': 'application/json'
            },
            //converts javascript object to JSON string { x: 5, y: 6 } -> "{"x":5,"y":6}"
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        setUser({username: '', game_type: 'Classic', score: 0, submitted: ''})
        backButton.current.click()
        console.log(newUser)
    }
    function handleChange(e){
        setUser({
            username: e.target.value,
            game_type: 'Classic',
            score: hit,
        })
    }
    return (
        <>
        <section className='game-section'>
            <div className='counter'>
                {hit}
            </div>
            <div className='game-container' id = "game-container">
                <div className={count === 100 ? null : "square"} id = "square"  ref = {square} onClick={handleHit}></div>
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
                    {/* <span className='modal-container-span'>Choose a Mode</span> */}
                </>
                :
                <>
                    {!viewList ? 
                        <>
                            <span className='back-btn' onClick={()=>setForm(false)} ref={backButton}>Back</span>
                            <input className='input-field' placeholder='Enter your name' onChange={handleChange}></input>
                            <input className='submit-btn' type="submit" onClick={()=>resetForm()}></input>
                        </>
                    :
                        <>
                            <span className='back-btn' onClick={()=>setForm(false)}>Back</span>
                            {topUsers.map((item,i)=> {
                                return (
                                    <>
                                        <div key={i} className='scorers'>{i+1}. {item.username} {item.score}</div>
                                    </>
                                )
                            })}
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