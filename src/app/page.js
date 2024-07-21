"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
// import 'tailwindcss/tailwind.css';
import Modal from '@/components/Modal';
import { db, getAllGames } from '@/firebase';
import { collection, addDoc, GeoPoint } from 'firebase/firestore';

// Dynamically import the Map component to ensure it only renders on the client-side
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Fetch games data when the component mounts
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await getAllGames();
        // console.log('Fetched games data:', gamesData); // Debug log

        const initialMarkers = gamesData.map(game => {
          const location = game.location;
          const latitude = location.latitude;
          const longitude = location.longitude;
          // console.log('Parsed latitude:', latitude, 'Parsed longitude:', longitude); // Debug log
          if (!isNaN(latitude) && !isNaN(longitude)) {
            return { latitude, longitude };
          } else {
            console.error('Invalid latitude or longitude:', latitude, longitude);
            return null;
          }
        }).filter(marker => marker !== null);

        // console.log('Processed initial markers:', initialMarkers); // Debug log

        setMarkers(initialMarkers);
      } catch (error) {
        console.error('Error fetching games data: ', error);
      }
    };
    fetchGames();
  }, []);

  // useEffect(() => {
  //   console.log('Markers state updated:', markers); // Debug log
  // }, [markers]);

  const handleMapClick = (event) => {
    setSelectedPosition({
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng()
    });
  };

  const handleCreateGame = () => {
    setShowModal(true);
  };

  const handleCancelSelection = () => {
    setSelectedPosition(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = async (formData) => {
    try {
      const location = new GeoPoint(selectedPosition.latitude, selectedPosition.longitude);
      // Save the form data to Firestore
      const docRef = await addDoc(collection(db, 'games'), {
        ...formData,
        location: location,
        createdAt: new Date(),
      });
      // console.log('Document written with ID: ', docRef.id); // Debug log

      // Add marker to the map
      const newMarker = {
        latitude: selectedPosition.latitude,
        longitude: selectedPosition.longitude
      };
      setMarkers([...markers, newMarker]);
      setSelectedPosition(null);
      setShowModal(false);
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('Failed to create game. Please try again.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Search query:', searchQuery);
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-lg shadow-lg p-4 z-10 w-3/4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-blue-400">FitMit</Link>
            <Link href="/my-games" className="hover:underline">My Games</Link>
            <Link href="/profile" className="hover:underline">Profile</Link>
            <Link href="/login-signup" className="hover:underline">Login</Link>
          </div>
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="px-4 py-2 rounded-l-md border-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
            >
              Search
            </button>
          </form>
        </nav>
      </div>
      {selectedPosition && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleCreateGame}
          >
            Create Game
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleCancelSelection}
          >
            Cancel Selection
          </button>
        </div>
      )}
      <div className="w-full h-full">
        <Map markers={markers} onClick={handleMapClick} selectedPosition={selectedPosition} />
      </div>
      <Modal show={showModal} onClose={handleModalClose} onSubmit={handleModalSubmit} selectedPosition={selectedPosition}/>
    </div>
  );
};

export default Home;
