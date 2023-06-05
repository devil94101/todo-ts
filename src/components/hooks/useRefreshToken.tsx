import { IAuth } from '../../types/auth.types';
import axios from '../common/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth, auth } = useAuth();

    const refresh = async () => {
        try {

            const response = await axios.get('/auth/refreshToken', {
                withCredentials: true
            });

            let newObj = {
                ...auth
            } as IAuth

            newObj.token = response.data.data
            setAuth(newObj);
            return response.data.accessToken;
        }
        catch(err){
            throw err
        }
    }
    return refresh;
};

export default useRefreshToken;