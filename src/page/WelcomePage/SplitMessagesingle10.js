import React from 'react';

function SplitMessagesingle10({ message, splitIndex }) {
  return (
    <div>
      <div className="message received10">
        <div className="message-content1">{message.slice(0, splitIndex)}</div>
      </div>
    </div>
  );
}

export default SplitMessagesingle10;