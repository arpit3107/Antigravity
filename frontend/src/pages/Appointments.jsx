import React, { useEffect, useState } from 'react';
import { ServiceView } from '../components/ServiceView';
import { AppointmentService } from '../api/services';

export const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const data = await AppointmentService.getAll();
            setAppointments(data);
            setError('');
        } catch (err) {
            setError('Failed to fetch appointments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleAdd = async (formData) => {
        try {
            await AppointmentService.book({
                ...formData,
                appointmentDate: new Date().toISOString() // Send current date
            });
            fetchAppointments();
        } catch (err) {
            setError('Failed to book appointment');
        }
    };

    const columns = [
        { header: 'ID', key: 'id' },
        { header: 'Patient ID', key: 'patientId' },
        { header: 'Doctor ID', key: 'doctorId' },
        { header: 'Date', key: 'appointmentDate' },
    ];

    const formConfig = [
        { name: 'patientId', label: 'Patient ID', type: 'number', placeholder: 'Enter Patient ID' },
        { name: 'doctorId', label: 'Doctor ID', type: 'number', placeholder: 'Enter Doctor ID' },
    ];

    return (
        <ServiceView
            title="Appointments"
            data={appointments}
            columns={columns}
            onAdd={handleAdd}
            formConfig={formConfig}
            loading={loading}
            error={error}
        />
    );
};
