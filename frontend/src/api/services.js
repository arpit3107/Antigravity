import { request } from './client';

export const DoctorService = {
    getAll: () => request('doctor', '/doctors'),
    getById: (id) => request('doctor', `/doctors/${id}`),
    create: (data) => request('doctor', '/doctors', { method: 'POST', body: JSON.stringify(data) }),
    update: (data) => request('doctor', '/doctors', { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request('doctor', `/doctors/${id}`, { method: 'DELETE' }),
};

export const PatientService = {
    getAll: () => request('patient', '/patients'),
    getById: (id) => request('patient', `/patients/${id}`),
    create: (data) => request('patient', '/patients', { method: 'POST', body: JSON.stringify(data) }),
    update: (data) => request('patient', '/patients', { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request('patient', `/patients/${id}`, { method: 'DELETE' }),
};

export const AppointmentService = {
    getAll: () => request('appointment', '/appointments'),
    book: (data) => request('appointment', '/appointments', { method: 'POST', body: JSON.stringify(data) }),
};

export const BillService = {
    getAll: () => request('billing', '/bills'),
    getById: (id) => request('billing', `/bills/${id}`),
    create: (data) => request('billing', '/bills', { method: 'POST', body: JSON.stringify(data) }),
};


