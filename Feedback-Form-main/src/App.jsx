import { useState } from 'react';
import './App.css';

function App() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });

  // State for submitted feedback
  const [submissions, setSubmissions] = useState([]);
  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!formData.feedback.trim()) tempErrors.feedback = 'Feedback is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmissions(prev => [...prev, { ...formData, id: Date.now() }]);
      // Reset form
      setFormData({
        name: '',
        email: '',
        feedback: ''
      });
    }
  };

  return (
    <div className="App">
      <h1>Feedback Form</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Feedback:</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Enter your feedback"
            rows="4"
          />
          {errors.feedback && <span className="error">{errors.feedback}</span>}
        </div>

        <button type="submit">Submit Feedback</button>
      </form>

      {/* Display submitted feedback */}
      {submissions.length > 0 && (
        <div className="submissions">
          <h2>Submitted Feedback</h2>
          {submissions.map(submission => (
            <div key={submission.id} className="submission-item">
              <p><strong>Name:</strong> {submission.name}</p>
              <p><strong>Email:</strong> {submission.email}</p>
              <p><strong>Feedback:</strong> {submission.feedback}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;