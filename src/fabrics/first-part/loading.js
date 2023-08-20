import loading from '../../assets/img/rombhus.gif';

function Loading() {
    return(
      <div className='loading'>
        <img src={ loading } alt="Cargando..."  width='100'/>
      </div>
    );
}

export { Loading };
