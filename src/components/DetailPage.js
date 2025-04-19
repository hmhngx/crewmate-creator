import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const DetailPage = () => {
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

  // Fetch the crewmate on mount
  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        const { data, error } = await supabase
          .from('crewmates')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        if (data) {
          setFormData({
            name: data.name,
            speed: data.speed.toString(),
            color: data.color,
            category: data.category,
            image: data.image,
          });
        }
      } catch (error) {
        console.error('Error fetching crewmate:', error.message);
        setError('Failed to load crewmate. Please try again later.');
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
      const { error } = await supabase
        .from('crewmates')
        .update({
          name: formData.name,
          category: formData.category,
          speed: parseFloat(formData.speed),
          color: formData.color,
          image: formData.image,
        })
        .eq('id', id);

      if (error) throw error;

      console.log('Crewmate updated successfully');
      navigate('/gallery');
    } catch (error) {
      console.error('Error updating crewmate:', error.message);
      setError('Failed to update crewmate. Please try again.');
    }
  };

  const selectedCategory = categories[formData.category] || categories['Space Explorer'];

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex font-roboto">
        {/* Outer Sidebar */}
        <div className="w-48 bg-gray-800 p-4 flex flex-col space-y-4">
          <Link to="/" className="text-white hover:text-pink-500 transition-colors duration-300">Home</Link>
          <Link to="/create" className="text-white hover:text-pink-500 transition-colors duration-300">Create a Crewmate!</Link>
          <Link to="/gallery" className="text-white hover:text-pink-500 transition-colors duration-300">Crewmate Gallery</Link>
        </div>
        <div className="flex-1 p-8 flex justify-center items-center">
          <p className="text-red-500 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex font-roboto">
      {/* Outer Sidebar */}
      <div className="w-48 bg-gray-800 p-4 flex flex-col space-y-4">
        <Link to="/" className="text-white hover:text-pink-500 transition-colors duration-300">Home</Link>
        <Link to="/create" className="text-white hover:text-pink-500 transition-colors duration-300">Create a Crewmate!</Link>
        <Link to="/gallery" className="text-white hover:text-pink-500 transition-colors duration-300">Crewmate Gallery</Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 flex justify-center items-center">
        <div className="w-full max-w-lg">
          <h1 className="text-5xl font-bold text-center mb-8 text-cyan-300 glow">Edit Crewmate</h1>
          <form onSubmit={handleSubmit} className="bg-gray-600 p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block text-cyan-300 font-bold mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-cyan-300 transition-all duration-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyan-300 font-bold mb-2">Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-cyan-300 transition-all duration-300"
              >
                {Object.keys(categories).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-cyan-300 font-bold mb-2">Speed:</label>
              <select
                name="speed"
                value={formData.speed}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-cyan-300 transition-all duration-300"
                required
              >
                <option value="">Select Speed</option>
                {selectedCategory.speeds.map((speed) => (
                  <option key={speed} value={speed}>{speed} mph</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-cyan-300 font-bold mb-2">Color:</label>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-cyan-300 transition-all duration-300"
                required
              >
                <option value="">Select Color</option>
                {selectedCategory.colors.map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-cyan-300 font-bold mb-2">Image:</label>
              <select
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-cyan-300 transition-all duration-300"
                required
              >
                <option value="">Select Image</option>
                {crewmateImages.map((image) => (
                  <option key={image} value={image}>{image.split('/').pop()}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-2 px-6 rounded border-2 border-transparent hover:border-pink-500 transition-all duration-300"
            >
              Update Crewmate
            </button>
          </form>
        </div>
      </div>

      <style>
        {`
          .glow {
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.6);
          }

          @media (max-width: 768px) {
            .flex {
              flex-direction: column;
            }
            .w-48 {
              width: 100%;
              flex-direction: row;
              justify-content: space-around;
            }
            .text-5xl {
              font-size: 2.5rem;
            }
            .p-8 {
              padding: 1rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DetailPage;