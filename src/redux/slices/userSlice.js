import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        name: localStorage.getItem('name') || '',
        email: localStorage.getItem('email') || '',
        token: localStorage.getItem('token') || '',
    },
    isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = {
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token,
            };
            state.isAuthenticated = true;
            localStorage.setItem('name', action.payload.name);
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('token', action.payload.token);
            console.log("user", action.payload )
        },
        clearUser(state) {
            state.user = { name: '', email: '', token: '' };
            state.isAuthenticated = false;
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            console.log("user log", state.user.token)
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
