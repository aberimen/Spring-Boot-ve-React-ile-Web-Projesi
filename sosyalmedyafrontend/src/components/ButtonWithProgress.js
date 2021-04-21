
const ButtonWithProgress = (props) => {
    const { disabled, onClick, pendingApiCall, text, className } = props;
    return (
        <button className={className || "btn btn-primary"} disabled={disabled} onClick={onClick} >
            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} {text}
        </button>
    );

}

export default ButtonWithProgress;