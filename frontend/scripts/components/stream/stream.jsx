import React from 'react';

class Stream extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Tune in!</h1>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/XQficmAci9k"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen>
        </iframe>

        <iframe
          allowFullScreen=""
          frameBorder="0"
          height="270"
          src="https://www.youtube.com/embed/XQficmAci9k"
          width="480">
        </iframe>
      </div>
    );
  }
}

export default Stream;
