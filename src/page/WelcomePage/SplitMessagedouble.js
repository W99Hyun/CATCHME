import React from 'react';

function SplitMessagedouble({ message, splitIndex }) {
  return (
    <div>
      <div className="message received">
        <div className="message-content">{message.slice(0, splitIndex)}</div>
      </div>
      <div className="message received2">
        <div className="message-content">{message.slice(splitIndex)}</div>
      </div>
    </div>
  );
}

export default SplitMessagedouble;