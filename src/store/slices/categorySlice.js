import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../../constants/apiRoute';

const sliceName = 'categories';

const initialState = {
    categoriesList: [],
    loading: false,
    error: null
}

export const fetchAllCategoriesAction = createAsyncThunk(
    `${sliceName}/fetchAllCategoriesAction`,
    async(payload, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL.CATEGORIES_BASE_URL}`);
            return response.data;
        } catch (error) {
            throw(error);
        }
    }
)

const categorySlice = createSlice({
    name: sliceName,
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategoriesAction.pending, (state, action)=>{
                state.loading = true;
            })
            .addCase(fetchAllCategoriesAction.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Failed to load data.';
            })
            .addCase(fetchAllCategoriesAction.fulfilled, (state, action)=>{
                state.categoriesList = action.payload;
                state.loading = false;
                state.error = null;
            })
    }
})

export default categorySlice.reducer;