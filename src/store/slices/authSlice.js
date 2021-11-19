import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API_URL from '../../constants/apiRoute';
import Status from '../../constants/status';
import axiosInstance from '../../helpers/axiosInstance';
const sliceName = 'auth'
const initialState = {
    user: {},
    isLoggedIn: false,
    isAuthenticating: false,
    status: Status.IDLE,
    error: null
}

export const registerUserAction = createAsyncThunk(
    `${sliceName}/registerUserAction`,
    async (payload, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`${API_URL.AUTH_BASE_URL}/register`, payload);
            return response.data;
        } catch (error) {
            if(!error.response){
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    } 
)
export const loginUserAction = createAsyncThunk(
    `${sliceName}/loginUserAction`,
    async (payload, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`${API_URL.AUTH_BASE_URL}/login`, payload);
            return response.data;
        } catch (error) {
            if(!error.response){
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    } 
)

export const getLoggedInUser = createAsyncThunk(
    `${sliceName}/getLoggedInUser`,
    async (payload, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`${API_URL.USER_BASE_URL}/${payload}`);
            return response.data;
        } catch (error) {
            if(!error.response){
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    } 
)

const authSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        clearStatus: (state, action) => {
            state.status = Status.IDLE;
        },
        logOut: (state, action) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem('user_id');
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(registerUserAction.pending, (state, action)=>{
                state.status = Status.PENDING
            })
            .addCase(registerUserAction.rejected, (state, action)=>{
                state.status = Status.ERROR;
                state.error = action.payload;
            })
            .addCase(registerUserAction.fulfilled, (state, action)=>{
                state.status = Status.SUCCESS;
                state.error = null;
            })
        builder
            .addCase(getLoggedInUser.pending, (state, action)=>{
                state.isLoggedIn = false;
                state.isAuthenticating = true;
            })
            .addCase(getLoggedInUser.rejected, (state, action)=>{
                state.isLoggedIn = false;
                state.isAuthenticating = false;
            })
            .addCase(getLoggedInUser.fulfilled, (state, action)=>{
                state.isLoggedIn = true;
                state.isAuthenticating = false;
                state.user = action.payload;
            })
        builder
            .addCase(loginUserAction.pending, (state, action)=>{
                state.status = Status.PENDING;
                // state.isAuthenticating = true;
            })
            .addCase(loginUserAction.rejected, (state, action)=>{
                state.status = Status.ERROR;
                state.error = action.payload;
                // state.isAuthenticating = false;
            })
            .addCase(loginUserAction.fulfilled, (state, action)=>{
                state.status = Status.SUCCESS;
                state.error = null;
                state.isLoggedIn = true;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user_id', action.payload.user_id);
                // state.isAuthenticating = false;
            })
    }
})

export default authSlice.reducer;
export const { clearStatus, logOut } = authSlice.actions;