import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "../components/Input";
import { withApiProgress } from "../api/ApiProgress";
import { useDispatch } from "react-redux";
import { signupHandler } from "../redux/authActions";

const SignUpPage = props => {

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [formObj, setFormObj] = useState({
    username: null,
    firstName: null,
    lastName: null,
    password: null,
    confirmPassword: null,
    pendingApiCall: false,
    apiErrors: {},
  });


  const onChange = (event) => {
    const { name, value } = event.target; //object destructuring
    const errors = { ...formObj.apiErrors };
    errors[name] = undefined;
    setFormObj({
      ...formObj,
      [name]: value,
      apiErrors: errors,
    });
  };

  const onClickSignUp = async (event) => {
    event.preventDefault();

    const { push } = props.history;
    const { username, firstName, lastName, password } = formObj;
    const user = { username, firstName, lastName, password }; // k,v aynı olduğu için

    try {
      const response = await dispatch(signupHandler(user));
      push('/');
    } catch (error) {
      if (error.response.data.validationError) {
        setFormObj({ ...formObj, apiErrors: error.response.data.validationError });
      }
    }
  };


  const { pendingApiCall } = props;

  return (
    <div className="container">
      <form>
        <Input error={formObj.apiErrors.username} label={t("Username")} name="username" onChange={e => onChange(e)} />

        <Input error={formObj.apiErrors.firstName} label={t("First Name")} name="firstName" onChange={e => onChange(e)} />

        <Input error={formObj.apiErrors.lastName} label={t("Last Name")} name="lastName" onChange={e => onChange(e)} />

        <Input error={formObj.apiErrors.password} label={t("Password")} name="password" type="password" onChange={e => onChange(e)} />

        <Input error={false} label="Confirm Password" name="confirmpassword" type="password" onChange={e => onChange(e)} />

        <div>
          <button className="btn btn-primary" disabled={pendingApiCall} onClick={onClickSignUp}>
            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
            Sign Up
          </button>
        </div>
      </form>

    </div>
  );

}

const SignUpPageWithApiProgressForSignUp = withApiProgress(SignUpPage, '/api/users');
export default withApiProgress(SignUpPageWithApiProgressForSignUp, '/api/auth');
