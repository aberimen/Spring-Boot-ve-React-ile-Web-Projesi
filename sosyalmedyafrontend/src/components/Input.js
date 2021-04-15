import React from 'react';
const Input = (props) => {
    const {label,error,name,onChange,type} = props;

    return (
        <div className="form-group">
            <label>{label}</label>
            <input className={props.error ? "form-control is-invalid" : "form-control"} name={name} type={type} onChange={onChange} />
            <div className="invalid-feedback">{error}</div>
        </div>
    )


}


export default Input;