import handleResponse from "@/lib/utils";
// api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';


export const registerUser = async (userData: { username: string, email: string, password: string }) => { 
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include', //cookies
        mode: 'cors'
        });

        // In registerUser:
        if (!response.ok) {
        const errorData = await response.json();
        console.error('Backend error:', errorData); // Log backend response
        throw new Error(errorData.message || 'Registration failed');
        }

        return handleResponse(response);
    } catch (error) {
        console.error('Registration error:', error);
        throw new Error(
        error instanceof Error 
            ? error.message 
            : 'Could not connect to server'
        );
    }
}

export const loginUser = async (credentials: { email: string, password: string }) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
        mode: 'cors'
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

// api.ts
export const getProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    credentials: 'include',
  });

  // Check if response is JSON
  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    const text = await response.text();
    throw new Error(`Expected JSON, got: ${text.slice(0, 100)}`);
  }

  return response.json();
};

