import axios from "axios";

// Factory function to create and configure an Axios instance.
// It can accept optional configuration overrides.
export function createApiClient(config = {}) {
    const baseURL = "http://localhost:3000/api";

    return axios.create({
        baseURL,
        timeout: 15000,
        withCredentials: true,
        ...config, // Merge any custom config provided
    });
}

// Export the default apiClient instance for compatibility
const apiClient = createApiClient();

export default apiClient;
