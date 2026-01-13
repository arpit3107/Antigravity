import React from 'react';
import './Input.css';

export const Input = ({ label, type = 'text', value, onChange, placeholder, name, required = false }) => {
    return (
        <div className="input-group">
            {label && <label className="input-label" htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                type={type}
                className="input-field"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};
