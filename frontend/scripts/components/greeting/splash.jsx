import React from 'react';

const Splash = () => (
	<div className='splash'>
		<div className="hero-img-container">
			<img className="hero-img" alt="hero image"
        src="https://s3.amazonaws.com/horror-stream/Screen+Shot+2018-02-24+at+3.30.18+PM.png"/>
		</div>

			<div className="intro-container">
				<h1 className="intro-title">Welcome to the live stream</h1>

				<p className="intro-body">
					Watch a harrowing gamer play through all the latest survival horror titles live,
          for your enjoyment. You'll win together, you'll lose together...
          but ultimately, I hope you brought your inhaler, cause it's going to be a bumpy ride.
				</p>
			</div>


			<div className="splash-signup">
				<div className="call-to-action">
					<h3>Watch us play the latest titles: <span id="arrow">⟶</span></h3>

					<ul>
						<li><span>✓</span>Resident Evil 7</li>
						<li><span>✓</span>Outlast 2</li>
						<li><span>✓</span>Layers of Evil</li>
						<li><span>✓</span>Dark Souls 3</li>
						<li><span>✓</span>Love in a Dangerous Space Time</li>
					</ul>
				</div>
			</div>
	</div>
);


export default Splash;
