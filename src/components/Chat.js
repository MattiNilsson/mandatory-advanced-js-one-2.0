import React from 'react';
import Linkify from 'react-linkify';
import Emojify from 'react-emojione';

//import io from 'socket.io-client';

class Chat extends React.Component {
  render(){
  let number = 0;
  let myLi = this.props.response.map((respond) => {
    if(respond.username === this.props.username){
      number++
      return <li key={respond.id + number}>
        <p className="username">{respond.username}</p>
        <Linkify><Emojify><p className="message">{respond.content}</p></Emojify></Linkify>
      </li>
    }else{
      number++
      return <li key={respond.id + number}>
        <p className="myuser">{respond.username}</p>
        <Linkify><Emojify><p className="message">{respond.content}</p></Emojify></Linkify>
      </li>
    }
  })
    return(
      <div className="overall">
        <h1>Welcome</h1>
        <button onClick={this.props.onLogOut}>logout</button>
        <div className="centerList"><ul className="messages">{myLi}</ul></div>
        <form onSubmit={this.props.onClickSend}>
          <input onChange={this.props.onChatInput} value={this.props.message}/>
          <button type="submit">Send</button>
        </form>
      </div>
    ) 
  }
}



export default Chat;
