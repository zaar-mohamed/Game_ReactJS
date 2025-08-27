import React, { useState } from 'react';
export default function StatGame(){

  const [player1name,setplayer1name]=useState("");
  const [player2name,setplayer2name]=useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const onclick=()=>{
    if(player1name && player2name){
      setGameStarted(true)
    }
    else(
      alert("please entre both names")
    )
  }
  return(
    <>
    <div className="container">
      <h1 className="text-center">Start Game</h1>
      <label>Entre Player 1 Name</label>
      <input type="text" value={player1name} name='player1' onChange={e=>setplayer1name(e.target.value)} />

       <label>Entre Player 2 Name</label>
      <input type="text" value={player2name} name='player2' onChange={e=>setplayer2name(e.target.value)} />
      <button onClick={onclick}>Start The Game</button>
    </div>
    </>
  )
}