import React from "react";
import { signup} from "../api/apiCall";
import { withTranslation } from "react-i18next";
import Input from "../components/Input";
import { withApiProgress } from "../api/ApiProgress";

class SignUpPage extends React.Component {
  state = {
    username: null,
    firstName: null,
    lastName: null,
    password: null,
    confirmPassword: null,
    pendingApiCall: false,
    apiErrors: {},
  };

  //  onChangeUsername = (event)=>{
  //         this.setState({username:event.target.value})
  //     }
  // böyle her field için tek tek yapmaktansa aşağıdaki metod daha kısa çözüm

  onChange = (event) => {
    const { name, value } = event.target; //object destructuring
    const errors = { ...this.state.apiErrors };
    errors[name] = null;
    this.setState({
      [name]: value,
      apiErrors: errors,
    });
  };

  onClickSignUp = async (event) => {
    event.preventDefault();

    const { username, firstName, lastName, password } = this.state;

    const user = { username, firstName, lastName, password }; // k,v aynı olduğu için

    try {
      const response = await signup(user);
    } catch (error) {
      if (error.response.data.validationError) this.setState({ apiErrors: error.response.data.validationError });
    }
  };

 

  render() {
    const { pendingApiCall } = this.props;
    const { apiErrors } = this.state;
    const { username, firstName, lastName, password } = apiErrors;
    const { t } = this.props;
    return (
      <div className="container">
        <form>
          <Input error={username} label={t("Username")} name="username" onChange={this.onChange} />

          <Input error={firstName} label={t("First Name")} name="firstName" onChange={this.onChange} />

          <Input error={lastName} label={t("Last Name")} name="lastName" onChange={this.onChange} />

          <Input error={password} label={t("Password")} name="password" type="password" onChange={this.onChange} />

          <Input error={false} label="Confirm Password" name="confirmpassword" type="password" onChange={this.onChange} />

          <div>
            <button className="btn btn-primary" disabled={pendingApiCall} onClick={this.onClickSignUp}>
              {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
              Sign Up
            </button>
          </div>
        </form>
        
      </div>
    );
  }
}

const SignUpPageWithTranslations = withTranslation()(SignUpPage);
const SignUpPageWithApiProgress = withApiProgress(SignUpPageWithTranslations,'/api/users');
export default SignUpPageWithApiProgress;
