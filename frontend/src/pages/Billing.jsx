import React, { useEffect, useState } from 'react';
import { ServiceView } from '../components/ServiceView';
import { BillService } from '../api/services';

export const Billing = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchBills = async () => {
        setLoading(true);
        try {
            const data = await BillService.getAll();
            setBills(data);
            setError('');
        } catch (err) {
            setError('Failed to fetch bills');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBills();
    }, []);

    const handleAdd = async (formData) => {
        try {
            await BillService.create(formData);
            fetchBills();
        } catch (err) {
            setError('Failed to create bill');
        }
    };

    const columns = [
        { header: 'ID', key: 'id' },
        { header: 'Appt ID', key: 'appointmentId' },
        { header: 'Amount', key: 'amount' },
        { header: 'Date', key: 'billDate' },
    ];

    const formConfig = [
        { name: 'appointmentId', label: 'Appointment ID', type: 'number', placeholder: 'Enter Appointment ID' },
        { name: 'amount', label: 'Amount', type: 'number', placeholder: '100.00' },
    ];

    return (
        <ServiceView
            title="Bills"
            data={bills}
            columns={columns}
            onAdd={handleAdd}
            formConfig={formConfig}
            loading={loading}
            error={error}
        />
    );
};
