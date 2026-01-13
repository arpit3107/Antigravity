import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../api/client';

export const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                const token = await request('auth', '/token', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password
                    })
                });
                localStorage.setItem('jwt_token', token);
                // Refresh client headers or reload
                window.location.href = '/doctors';
            } else {
                await request('auth', '/register', {
                    method: 'POST',
                    body: JSON.stringify(formData)
                });
                alert('Registration successful! Please login.');
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        }
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'
        }}>
            <div style={{
                width: '100%', maxWidth: '400px', padding: '2rem',
                backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1e293b' }}>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>

                {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64748b' }}>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%', padding: '0.75rem', borderRadius: '4px',
                                border: '1px solid #e2e8f0', fontSize: '1rem'
                            }}
                        />
                    </div>

                    {!isLogin && (
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64748b' }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%', padding: '0.75rem', borderRadius: '4px',
                                    border: '1px solid #e2e8f0', fontSize: '1rem'
                                }}
                            />
                        </div>
                    )}

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64748b' }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%', padding: '0.75rem', borderRadius: '4px',
                                border: '1px solid #e2e8f0', fontSize: '1rem'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%', padding: '0.75rem', backgroundColor: '#3b82f6', color: 'white',
                            border: 'none', borderRadius: '4px', fontWeight: '600', cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer' }}
                    >
                        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                    </button>
                </div>
            </div>
        </div>
    );
};
