import config from '../config.js';

const URL = config.URL;

const API = {
    fetchStudents: async () => {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
        
    }
}
export default API;