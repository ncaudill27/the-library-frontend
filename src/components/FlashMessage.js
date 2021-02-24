import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { removeFlash } from '../actions/messages';

function FlashMessage({message, removeFlash}) {

  const dispatch = useDispatch();

  const close = () => dispatch(removeFlash);
  
  const renderMessages = () => {
    if (Array.isArray(message)) {
      for (let m of message) {
        return <h3>{m}</h3>;
      }
    } else {
      return <h3>{message}</h3>;
    }
  }
  
  return (
    <div className='Flash'>
      <h1>OOPSY!</h1>
      {renderMessages()}
      <br/>
      <button onClick={close}>OK</button>
    </div>
  );
}

const mapStateToProps = ({messages}) => ({message: messages.message});


export default connect(mapStateToProps, { removeFlash })(FlashMessage);