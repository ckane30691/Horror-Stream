import React from 'react';

class Stream extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="stream-body">

        <div className="card">
        <iframe
          className="stream"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/XQficmAci9k"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen>
        </iframe>
        </div>
        <div className="card">
        <iframe
          className="chat"
          allowFullScreen=""
          frameBorder="0"
          height="270"
          src="https://www.youtube.com/live_chat?v=XQficmAci9k&embed_domain=horror-stream.herokuapp.com"
          width="480">
        </iframe>
        </div>
      </div>
    );
  }
}

export default Stream;
