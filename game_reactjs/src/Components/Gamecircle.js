// import React, { useState } from 'react';
// import "./circle.css";
// export default function GameCircle({id,handleClick,currentPlayer}){

//   const [color,setcolor]=useState('');
//   const [isColored,setIsColored]=useState(false);

//  // change className based on id
//   function handleCircleClicked(){
//     if (isColored) {alert("alreaddy colored ") ;return};

//     setcolor(id % 2===0 ? 'green': 'blue');
//     setIsColored(true);

//     handleClick(id,true);


//   }
//   return(
//     <>
//     <div className="game-circles" style={{backgroundColor:color,cursor : isColored ? "default" : "pointer"}}   onClick={handleCircleClicked}></div>
//     </>
//   )
// }

import React from 'react';
import "./circle.css";

export default function GameCircle({ id, isColored, onClick }) {
  const color = id % 2 === 0 ? 'green' : 'blue';

  return (
    <div
      className="game-circles"
      style={{
        backgroundColor: isColored ? color : '',
        cursor: isColored ? 'default' : 'pointer'
      }}
      onClick={isColored ? undefined : onClick}
    />
  );
}