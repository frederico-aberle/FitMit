"use client";

import React, { useState, useEffect } from 'react';

const Modal = ({ show, onClose, onSubmit, selectedPosition }) => {
  const [formData, setFormData] = useState({
    sportType: '',
    dateTime: '',
    location: '',
    playersNeeded: '',
    additionalNotes: '',
    inviteLink: '',
  });

  useEffect(() => {
    if (selectedPosition) {
      setFormData((prevData) => ({
        ...prevData,
        location: `${selectedPosition.latitude}, ${selectedPosition.longitude}`
      }));
    }
  }, [selectedPosition]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.sportType || !formData.dateTime || !formData.location || !formData.playersNeeded) {
      alert('Please fill in all required fields.');
      return;
    }
    onSubmit(formData);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Create New Sports Activity</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Sport Type</label>
            <select
              name="sportType"
              value={formData.sportType}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-900"
              required
            >
              <option value="" className="text-gray-500">Select Sport</option>
              <option value="soccer">Soccer</option>
              <option value="basketball">Basketball</option>
              <option value="tennis">Tennis</option>
              <option value="volleyball">Volleyball</option>
              <option value="baseball">Baseball</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date & Time</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-900"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-900"
              placeholder="Enter location or select on map"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Number of Players Needed</label>
            <input
              type="number"
              name="playersNeeded"
              value={formData.playersNeeded}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-900"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Additional Notes</label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-900"
              placeholder="Enter any additional notes"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Invite Friends</label>
            <input
              type="text"
              name="inviteLink"
              value={formData.inviteLink}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-900"
              placeholder="Enter invite link"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
