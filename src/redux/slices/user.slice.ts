import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IUser} from "../../interfaces";
import {userService} from "../../services";

interface IState {
    users: IUser[],
    userForUpdate: null,
    formErrors: any,
    status: string,
}

const initialState: IState = {
    users: [],
    userForUpdate: null,
    formErrors: {},
    status: '',
};

const getAll = createAsyncThunk<IUser[], void>(
    'userSlice/getAll',
    async (arg, {rejectWithValue}) => {
        try {
            const {data} = await userService.getAll();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
);

const registerUser = createAsyncThunk<IUser, { user: IUser }>(
    'userSlice/registerUser',
    async ({user}, {rejectWithValue}) => {
        try {
            const {data} = await userService.create(user);
            return data;
        } catch (error: any) {
            console.log(error);
            return rejectWithValue({errorsFromDB: error.response.data});
        }
    }
);


const deleteById = createAsyncThunk<void, { id: String }>(
    'userSlice/deleteById',
    async ({id}, {dispatch, rejectWithValue}) => {
        try {
            await userService.delete(id);
            dispatch(deleteUser(id));
        } catch (e: any) {
            return rejectWithValue({errorStatus: e.message})
        }
    }
);

const updateById = createAsyncThunk<IUser, { id: String, user: IUser }>(
    'userSlice/updateById',
    async ({id, user}, {rejectWithValue}) => {
        try {
            const {data} = await userService.update(id, user);
            console.log(data);

            return data;
        } catch (e: any) {
            return rejectWithValue({errorStatus: e.message})
        }
    }
);


const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserForUpdate: (state, action) => {
            state.userForUpdate = action.payload.user;
        },

        deleteUser: (state, action) => {
            const index = state.users.findIndex(user => user._id === action.payload.id);
            state.users.splice(index, 1);
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const {data} = action.payload as any;
                state.users = data;
            })
            .addCase(getAll.rejected, (state, action) => {
                const errors = action.payload as any;
                console.log(errors);
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(registerUser.rejected, (state, action) => {
                const {errorsFromDB} = action.payload as any;
                state.formErrors = errorsFromDB;
            })

            .addCase(deleteById.rejected, (state, action) => {
                const {errorStatus} = action.payload as any;
                state.status = errorStatus;
            })
            .addCase(updateById.fulfilled, (state, action) => {
                const {id, user} = action.payload as any;
                const index = state.users.findIndex(user => user._id === id);
                state.users[index] = {...state.users[index], ...user};
                state.userForUpdate = null;
            })
            .addCase(updateById.rejected, (state, action) => {
                const {errorStatus} = action.payload as any;
                state.status = errorStatus;
            })
    },
});

const {reducer: userReducer, actions: {deleteUser, setUserForUpdate}} = userSlice;

const userActions = {
    deleteById,
    deleteUser,
    getAll,
    registerUser,
    setUserForUpdate,
    updateById,
};

export {
    userActions,
    userReducer,
}
