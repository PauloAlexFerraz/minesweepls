import React from 'react'

const Boardhead = (props) => {

    let minutes = Math.floor(props.time / 60);
    let seconds = props.time - minutes * 60 || 0;

    var formseconds = seconds < 10 ? `0${formseconds}` : seconds; // formseconds erro ns pq o "let" tambem da erro, nao sei o que é diz que esta a ser chamada antes de ser definidas

    let time = `${seconds}`;



    return (
        <div className='boardhead'>

            <div className='flagcount'>{props.flagcount}</div>

            <button className='reset' onClick={props.reset}> Reset </button>

            <div className='timer'>{time}</div>

        </div>
        

    );
};

export default Boardhead;