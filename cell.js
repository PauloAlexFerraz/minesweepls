import React from 'react';

const Cell = ({ cell, open, flag }) => {
  const handleClick = () => {
    open(cell);
  };

  const handleRightClick = (event) => {
    event.preventDefault(); // Previne o menu de contexto padrão do navegador
    flag(cell);
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

