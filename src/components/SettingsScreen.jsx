import React, { useState } from 'react';
import { Plus, X, Save } from 'lucide-react';
import './SettingsScreen.css';

const SettingsScreen = () => {
  const [activities, setActivities] = useState([
    { id: 'write', name: 'Write', color: '#c8b2d6' },
    { id: 'code', name: 'Code', color: '#f1dbbc' },
    { id: 'produce-music', name: 'Produce Music', color: '#bcd2f1' }
  ]);

  const [newActivity, setNewActivity] = useState('');
  const [selectedColor, setSelectedColor] = useState('#c8b2d6');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedDurations, setSelectedDurations] = useState([]);

  const colorPalette = [
    '#c8b2d6', // Original purple
    '#f1dbbc', // Original beige
    '#bcd2f1', // Original blue
    '#d6b2c8', // Dusty rose
    '#b2d6c8', // Sage green
    '#dbbcf1', // Lavender
    '#bcf1db', // Mint
    '#f1bcdb'  // Pink
  ];

  const durations = [5, 10, 15, 20, 30, 45, 90];

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      const id = newActivity.toLowerCase().replace(/\s+/g, '-');
      setActivities([
        ...activities,
        { id, name: newActivity, color: selectedColor }
      ]);
      setNewActivity('');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleDeleteActivity = (idToDelete) => {
    setActivities(activities.filter(activity => activity.id !== idToDelete));
  };

  const handleUpdateColor = (id, newColor) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, color: newColor } : activity
    ));
  };

  const handleDurationClick = (duration) => {
    if (selectedDurations.includes(duration)) {
      setSelectedDurations(selectedDurations.filter(d => d !== duration));
    } else {
      if (selectedDurations.length === 3) {
        setSelectedDurations([duration]);
      } else {
        setSelectedDurations([...selectedDurations, duration]);
      }
    }
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', {
      activities,
      selectedDurations
    });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <div className="settings-header">
          <h1 className="settings-title">Activity Settings</h1>
        </div>
        <div className="settings-content">
          {/* Add new activity section */}
          <div className="new-activity-section">
            <h3 className="section-title">Add New Activity</h3>
            <div className="new-activity-form">
              <div className="form-group">
                <label>Activity Name</label>
                <input
                  type="text"
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  placeholder="Enter activity name"
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  style={{ backgroundColor: selectedColor }}
                >
                  {colorPalette.map((color) => (
                    <option 
                      key={color} 
                      value={color} 
                      style={{ backgroundColor: color }}
                    >
                      {'\u00A0'.repeat(10)}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="add-button"
                onClick={handleAddActivity}
                disabled={!newActivity.trim()}
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>

          {/* Existing activities list */}
          <div className="existing-activities">
            <h3 className="section-title">Existing Activities</h3>
            <div className="activities-list">
              {activities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-info">
                    <div
                      className="color-dot"
                      style={{ backgroundColor: activity.color }}
                    />
                    <span className="activity-name">{activity.name}</span>
                  </div>
                  <div className="activity-controls">
                    <select
                      value={activity.color}
                      onChange={(e) => handleUpdateColor(activity.id, e.target.value)}
                      style={{ backgroundColor: activity.color }}
                    >
                      {colorPalette.map((color) => (
                        <option 
                          key={color} 
                          value={color} 
                          style={{ backgroundColor: color }}
                        >
                          {'\u00A0'.repeat(10)}
                        </option>
                      ))}
                    </select>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteActivity(activity.id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Duration selection */}
          <div className="duration-section">
            <h3 className="section-title">Session Durations</h3>
            <p className="duration-help">
              Choose your session lengths. {selectedDurations.length}/3 selected.
            </p>
            <div className="duration-buttons">
              {durations.map((duration) => (
                <button
                  key={duration}
                  onClick={() => handleDurationClick(duration)}
                  className={`duration-button ${
                    selectedDurations.includes(duration) ? 'selected' : ''
                  } ${
                    selectedDurations.length === 3 && !selectedDurations.includes(duration)
                      ? 'disabled'
                      : ''
                  }`}
                  disabled={selectedDurations.length === 3 && !selectedDurations.includes(duration)}
                >
                  {duration}m
                </button>
              ))}
            </div>
          </div>

          {/* Save button */}
          <button className="save-button" onClick={handleSaveSettings}>
            <Save size={16} />
            Save Deep Work Settings
          </button>

          {/* Success alert */}
          {showAlert && (
            <div className="success-alert">
              Settings saved successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;