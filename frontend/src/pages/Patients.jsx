import React, { useEffect, useState } from 'react';
import { ServiceView } from '../components/ServiceView';
import { PatientService } from '../api/services';

export const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchPatients = async () => {
        setLoading(true);
        try {
            const data = await PatientService.getAll();
            setPatients(data);
            setError('');
        } catch (err) {
            setError('Failed to fetch patients');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleAdd = async (formData) => {
        try {
            await PatientService.create(formData);
            fetchPatients();
        } catch (err) {
            setError('Failed to add patient');
        }
    };

    const columns = [
        { header: 'ID', key: 'id' },
        { header: 'Name', key: 'name' },
        { header: 'Age', key: 'age' },
        { header: 'Gender', key: 'gender' },
        { header: 'Mobile', key: 'mobile' },
    ];

    const formConfig = [
        { name: 'name', label: 'Patient Name', placeholder: 'Jane Doe' },
        { name: 'age', label: 'Age', type: 'number', placeholder: '30' },
        { name: 'gender', label: 'Gender', placeholder: 'Female' },
        { name: 'mobile', label: 'Mobile Number', placeholder: '1234567890' },
    ];

    return (
        <ServiceView
            title="Patients"
            data={patients}
            columns={columns}
            onAdd={handleAdd}
            formConfig={formConfig}
            loading={loading}
            error={error}
        />
    );
};
