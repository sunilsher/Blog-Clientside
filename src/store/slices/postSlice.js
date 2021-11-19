import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../../constants/apiRoute';

const sliceName = 'posts';

const initialState = {
    postsList: [],
    loading: false,
    error: null
}

export const fetchPostsAction = createAsyncThunk(
    `${sliceName}/fetchPostsAction`,
    async(payload, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL.POST_BASE_URL}`);
            return response.data;
        } catch (error) {
            throw(error);
        }
    }
)

const postSlice = createSlice({
    name: sliceName,
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsAction.pending, (state, action)=>{
                state.loading = true;
            })
            .addCase(fetchPostsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Failed to load data.';
            })
            .addCase(fetchPostsAction.fulfilled, (state, action)=>{
                state.postsList = action.payload;
                state.loading = false;
                state.error = null;
            })
    }
})

export default postSlice.reducer;