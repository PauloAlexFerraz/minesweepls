import React from 'react';
import Cell from '../cells/cell.js';


const Row = ({ cells, open, flag }) => {    
  return (
    <div className="row">
      {cells.map((cell) => (    //map é utilizado para iterar no array de cells 
        <Cell key={cell.x} cell={cell} open={open} flag={flag} />   //cada célula um componente Cell é renderizado com a chave key definida como cell.x e cell, open e flag são passadas  como props
      ))}
    </div>
  );
};

export default Row;
