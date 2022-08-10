import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IUser} from "../../interfaces";
import {userService} from "../../services";

interface IState {
    users: IUser[],
    userForUpdate: null,
    formErrors: any,
    registerError: boolean,
    status: string,

    page: string,
    perPage: string,
    count: string,
}

const initialState: IState = {
    users: [],
    userForUpdate: null,
    formErrors: {},
    registerError: false,
    status: '',

    page: '1',
    perPage: '5',
    count: '0',
};

const getAll = createAsyncThunk<IUser[], { page: string, perPage: string }>(
    'userSlice/getAll',
    async ({page, perPage}, {rejectWithValue}) => {
        try {
            const {data} = await userService.getAll(page, perPage);
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

        saveQueryParams: (state, action) => {
            state.page = action.payload.page;
            state.perPage = action.payload.perPage;
        },

        setPerPage: (state, action) => {
            state.perPage = action.payload.perPage;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const {page, perPage, data, count} = action.payload as any;
                state.page = page;
                state.perPage = perPage;
                state.users = data;
                state.count = count;
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
                state.registerError = true;
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

const {reducer: userReducer, actions: {deleteUser, setUserForUpdate, saveQueryParams, setPerPage}} = userSlice;

const userActions = {
    deleteById,
    deleteUser,
    getAll,
    registerUser,
    saveQueryParams,
    setPerPage,
    setUserForUpdate,
    updateById,
};

export {
    userActions,
    userReducer,
}
