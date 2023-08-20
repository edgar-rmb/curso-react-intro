import loading from '../../assets/img/rombhus.gif';

function Empty() {
    return(
      <div className='message-empty'>
        <div className='loading'>
          <img src={ loading } alt="Cargando..."  width='100'/>
        </div>
        <span>Create Tasks</span>
      </div>
    );
}

export { Empty };