const BASE_URLS = {
    doctor: 'http://localhost:8080/api',
    patient: 'http://localhost:8080/api',
    appointment: 'http://localhost:8080/api',
    billing: 'http://localhost:8080/api',
    auth: 'http://localhost:8080/auth'
};

export const request = async (service, endpoint, options = {}) => {
    const url = `${BASE_URLS[service]}${endpoint}`;

    // Inject Authorization header if token exists
    const token = localStorage.getItem('jwt_token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${response.status} - ${errorText || response.statusText}`);
        }

        const text = await response.text();
        console.log(`Response from ${url}:`, text);
        try {
            return text ? JSON.parse(text) : {};
        } catch (e) {
            return text;
        }
    } catch (error) {
        console.error(`Request failed: ${service} ${endpoint}`, error);
        throw error;
    }
};
