import React from 'react';

const Cell = ({ cell, open, flag }) => {   //recebe cell,open e flag
  const handleClick = () => {   //chamada quando a célula for clicada 
    open(cell);     //abre a célula passada por argumento
  };

  const handleRightClick = (event) => {  // chamada quando o botão direito do rato for clicado
    event.preventDefault(); // Previne o menu de contexto padrão do navegador
    flag(cell);   //coloca na cell passada por argumento uma flag
  };

  return (
    <div
      className={`cell ${cell.isOpen ? 'open' : ''} ${cell.hasFlag ? 'flag' : ''}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {cell.isOpen && !cell.hasMine && cell.count > 0 ? cell.count : ''}
      {cell.isOpen && cell.hasMine ? '💣' : ''}
      {!cell.isOpen && cell.hasFlag ? '🚩' : ''}
    </div>
  );
};

export default Cell;

