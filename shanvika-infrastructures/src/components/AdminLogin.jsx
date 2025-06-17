// src/components/AdminLogin.jsx (or src/pages/AdminLogin.jsx)
import React, { useState } from 'react';

function AdminLogin({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('adminToken', data.token);
                alert('Login successful!');
                onLoginSuccess();
                window.history.pushState({}, '', '/admin-dashboard');
                window.dispatchEvent(new Event('urlchange')); // <--- ADD THIS LINE
            } else {
                setError(data.error || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error('Login request failed:', err);
            setError('Network error or server unavailable.');
        }
    };

    return (
        <div className="admin-login-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            fontFamily: 'Inter, sans-serif'
        }}>
            <div className="admin-login-form-card" style={{
                backgroundColor: '#ffffff',
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontSize: '2.25rem',
                    fontWeight: 'bold',
                    marginBottom: '30px',
                    color: '#1a202c'
                }}>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <label htmlFor="username" style={{
                            display: 'block',
                            color: '#4a5568',
                            fontSize: '0.875rem',
                            fontWeight: 'bold',
                            marginBottom: '8px'
                        }}>Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{
                                appearance: 'none',
                                border: '1px solid #e2e8f0',
                                borderRadius: '0.25rem',
                                width: '100%',
                                padding: '10px 12px',
                                color: '#2d3748',
                                lineHeight: '1.25',
                                outline: 'none',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                                focus: {
                                    borderColor: '#63b3ed',
                                    boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)'
                                }
                            }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '30px', textAlign: 'left' }}>
                        <label htmlFor="password" style={{
                            display: 'block',
                            color: '#4a5568',
                            fontSize: '0.875rem',
                            fontWeight: 'bold',
                            marginBottom: '8px'
                        }}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                appearance: 'none',
                                border: '1px solid #e2e8f0',
                                borderRadius: '0.25rem',
                                width: '100%',
                                padding: '10px 12px',
                                color: '#2d3748',
                                lineHeight: '1.25',
                                outline: 'none',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                                focus: {
                                    borderColor: '#63b3ed',
                                    boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)'
                                }
                            }}
                        />
                    </div>
                    {error && <p className="error-message" style={{ color: '#e53e3e', marginBottom: '20px', fontSize: '0.875rem' }}>{error}</p>}
                    <button
                        type="submit"
                        className="login-button"
                        style={{
                            backgroundColor: '#333',
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '12px 24px',
                            borderRadius: '9999px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'background-color 0.3s ease',
                            outline: 'none',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            hover: {
                                backgroundColor: '#555'
                            }
                        }}
                    >
                        Login
                    </button>
                </form>
                <div style={{ marginTop: '20px' }}>
                    <button
                        onClick={() => {
                            window.history.pushState({}, '', '/');
                            window.dispatchEvent(new Event('urlchange')); // <--- ADD THIS LINE
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#007bff',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontSize: '0.9rem'
                        }}
                    >
                        Back to Homepage
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;