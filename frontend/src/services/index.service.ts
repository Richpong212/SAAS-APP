import axios from 'axios';

const APIURL = 'http://localhost:5001/api/user';

interface IRegister {
    email: string;
    password: string;
    name: string;

} 

interface ILogin { 
    email: string;
    password: string;
}

// get data from local storage
export const getUserData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;

export const registerService = async (data:IRegister, toast:any, navigate:any) => {
    try {
        const res = await axios.post(`${APIURL}/register`, data);
        toast.success(res.data.message);
        setTimeout(() => {
            navigate('/login');

            window.location.reload();
         }, 4000);

        return res.data;
        
    } catch (error: any) {
        toast.error(error.response.data.message);
        return error.message
    }
};
 

export const loginService = async (data:ILogin, toast:any, navigate:any) => {
    try {
        const res = await axios.post(`${APIURL}/login`, data);
        toast.success(res.data.message);
        setTimeout(() => {
            navigate('/');

            window.location.reload();
        }, 4000);
        
        localStorage.setItem("userData", JSON.stringify(res.data.user));
    
        return res.data
        
    } catch (error: any) {
        toast.error(error.response.data.message);
        return error.message
    }
}


// market search service
export const marketSearchService = async (description:string) => {
    try {
        const res = await axios.post('http://localhost:5001/api/market/search', {description});
        return res.data;
    } catch (error:any) {
        return error.message;
    }
}