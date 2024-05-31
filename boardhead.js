import React from 'react'

const Boardhead = (props) => {

    let minutes = Math.floor(props.time / 60);        //calcula os minutos 
    let seconds = props.time - minutes * 60 || 0;     // remove os minutos do tempo total e verifica os segundos restantes, se n houver segundos restantes define os segundos como 0

    var formseconds = seconds < 10 ? `0${seconds}` : seconds; // tentei corrigir não sei se deu

    let time = `${seconds}`;   // talvez isto n seja necessário isto cria uma string time com o valor dos segundos 



    return (
        <div className='boardhead'>

            <div className='flagcount'>{props.flagcount}</div>

            <button className='reset' onClick={props.reset}> Reset </button>

            <div className='timer'>{time}</div>

        </div>
        

    );
};

export default Boardhead;
