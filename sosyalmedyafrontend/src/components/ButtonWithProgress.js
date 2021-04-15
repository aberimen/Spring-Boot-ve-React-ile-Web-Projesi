
const ButtonWithProgress = (props) => {
    const {disabled,onClick , pendingApiCall} = props;
    return (
        <button className="btn btn-primary" disabled={disabled} onClick={onClick} >
            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} Login
        </button>
    );

}

export default ButtonWithProgress;