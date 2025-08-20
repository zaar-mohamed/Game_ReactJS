// import React, { useEffect, useState } from 'react';
// import GameCircle from './Gamecircle';

// export default function GameBoard(){
//   // Create an array of 16 circles  
//   const [circles,setcircles]= useState([]);
//   const [Player1Score,setPlayer1Score]=useState(0);
//   const [Player2Score,setPlayer2Score]=useState(0);
//   const [currentPlayer,setcurrentPlayer]=useState(1);
//   const [gamefinshed,setgamefinished]=useState(false);

//   // initialing ids of circles
//   useEffect(()=>{
//     const RandomIds=Array.from({length:16},()=>Math.floor(Math.random()*1000));
//     console.log(RandomIds);
//     setcircles(RandomIds)
//   },[])

//   // check if the game is finished
//   useEffect(()=>{
//     if(Player1Score + Player2Score === 16){
//       setgamefinished(true);
//     }
//   },[Player1Score,Player2Score]);


//   const handleCircleClick=(id,isColored)=>{

//     if (isColored || gamefinshed) return;// to prevent clicking if the circle has already been colored

//     const isEven = id % 2 ===0;
//     // update scores
//     if(currentPlayer === 1){
//       if(isEven) {setPlayer1Score(prevScore=>prevScore +  1)}
//     }
//     else{
//       if (!isEven) {setPlayer2Score(prevScore=>prevScore + 1);}
//     }

//     // swithch players
//     setcurrentPlayer(current=>current === 1 ? 2 : 1);

//     // debugger;
//   }
//   // determiiine the winner
//   const Winner = () => {
//     if (Player1Score > Player2Score) return "Player 1 Won the game!";
//     if (Player2Score > Player1Score) return "Player 2 Won the game!";
//     return "It's a draw!";
//   };
//   return(
//     <>
//     <div >
//       <h1>Current Player : {currentPlayer}</h1>
//       <h2>Player 1 Score  : {Player1Score} </h2>
//       <h2>Player 2 Score : {Player2Score} </h2>
//       {gamefinshed && (
//         <h2> {Winner()} </h2>
//       )}
//     </div>

//     <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gridTemplateRows:"repeat(4,1fr)",gap:"10px",width:"auto",height:"auto",margin:"auto",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
//     {circles.map((id,index)=>(<GameCircle id={id} key={index}  handleClick={handleCircleClick} 
//     currentPlayer={currentPlayer}/>))}
//     </div>
//     </>
    
//   )
// }

import React, { useEffect, useMemo, useState } from 'react';
import GameCircle from './Gamecircle';

export default function GameBoard() {
  // Create 16 ids once
  const circles = useMemo(
    () => Array.from({ length: 16 }, () => Math.floor(Math.random() * 1000)),
    []
  );

  // Track which circles are colored (true/false)
  const [colored, setColored] = useState(() => Array(16).fill(false));
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameFinished, setGameFinished] = useState(false);

  // End game when all are colored
  useEffect(() => {
    if (colored.every(c => c)) {
      setGameFinished(true);
    }
  }, [colored]);

  const handleCircleClick = (index) => {
    if (gameFinished || colored[index]) return;

    const id = circles[index];
    const isEven = id % 2 === 0;

    // Color the circle regardless of who clicked
    setColored(prev => {
      const copy = prev.slice();
      copy[index] = true;
      return copy;
    });

    // Score only if current player matches parity
    if (currentPlayer === 1 && isEven) {
      setPlayer1Score(s => s + 1);
    } else if (currentPlayer === 2 && !isEven) {
      setPlayer2Score(s => s + 1);
    }

    // Switch player
    setCurrentPlayer(p => (p === 1 ? 2 : 1));
  };

  const winnerText = () => {
    if (player1Score > player2Score) return "Player 1 Won the game!";
    if (player2Score > player1Score) return "Player 2 Won the game!";
    return "It's a draw!";
    };

  return (
    <>
      <div>
        <h1>Current Player: {currentPlayer}</h1>
        <h2>Player 1 Score: {player1Score}</h2>
        <h2>Player 2 Score: {player2Score}</h2>
        {gameFinished && (<h2>{winnerText()}</h2>)}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          width: "auto",
          height: "auto",
          margin: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        {circles.map((id, index) => (
          <GameCircle
            key={`${id}-${index}`}
            id={id}
            isColored={colored[index]}
            onClick={() => handleCircleClick(index)}
          />
        ))}
      </div>
    </>
  );
}