import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';

const API_URL = 'https://contact-book-app-52y1.onrender.com';

function App() {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 5;

  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const emailRegex = /^\S+@\S+\.\S+$/;
  const phoneRegex = /^\d{10}$/;

  useEffect(() => {
    fetchContacts(page);
  }, [page]);

  const fetchContacts = async (currentPage) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await axios.get(`${API_URL}/contacts`, { params: { page: currentPage, limit } });
      setContacts(res.data.contacts);
      setTotal(res.data.total);
    } catch {
      setErrorMessage('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setErrorMessage('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitLoading(true);
    setErrorMessage('');
    try {
      const res = await axios.post(`${API_URL}/contacts`, formData);
      setContacts(prev => [res.data, ...prev]);
      setTotal(prev => prev + 1);
      setFormData({ name: '', email: '', phone: '' });
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Failed to add contact');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    setErrorMessage('');
    try {
      await axios.delete(`${API_URL}/contacts/${id}`);
      setContacts(prev => prev.filter(c => c.id !== id));
      setTotal(prev => prev - 1);
    } catch {
      setErrorMessage('Failed to delete contact');
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="app-container">
      <h2 className="title">📒 Contact Book</h2>

      <form onSubmit={handleAddContact} className="contact-form" noValidate>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={submitLoading} />
          {errors.name && <small className="error">{errors.name}</small>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={submitLoading} />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} maxLength={10} disabled={submitLoading} />
          {errors.phone && <small className="error">{errors.phone}</small>}
        </div>

        <button type="submit" className="btn primary" disabled={submitLoading}>
          {submitLoading ? 'Adding...' : 'Add Contact'}
        </button>
        <button type="button" className="btn secondary" onClick={() => fetchContacts(1)} disabled={loading}>
          Fetch Contacts
        </button>
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <h3 className="subtitle">Contacts</h3>

      {loading ? (
        <p>Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <table className="contacts-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(({ id, name, email, phone }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td className="actions">
                  <button onClick={() => handleDelete(id)} className="btn danger" disabled={submitLoading}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="btn">Prev</button>
        <span>Page {page} of {totalPages || 1}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="btn">Next</button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
