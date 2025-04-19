import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const DetailPage = () => {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/crewmates/${id}`);
        setCrewmate(response.data);
      } catch (error) {
        console.error('Error fetching crewmate:', error);
        setError('Failed to load crewmate. Please try again later.');
      }
    };
    fetchCrewmate();
  }, [id]);

  if (!crewmate) return <div>{error || 'Loading...'}</div>;

  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">Crewmate: {crewmate.name}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <h2 className="text-2xl font-semibold mb-2">Stats:</h2>
      <p className="text-white mb-2">Category: {crewmate.category}</p>
      <p className="text-white mb-2">Color: {crewmate.color}</p>
      <p className="text-white mb-4">Speed: {crewmate.speed} mph</p>
      {crewmate.speed < 2.5 && (
        <p className="text-white mb-4">
          You may want to find a Crewmate with more speed, this one is kinda slow 😓
        </p>
      )}
      <Link to={`/edit/${crewmate.id}`} className="bg-black text-white font-bold py-2 px-6 rounded">
        Wanna edit this Crewmate?
      </Link>
      <div className="mt-8">
        <img
          src="/images/group.png"
          alt="Small Crewmates Group"
          className="mx-auto"
          style={{ maxWidth: '200px' }}
        />
      </div>
    </div>
  );
};

export default DetailPage;