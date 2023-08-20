import eyeHidden from '../../assets/img/eye-hidden.svg';
import eye from '../../assets/img/eye.svg';
function Hidden(props) {
    return (
        <div className={`hidden ${props.visible && 'completed'}`} onClick={props.toggleVisibility}>
            <img src={props.visible ? eyeHidden : eye} alt='Toggle visibility' />
            <span>{props.visible ? 'Hide completed tasks' : 'Show completed tasks'}</span>
        </div>
    );
}

export { Hidden }
