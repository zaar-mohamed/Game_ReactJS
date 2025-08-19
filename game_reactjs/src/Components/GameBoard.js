import React, { useEffect, useState } from 'react';
import GameCircle from './Gamecircle';

export default function GameBoard(){
  // Create an array of 16 circles  
  const [circles,setcircles]= useState([]);
  const [Player1Score,setPlayer1Score]=useState(0);
  const [Player2Score,setPlayer2Score]=useState(0);
  const [currentPlayer,setcurrentPlayer]=useState(1);
  const [gamefinshed,setgamefinished]=useState(false);

  // initialing ids of circles
  useEffect(()=>{
    const RandomIds=Array.from({length:16},()=>Math.floor(Math.random()*1000));
    console.log(RandomIds);
    setcircles(RandomIds)
  },[])

  // check if the game is finished
  useEffect(()=>{
    if(Player1Score + Player2Score === 16){
      setgamefinished(true);
    }
  },[Player1Score,Player2Score]);


  const handleCircleClick=(id,isColored)=>{

    if (isColored || gamefinshed) return;// to prevent clicking if the circle has already been colored

    const isEven = id % 2 ===0;
    // update scores
    if(currentPlayer === 1){
      if(isEven) {setPlayer1Score(prevScore=>prevScore +  1)}
    }
    else{
      if (!isEven) {setPlayer2Score(prevScore=>prevScore + 1);}
    }

    // swithch players
    setcurrentPlayer(current=>current === 1 ? 2 : 1);

    debugger;
  }
  // determiiine the winner
  const Winner = () => {
    if (Player1Score > Player2Score) return "Player 1 Wins the game!";
    if (Player2Score > Player1Score) return "Player 2 Wins the game!";
    return "It's a draw!";
  };
  return(
    <>
    <div >
      <h1>Current Player : {currentPlayer}</h1>
      <h2>Player 1 Score  : {Player1Score} </h2>
      <h2>Player 2 Score : {Player2Score} </h2>
      {gamefinshed && (
        <h2> {Winner()} </h2>
      )}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gridTemplateRows:"repeat(4,1fr)",gap:"10px",width:"auto",height:"auto",margin:"auto",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
    {circles.map((id,index)=>(<GameCircle id={id} key={index}  handleClick={handleCircleClick} 
    currentPlayer={currentPlayer}/>))}
    </div>
    </>
    
  )
}