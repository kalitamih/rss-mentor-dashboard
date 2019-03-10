import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Drawing from './Drawing';
import './button.css';

firebase.initializeApp({
  apiKey: 'AIzaSyBJEDmqx_T5oLr4zyIkLN_hdT7BswaDrjQ',
  authDomain: 'rss-mentor-dashboard-c9bf6.firebaseapp.com',
});


class App extends Component {
  state = { isSignedIn: false }

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },

  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
    });
  }

  singOut = () => {
    firebase.auth().signOut();
    localStorage.removeItem('login');
  }

  render() {
    const { isSignedIn } = this.state;
    return (
      <div className="App">
        {isSignedIn ? (
          <div>
            <Drawing login={firebase.auth().currentUser.providerData[0].uid} />
            <button type="submit" onClick={() => this.singOut()} className="buttonSignOut">Sign out!</button>
          </div>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}


export default App;
