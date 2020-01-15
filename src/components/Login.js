import React from 'react';
//import io from 'socket.io-client';

class Login extends React.Component {
  render(){
    return(
        <div className="overall">
          <h1 className="login">Login</h1>
          <form onSubmit={this.props.onClick}>
            <input onChange={this.props.onChange} value={this.props.username}/>
            <button type="submit">Login</button>
          </form>
        </div>
    ) 
  }
}



export default Login;
