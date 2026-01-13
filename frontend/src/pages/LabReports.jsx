import React, { useEffect, useState } from 'react';
import { ServiceView } from '../components/ServiceView';
import { LabReportService } from '../api/services';

export const LabReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchReports = async () => {
        setLoading(true);
        try {
            const data = await LabReportService.getAll();
            setReports(data);
            setError('');
        } catch (err) {
            setError('Failed to fetch reports');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleAdd = async (formData) => {
        try {
            await LabReportService.create(formData);
            fetchReports();
        } catch (err) {
            setError('Failed to create report');
        }
    };

    const columns = [
        { header: 'ID', key: 'id' },
        { header: 'Patient ID', key: 'patientId' },
        { header: 'Doctor ID', key: 'doctorId' },
        { header: 'Test', key: 'testName' },
        { header: 'Result', key: 'result' },
    ];

    const formConfig = [
        { name: 'patientId', label: 'Patient ID', type: 'number', placeholder: 'Enter Patient ID' },
        { name: 'doctorId', label: 'Doctor ID', type: 'number', placeholder: 'Enter Doctor ID' },
        { name: 'testName', label: 'Test Name', placeholder: 'Blood Test' },
        { name: 'result', label: 'Result', placeholder: 'Normal' },
    ];

    return (
        <ServiceView
            title="Lab Reports"
            data={reports}
            columns={columns}
            onAdd={handleAdd}
            formConfig={formConfig}
            loading={loading}
            error={error}
        />
    );
};
