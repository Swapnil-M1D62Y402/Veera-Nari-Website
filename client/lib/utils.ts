import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// client/lib/api.ts
const handleResponse = async (response: Response) => {
  // Handle empty responses (like 204 No Content)
  if (response.status === 204) {
    return null;
  }

  // Parse JSON only if Content-Type is application/json
  const contentType = response.headers.get('content-type');
  const data = contentType?.includes('application/json') 
    ? await response.json() 
    : await response.text();

  if (!response.ok) {
    // Handle API error structure
    const error = (data && data.error) || 
                  (data && data.message) || 
                  response.statusText;
    throw new Error(typeof error === 'string' ? error : 'Request failed');
  }

  return data;
};

export default handleResponse;