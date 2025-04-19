import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CrewmateDetail = ({ setPage }) => {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/crewmates/${id}`);
        setCrewmate(res.data);
      } catch (error) {
        console.error('Error fetching crewmate:', error);
      }
    };
    fetchCrewmate();
  }, [id]);

  if (!crewmate) return <div>Loading...</div>;

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Crewmate: {crewmate.name}</h1>
      <div className="mb-4">
        <h2 className="text-2xl">Stats:</h2>
        <p>Color: {crewmate.color}</p>
        <p>Speed: {crewmate.speed} mph</p>
        <p>Category: {crewmate.category}</p>
        <p>
          Success Tip:{' '}
          {crewmate.speed < 2.0
            ? 'You may want to find a Crewmate with more speed, this one is kinda slow 😟'
            : 'This Crewmate is ready for action! 🚀'}
        </p>
      </div>
      <button
        onClick={() => setPage(`/edit/${crewmate.id}`, crewmate.id)}
        className="bg-gray-600 hover:bg-gray-500 p-2 rounded"
      >
        Wanna edit this Crewmate?
      </button>
    </div>
  );
};

export default CrewmateDetail;