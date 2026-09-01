import React, {useState} from 'react';

export default function ContactForm () {
  const [loading, setLoading] = useState (false);
  const [formData, setFormData] = useState ({
    name: '',
    email: '',
    contact: '',
    message: '',
  });

  // Handler for input field changes
  const handleInputChange = event => {
    const {name, value} = event.target;
    setFormData (prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async event => {
    event.preventDefault ();
    setLoading (true);

    try {
      await fetch ('https://script.google.com/macros/s/AKfycbzJTVc47gObCqbji7TknrEw4O-26_k-haowx7MTYo0y8-gHUPI344cRCQDvIzV87Exo/exec', {
        method: 'POST',
        mode: 'no-cors', // Apps Script requires no-cors
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify (formData),
      });

      alert ('Form submitted successfully!');
      setFormData ({name: '', email: '', contact: '', message: ''});
    } catch (error) {
      console.error ('Error submitting form:', error);
      alert ('Something went wrong!');
    } finally {
      setLoading (false);
    }
  };

  return (
    <form id="contact-form" onSubmit={onSubmit}>
      <div className="row gx-3 gy-4">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input
              name="name"
              placeholder="Name *"
              className="form-control"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Your Email</label>
            <input
              name="email"
              placeholder="Email *"
              className="form-control"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label className="form-label">Contact Number</label>
            <input
              name="contact"
              placeholder="Contact Number *"
              className="form-control"
              type="tel"
              pattern="[0-9]{10}" // Only 10-digit numbers
              value={formData.contact}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label className="form-label">Your Message</label>
            <textarea
              name="message"
              placeholder="Your message *"
              rows={4}
              className="form-control"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="send">
            <button
              className={`px-btn w-100 ${loading ? 'disabled' : ''}`}
              type="submit"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
