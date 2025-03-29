import handleResponse from "@/lib/utils";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'


export const registerUser = async (userData: {
    username: string,
    email: string,
    password: string
}) => { 
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include' //cookies
    });
    return handleResponse(response);
}

export const loginUser = async (credentials: {
    email: string,
    password: string
}) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include'
        });
        
        if (!response.ok) { 
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await handleResponse(response);
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to connect to server');
    }
};

