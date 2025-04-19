import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

     const GalleryPage = () => {
       const [crewmates, setCrewmates] = useState([]);
       const [error, setError] = useState(null);

       const fetchCrewmates = async () => {
         try {
           const { data, error } = await supabase
             .from('crewmates')
             .select('*')
             .order('createdAt', { ascending: false });

           if (error) throw error;

           setCrewmates(data);
         } catch (error) {
           console.error('Error fetching crewmates:', error.message);
           setError('Failed to load crewmates. Please try again.');
         }
       };

       useEffect(() => {
         fetchCrewmates();
       }, []);

       return (
         <div className="min-h-screen bg-black text-white flex justify-center items-center font-roboto relative overflow-hidden">
           <div className="stars"></div>

           <div className="p-8 w-full max-w-5xl z-10">
             <h1 className="text-5xl font-orbitron text-center mb-8 glow">Your Crewmate Gallery!</h1>
             {error && <p className="text-red-500 text-center mb-4">{error}</p>}

             {crewmates.length === 0 ? (
               <div className="text-center">
                 <p className="text-xl mb-6">You haven’t made a crewmate yet!</p>
                 <Link
                   to="/create"
                   className="inline-block bg-black text-white font-bold py-2 px-6 rounded glow-btn hover:bg-neonPink transition-all duration-300"
                   onClick={(e) => e.currentTarget.classList.add('bounce')}
                 >
                   Create one here!
                 </Link>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-lg gradient-border">
                 {crewmates.map((crewmate) => (
                   <Link to={`/detail/${crewmate.id}`} key={crewmate.id}>
                     <div className="crewmate-card bg-spaceGray p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 glow-card">
                       <img
                         src={crewmate.image || '/images/silhouette.png'}
                         alt={`${crewmate.name} Crewmate`}
                         className="w-24 h-24 mx-auto mb-4 object-contain hover:animate-spin-slow"
                         onError={(e) => {
                           console.error(`Failed to load image: ${crewmate.image}`);
                           e.target.src = '/images/silhouette.png';
                         }}
                       />
                       <p className="text-white">Name of Crewmate: {crewmate.name}</p>
                       <p className="text-white">Speed of Crewmate: {crewmate.speed} mph</p>
                       <p className="text-white">Color of Crewmate: {crewmate.color}</p>
                       <div className="text-center mt-4">
                         <button
                           className="bg-black text-white font-bold py-2 px-4 rounded glow-btn hover:bg-neonPink transition-all duration-300"
                           onClick={(e) => e.currentTarget.classList.add('bounce')}
                         >
                           Edit Crewmate
                         </button>
                       </div>
                     </div>
                   </Link>
                 ))}
               </div>
             )}
           </div>

           <style>
             {`
               @keyframes spin-slow {
                 0% { transform: rotate(0deg); }
                 100% { transform: rotate(360deg); }
               }

               .animate-spin-slow {
                 animation: spin-slow 3s linear infinite;
               }

               @media (max-width: 768px) {
                 .text-5xl {
                   font-size: 2.5rem;
                 }
                 .p-8 {
                   padding: 1rem;
                 }
                 .crewmate-card {
                   padding: 1rem;
                 }
                 .crewmate-card img {
                   width: 80px;
                   height: 80px;
                 }
               }
             `}
           </style>
         </div>
       );
     };

     export default GalleryPage;