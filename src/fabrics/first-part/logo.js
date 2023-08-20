import logotype from '../../assets/img/rombhus.webp';

function Logo() {
    return(
      <div className="logo mb-10">
        <img src={ logotype } alt="Rombhus" />
      </div>
    );
  }

export { Logo }