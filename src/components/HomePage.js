import React from 'react';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="text-5xl font-bold mb-4">Welcome to the Crewmate Creator!</h1>
      <p className="text-xl mb-8">
        Here is where you can create your very own set of crewmates before sending them off into space!
      </p>
      <img
        src="/images/group.png"
        alt="Crewmates Group"
        className="mx-auto mb-4"
        style={{ maxWidth: '300px' }}
      />
      <img
        src="/images/ufo.png"
        alt="UFO"
        className="mx-auto"
        style={{ maxWidth: '200px' }}
      />
    </div>
  );
};

export default HomePage;