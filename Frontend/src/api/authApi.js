import baseApi from './baseApi';
export const login = async (email, password, alignment) => {

    if (alignment === 'User') {
        const response = await baseApi.post('/login', {
            email,
            password,
            role: false
        });
        return response.data;
    }
    else if (alignment === 'Admin') {
        const response = await baseApi.post('/login', {
            email,
            password,
            role: true
        });
        return response.data;
    }
    else {
        throw new Error('Invalid alignment');
    }
}
export const login_check = async () => {
    const resp = await baseApi.get('/authenticate');
    return resp.data

}

export const googleLoginApi = async (token) => {
    const response = await baseApi.post('/auth/google', { token });
    return response.data;
}