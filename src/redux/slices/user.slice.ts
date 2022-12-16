import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IUser} from "../../interfaces";
import {userService} from "../../services";
import {localStorageItemsEnum} from "../../constants";

interface IState {
    users: IUser[],

    userForUpdate: null,
    formErrors: any,
    status: string,
    userFavoriteList: string[],
}

const initialState: IState = {
    users: [],
    userForUpdate: null,
    formErrors: {},
    status: '',
    userFavoriteList: [],
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

const getById = createAsyncThunk<IUser, { id: String }>(
    'userSlice/getById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await userService.getById(id);
            return data;
        } catch (error: any) {
            return rejectWithValue({errorsFromDB: error.response.data})
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
        } catch (error: any) {
            return rejectWithValue({errorStatus: error.message})
        }
    }
);

const updateById = createAsyncThunk<IUser, { id: String, user: Partial<IUser> }>(
    'userSlice/updateById',
    async ({id, user}, {rejectWithValue}) => {
        try {
            const {data} = await userService.update(id, user);
            return data;
        } catch (error: any) {
            return rejectWithValue({errorStatus: error.response.data})
        }
    }
);

const getFavoriteListById = createAsyncThunk<Partial<IUser>, { id: String }>(
    'userSlice/getFavoriteListById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await userService.getFavoriteListById(id);
            return data;
        } catch (error: any) {
            return rejectWithValue({errorsFromDB: error.response.data})
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

        initFavoriteList: (state, action) => {
            state.userFavoriteList = action.payload.list;
        },

        addFavoriteItem: (state, action) => {
            const {item, add, index} = action.payload;

            if (add) {
                state.userFavoriteList.push(item);
            } else {
                state.userFavoriteList.splice(index, 1);
            }
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
            .addCase(getById.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.formErrors = {};
            })
            .addCase(getById.rejected, (state, action) => {
                const {errorsFromDB} = action.payload as any;   //{error: '', code: number}
                state.formErrors = errorsFromDB;
            })
            .addCase(deleteById.rejected, (state, action) => {
                const {errorStatus} = action.payload as any;
                state.status = errorStatus;
            })
            .addCase(updateById.fulfilled, (state, action) => {
                const {_id, name, surname} = action.payload as IUser;
                const index = state.users.findIndex(user => user._id === _id);
                state.users[index] = {...state.users[index], ...action.payload};
                state.userForUpdate = null;

                localStorage.setItem(localStorageItemsEnum.LOGIN_USER, `${name} ${surname}` as string);
            })
            .addCase(updateById.rejected, (state, action) => {
                const {errorStatus} = action.payload as any;
                state.status = errorStatus;
            })

            .addCase(getFavoriteListById.fulfilled, (state, action) => {
                const {favoriteList} = action.payload;
                state.userFavoriteList = [...favoriteList as string[]];
                state.formErrors = {};
            })
            .addCase(getFavoriteListById.rejected, (state, action) => {
                const {errorsFromDB} = action.payload as any;   //{error: '', code: number}
                state.formErrors = errorsFromDB;
            })
    },
});

const {reducer: userReducer, actions: {addFavoriteItem, deleteUser, initFavoriteList, setUserForUpdate}} = userSlice;

const userActions = {
    addFavoriteItem,
    deleteById,
    deleteUser,
    initFavoriteList,
    getAll,
    getById,
    getFavoriteListById,
    registerUser,
    setUserForUpdate,
    updateById,
};

export {
    userActions,
    userReducer,
}
