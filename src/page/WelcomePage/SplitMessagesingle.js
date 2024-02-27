import React from 'react';

function SplitMessagesingle({ message, splitIndex }) {
  return (
    <div>
      <div className="message received">
        <div className="message-content1">{message.slice(0, splitIndex)}</div>
      </div>
    </div>
  );
}

export default SplitMessagesingle;