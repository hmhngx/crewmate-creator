import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    speed: '',
    color: '',
    category: 'Space Explorer',
    image: '',
  });
  const [error, setError] = useState(null);

  const crewmateImages = [
    '/images/balloon.png',
    '/images/banana.png',
    '/images/green.png',
    '/images/police.png',
    '/images/black.png',
    '/images/brown.png',
    '/images/chef.png',
    '/images/cyan.png',
    '/images/doctor.png',
    '/images/red.png',
    '/images/janitor.png',
    '/images/white.png',
    '/images/yellow king.png',
    '/images/mini.png',
  ];

  const categories = {
    'Space Explorer': { speeds: [1.0, 2.0, 3.0], colors: ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Orange', 'Pink', 'Rainbow'] },
    'D&D Class': { speeds: [1.5, 2.5, 3.5], colors: ['Red', 'Blue', 'Purple', 'Yellow'] },
    'Dev Team': { speeds: [1.2, 2.2, 3.2], colors: ['Green', 'Orange', 'Pink', 'Rainbow'] },
  };

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/crewmates/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching crewmate:', error);
        setError('Failed to load crewmate. Please try again.');
      }
    };
    fetchCrewmate();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.put(`http://localhost:5000/api/crewmates/${id}`, formData);
      console.log('Crewmate updated:', response.data);
      navigate('/gallery');
    } catch (error) {
      console.error('Error updating crewmate:', error);
      setError('Failed to update crewmate. Please try again.');
    }
  };

  const selectedCategory = categories[formData.category] || categories['Space Explorer'];

  return (
    <div className="min-h-screen bg-black text-white font-roboto relative overflow-hidden">
      <div className="stars"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-5xl md:text-6xl font-orbitron text-center mb-8 text-red-600 glow">
          Edit Crewmate
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-lg border border-gray-700">
          <div className="mb-4">
            <label className="block text-cyan-400 font-orbitron mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-cyan-400 font-orbitron mb-2">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            >
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-cyan-400 font-orbitron mb-2">Speed:</label>
            <select
              name="speed"
              value={formData.speed}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
              required
            >
              <option value="">Select Speed</option>
              {selectedCategory.speeds.map((speed) => (
                <option key={speed} value={speed}>{speed} mph</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-cyan-400 font-orbitron mb-2">Color:</label>
            <select
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
              required
            >
              <option value="">Select Color</option>
              {selectedCategory.colors.map((color) => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-cyan-400 font-orbitron mb-2">Image:</label>
            <select
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
              required
            >
              <option value="">Select Image</option>
              {crewmateImages.map((img) => (
                <option key={img} value={img}>{img.split('/').pop()}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 hover:scale-105 transition-all duration-300 glow-btn"
          >
            Update Crewmate
          </button>
        </form>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@400;500&display=swap');

          .font-orbitron {
            font-family: 'Orbitron', sans-serif;
          }

          .font-roboto {
            font-family: 'Roboto', sans-serif;
          }

          .stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
          }

          .stars::before {
            content: '';
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            box-shadow: ${Array.from({ length: 100 }, () =>
              `${Math.random() * 100}vw ${Math.random() * 100}vh 0 0 #fff`
            ).join(',')};
            animation: twinkle 3s infinite;
          }

          @keyframes twinkle {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }

          .glow {
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.6);
          }

          .glow-btn {
            box-shadow: 0 0 10px rgba(218, 41, 28, 0.8), 0 0 20px rgba(218, 41, 28, 0.6);
          }

          @media (max-width: 640px) {
            .text-5xl {
              font-size: 2.5rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default EditPage;