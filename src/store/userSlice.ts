// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: number;
    name: string;
    email: string;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    id: 0,
    name: '',
    email: '',
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser(state, action: PayloadAction<{ id: number; name: string; email: string }>) {
            const { id, name, email } = action.payload;
            state.id = id;
            state.name = name;
            state.email = email;
            state.isLoggedIn = true;
        },
        logoutUser(state) {
            state.id = 0;
            state.name = '';
            state.email = '';
            state.isLoggedIn = false;
        },
    },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
