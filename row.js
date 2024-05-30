import React from 'react';
import Cell from '../cells/cell.js';


const Row = ({ cells, open, flag }) => {
  return (
    <div className="row">
      {cells.map((cell) => (
        <Cell key={cell.x} cell={cell} open={open} flag={flag} />
      ))}
    </div>
  );
};

export default Row;