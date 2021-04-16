import React from 'react';
import { withRouter } from 'react-router';
//import { Authentication } from '../shared/AuthenticationContext';
import { connect } from 'react-redux';

const ProfileCard = props => {
    const pathUsername = props.match.params.username;
    const loggedInUsername = props.loggedInUsername;
    let message = " You cannot edit";
    if (pathUsername === loggedInUsername) {
        message = "You can edit";
    }
    return (
        <div>
            {message}
        </div>
    );
};

// class ProfileCardWrapper extends React.Component {
//     static contextType = Authentication;
//     render() {
//         return (
//             <div>
//                 <ProfileCard {...this.props} loggedInUsername={this.context.state.username} />
//             </div>
//         );
//     }
// }

// wrapper class yerine 
// <Authentication.Consumer> {value => } </Authentication.Consumer> yaklaşımını function component içinde kullanabilirdik
//redux kullanacağımız için AuthenticationContext'e artık ihtiyacımız yok.

const mapStateToProps = store => {  // redux state'i componente props olarak dönecek.
    return {loggedInUsername : store.username}; // redux storeden username bilgisini alıyoruz
}

const ProfileCardWithRouter = withRouter(ProfileCard);
export default connect(mapStateToProps)(ProfileCardWithRouter);