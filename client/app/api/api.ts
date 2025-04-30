import handleResponse from "@/lib/utils";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Add these interfaces at the top of the file after imports
interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('jwt');
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};


export const registerUser = async (userData: { username: string, email: string, password: string, userType: string }) => { 
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

        const data = await handleResponse(response);
        // Store JWT token if it's in the response
        if (data.token) {
            localStorage.setItem('jwt', data.token);
        }
        return data;
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
        const data = await handleResponse(response);
        // Store JWT token if it's in the response
        if (data.token) {
            localStorage.setItem('jwt', data.token);
        }
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to connect to server');
    }
};

// api.ts
export const getProfile = async () => {

  //Changes for Local Storage
  const token = localStorage.getItem('jwt');
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  if (token) {
      headers['Authorization'] = `Bearer ${token}`;
  }


  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    credentials: 'include',
    headers
  });

  // Check if response is JSON
  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    const text = await response.text();
    throw new Error(`Expected JSON, got: ${text.slice(0, 100)}`);
  }

  return response.json();
};


export const commentService = {
  async getComments() {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      credentials: 'include',
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    return response.json();
  },

  async createComment(content: string, isAnonymous: boolean = false) {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ content, isAnonymous })
    });

    if (!response.ok) {
      throw new Error('Failed to create comment');
    }
    return response.json();
  },

  async deleteComment(id: number) {
    const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to delete comment');
    }
  }
};


export const locationService = {
    async saveLocation(latitude: number, longitude: number) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`, {
        method: 'POST',
        credentials: 'include',
        headers: getAuthHeaders(),
        body: JSON.stringify({ latitude, longitude }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save location');
      }
      return response.json();
    },
  
    async getLastLocation() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`, { 
        credentials: 'include' 
      });
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API Error: ${text}`);
      }
      return response.json();
    }
  };

export const sosService = {

    async sendSOS(data: {message: string; type: string}){
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sos/sendsos`, {
            method: 'POST',
            credentials: 'include',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if(!response.ok){
            throw new Error("Failed to send sos");
        }
        return response.json();
    },

    async getTrustedEmail() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trustedemail`, {
        credentials: 'include',
        headers: getAuthHeaders()
      });

      if(!response.ok){
        throw new Error('Failed to fetch trusted Email');
      }
      return response.json();
    },

    async updateTrustedEmail(trustedEmail: string) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trustedemail`, {
          method: 'PUT',
          credentials: 'include',
          headers: getAuthHeaders(),
          body: JSON.stringify({ trustedEmail })
        });
    
        if (!response.ok) {
          throw new Error('Failed to update trusted email');
        }
        return response.json();
      }
};


export const newsService = {
  async getNewsAndTips() {
    try {
      const response = await fetch('/api/news', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        articles: data.articles.map((article: NewsArticle) => ({
          title: article.title || '',
          description: article.description || '',
          url: article.url || '',
          urlToImage: article.urlToImage || '',
          publishedAt: article.publishedAt || new Date().toISOString(),
          source: {
        name: article.source?.name || 'Unknown Source'
          }
        }))
      };

    } catch (error) {
      console.error('News API Error:', error);
      throw error; // Let the component handle the error
    }
  }
};

export const consultantService = {
  async getAllConsultants() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultants`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch consultants');
    }

    return response.json();
  },

  async bookAppointment(appointmentData: {
    consultantId: number;
    date: string;
    time: string;
    status?: string;
  }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appointmentData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to book appointment');
    }

    return response.json();
  },

  async getUserAppointments() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user appointments');
    }

    return response.json();
  },
};

