import React, { useEffect, useState } from 'react';
import { ServiceView } from '../components/ServiceView';
import { DoctorService } from '../api/services';

export const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const data = await DoctorService.getAll();
            setDoctors(data);
            setError('');
        } catch (err) {
            setError('Failed to fetch doctors');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleAdd = async (formData) => {
        try {
            await DoctorService.create(formData);
            fetchDoctors();
        } catch (err) {
            console.error("Add Doctor Error:", err);
            setError(`Failed to add doctor: ${err.message}`);
        }
    };

    const columns = [
        { header: 'ID', key: 'id' },
        { header: 'Name', key: 'name' },
        { header: 'Specialization', key: 'specialization' },
        { header: 'Email', key: 'email' },
    ];

    const formConfig = [
        { name: 'name', label: 'Doctor Name', placeholder: 'Dr. John Doe' },
        { name: 'specialization', label: 'Specialization', placeholder: 'Cardiology' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'john@hospital.com' },
    ];

    return (
        <ServiceView
            title="Doctors"
            data={doctors}
            columns={columns}
            onAdd={handleAdd}
            formConfig={formConfig}
            loading={loading}
            error={error}
        />
    );
};
