function List( props ) {
    return(
      <div className="list-task">
        <ul>
          { props.children }
        </ul>
      </div>
    );
  }

export { List }