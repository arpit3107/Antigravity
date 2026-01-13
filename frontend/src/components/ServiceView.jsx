import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Table } from './ui/Table';

export const ServiceView = ({ title, data, columns, onAdd, formConfig, loading, error }) => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        setFormData({}); // Reset form
        setShowForm(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <div className="flex justify-between items-center mb-6">
                <h2>{title}</h2>
                <Button onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : `Add ${title.slice(0, -1)}`}
                </Button>
            </div>

            {error && <div className="bg-red-50 text-red-500 p-4 rounded mb-6">{error}</div>}

            {showForm && (
                <Card className="mb-6" title={`New ${title.slice(0, -1)}`}>
                    <form onSubmit={handleSubmit}>
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                            {formConfig.map(field => (
                                <Input
                                    key={field.name}
                                    {...field}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    required={true}
                                />
                            ))}
                        </div>
                        <div className="flex" style={{ justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                            <Button type="submit">Save Record</Button>
                        </div>
                    </form>
                </Card>
            )}

            <Card>
                {loading ? (
                    <div className="p-4" style={{ textAlign: 'center', color: 'var(--secondary)' }}>Loading data...</div>
                ) : (
                    <Table columns={columns} data={data} />
                )}
            </Card>
        </div>
    );
};
