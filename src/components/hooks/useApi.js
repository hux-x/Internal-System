import { useState, useCallback, useContext } from 'react';
import { OverallContext } from '../context/Overall';
import { useNavigate } from 'react-router-dom';


const BASE_URL = 'http://localhost:5001';

const useApi = () => {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {role,setRole} = useContext(OverallContext)
  const navigate = useNavigate();
    //setRole(userRole)
  

  const request = useCallback(async ({ endpoint, method = 'GET', headers = {}, body = null, params = {} }) => {
    setLoading(true);
    setError(null);

    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
      // localStorage.setItem("session_token",'9219a6158cbecde4edf04fcc7af5245ca47b01ba'); //for testing
      // const session_token = localStorage.getItem('session_token')

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization':  `Token 9219a6158cbecde4edf04fcc7af5245ca47b01ba`,
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });

      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new Error(data?.message || response.statusText);
      }
      console.log(body)
      console.log(data)
      if(data.token && data.role){
        localStorage.setItem('session_token',data.token)
        localStorage.setItem('role',data.role)
        setRole(data.role)
        navigate('/')
        
      }
      return data;
    } catch (err) {
      setError(err.message || 'Something went wrong');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
};

export default useApi;
