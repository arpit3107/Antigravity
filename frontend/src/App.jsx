import React from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Doctors } from './pages/Doctors';
import { Patients } from './pages/Patients';
import { Appointments } from './pages/Appointments';
import { Billing } from './pages/Billing';


import { Login } from './pages/Login';

function App() {
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem('jwt_token');

    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        window.location.href = '/login';
    };

    const NavLink = ({ to, children }) => {
        const isActive = location.pathname.startsWith(to);
        return (
            <Link
                to={to}
                style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                    color: isActive ? 'white' : 'var(--secondary)',
                    transition: 'all 0.2s'
                }}
            >
                {children}
            </Link>
        );
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
            <nav style={{ backgroundColor: 'white', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 10 }}>
                <div className="container">
                    <div className="flex justify-between items-center" style={{ height: '4rem' }}>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>🏥</span>
                            Hospital System
                        </h1>
                        <div className="flex gap-4 items-center">
                            {isAuthenticated ? (
                                <>
                                    <NavLink to="/doctors">Doctors</NavLink>
                                    <NavLink to="/patients">Patients</NavLink>
                                    <NavLink to="/appointments">Appointments</NavLink>
                                    <NavLink to="/bills">Billing</NavLink>
                                    <button
                                        onClick={handleLogout}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '6px',
                                            background: 'white',
                                            cursor: 'pointer',
                                            marginLeft: '1rem'
                                        }}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <NavLink to="/login">Login</NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main style={{ flex: 1, padding: '2rem 0' }}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Navigate to={isAuthenticated ? "/doctors" : "/login"} replace />} />
                    <Route path="/doctors" element={isAuthenticated ? <Doctors /> : <Navigate to="/login" />} />
                    <Route path="/patients" element={isAuthenticated ? <Patients /> : <Navigate to="/login" />} />
                    <Route path="/appointments" element={isAuthenticated ? <Appointments /> : <Navigate to="/login" />} />
                    <Route path="/bills" element={isAuthenticated ? <Billing /> : <Navigate to="/login" />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
