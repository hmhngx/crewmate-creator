import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

     const CreatePage = () => {
       const navigate = useNavigate();
       const [formData, setFormData] = useState({
         name: '',
         speed: '',
         color: '',
         category: 'Space Explorer',
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

       const handleChange = (e) => {
         const { name, value } = e.target;
         setFormData((prev) => ({ ...prev, [name]: value }));
       };

       const handleSubmit = async (e) => {
         e.preventDefault();
         setError(null);

         const randomImage = crewmateImages[Math.floor(Math.random() * crewmateImages.length)];

         try {
           const { error } = await supabase.from('crewmates').insert({
             name: formData.name,
             category: formData.category,
             speed: formData.speed,
             color: formData.color,
             image: randomImage,
           });

           if (error) throw error;

           console.log('Crewmate created successfully');
           navigate('/gallery');
         } catch (error) {
           console.error('Error creating crewmate:', error.message);
           setError('Failed to create crewmate. Please try again.');
         }
       };

       const selectedCategory = categories[formData.category] || categories['Space Explorer'];

       return (
         <div className="min-h-screen bg-black text-white flex justify-center items-center font-roboto">
           <div className="p-8 w-full max-w-lg">
             <h1 className="text-5xl font-bold text-center mb-8 text-cyan-300 glow">Create a Crewmate</h1>
             {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
               <button
                 type="submit"
                 className="w-full bg-black text-white font-bold py-2 px-6 rounded border-2 border-transparent hover:border-pink-500 transition-all duration-300"
               >
                 Create Crewmate
               </button>
             </form>
           </div>

           <style>
             {`
               .glow {
                 text-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.6);
               }

               @media (max-width: 768px) {
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

     export default CreatePage;