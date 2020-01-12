import React from 'react';
import Login from "./components/Login"
import Chat from "./components/Chat"
import io from 'socket.io-client';
import './App.css';

const socket = io('http://3.120.96.16:3000/');

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      login : true,
      username : "Matti",
      response : [],
      message : "",
      newMessage : [],
    }
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);

    this.onClickSend = this.onClickSend.bind(this);
    this.onChatInput = this.onChatInput.bind(this);
  }

  onClickSend(e){
    e.preventDefault();
    socket.emit("message", {username: this.state.username, content: this.state.message})
    this.state.response.push({
      username: this.state.username, 
      content: this.state.message, 
      id: this.state.message,
    })
    this.setState({message : ""})
  }

  onChatInput(e){
    this.setState({message : e.target.value})
  }

  onClick(e){
    this.setState({login : false})
    console.log(this.state.username);
  }

  onChange(e){
    this.setState({username : e.target.value})
  }

  componentDidMount() {
    socket.on('connect', function(){console.log("connected")});
    socket.on("messages", data => this.setState({response : data}))
    console.log(this.state.username)
    socket.on("new_message", (data) => {
      this.state.response.push(data)
      this.forceUpdate();
    })
  }

  render(){
    console.log(this.state.response);
    let login;
    if(this.state.login === true){
      login = <Login 
        username={this.state.username} 
        login={this.state.login}
        onChange={this.onChange}
        onClick={this.onClick}
        />
    }else{
      login = <Chat
        username={this.state.username}
        response={this.state.response}
        onClickSend={this.onClickSend}
        onChatInput={this.onChatInput}
        message={this.state.message}
        />
    }
    return (
      <div className="App">
          {login}
      </div>
    );
  }
}

export default App;
