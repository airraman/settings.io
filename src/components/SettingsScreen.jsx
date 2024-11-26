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
    '#c8b2d6', '#f1dbbc', '#bcd2f1', '#d6b2c8', 
    '#b2d6c8', '#dbbcf1', '#bcf1db', '#f1bcdb'
  ];

  const durations = [5, 10, 15, 20, 30, 45, 90];

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      const id = newActivity.toLowerCase().replace(/\s+/g, '-');
      setActivities([...activities, { id, name: newActivity, color: selectedColor }]);
      setNewActivity('');
      setSelectedColor(colorPalette[0]);
      showFeedback('Activity added successfully!');
    }
  };

  const handleDeleteActivity = (idToDelete) => {
    setActivities(activities.filter(activity => activity.id !== idToDelete));
    showFeedback('Activity deleted');
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

  const showFeedback = (message) => {
    setShowAlert(message);
    setTimeout(() => setShowAlert(false), 2000);
  };

  const handleSaveSettings = () => {
    if (selectedDurations.length === 3) {
      console.log('Saving settings:', { activities, selectedDurations });
      showFeedback('Settings saved successfully!');
    } else {
      showFeedback('Please select exactly 3 durations');
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <header className="settings-header">
          <h1 className="settings-title">Settings</h1>
        </header>

        <main className="settings-content">
          <section className="new-activity-section">
            <h2 className="section-title">Add Activity</h2>
            <form className="new-activity-form" onSubmit={(e) => {
              e.preventDefault();
              handleAddActivity();
            }}>
              <input
                type="text"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                placeholder="Activity name"
                className="activity-input"
                maxLength={20}
              />
              <div className="color-select-wrapper">
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="color-select"
                  style={{ backgroundColor: selectedColor }}
                >
                  {colorPalette.map((color) => (
                    <option 
                      key={color} 
                      value={color} 
                      style={{ backgroundColor: color }}
                    >
                      {'\u00A0'}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="add-button"
                disabled={!newActivity.trim()}
                aria-label="Add activity"
              >
                <Plus size={20} />
                <span>Add</span>
              </button>
            </form>
          </section>

          <section className="activities-section">
            <h2 className="section-title">
              Your Activities
              <span className="scroll-hint">(scroll to see more)</span>
            </h2>
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
                      className="color-select"
                      style={{ backgroundColor: activity.color }}
                      aria-label="Select color"
                    >
                      {colorPalette.map((color) => (
                        <option 
                          key={color} 
                          value={color} 
                          style={{ backgroundColor: color }}
                        >
                          {'\u00A0'}
                        </option>
                      ))}
                    </select>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteActivity(activity.id)}
                      aria-label="Delete activity"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="duration-section">
            <h2 className="section-title">Session Lengths</h2>
            <p className="duration-help">
              Select 3 options ({selectedDurations.length}/3)
            </p>
            <div className="duration-grid">
              {durations.map((duration) => (
                <button
                  key={duration}
                  onClick={() => handleDurationClick(duration)}
                  className={`duration-button ${
                    selectedDurations.includes(duration) ? 'selected' : ''
                  }`}
                  disabled={selectedDurations.length === 3 && !selectedDurations.includes(duration)}
                  aria-pressed={selectedDurations.includes(duration)}
                >
                  {duration}m
                </button>
              ))}
            </div>
          </section>

          <button 
            className="save-button" 
            onClick={handleSaveSettings}
            disabled={selectedDurations.length !== 3}
          >
            <Save size={20} />
            <span>Save Settings</span>
          </button>
        </main>

        {showAlert && (
          <div className="toast-message" role="alert">
            {showAlert}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsScreen;