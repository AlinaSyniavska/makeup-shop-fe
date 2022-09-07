import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authService} from "../../services";
import {IAuth, ILogin, IUser} from "../../interfaces";

interface IState {
    isAuth: boolean,
    authStatus: null,
    authErrors: any,
    logUser: Partial<IUser>,
}

const initialState: IState = {
    isAuth: false,
    authStatus: null,
    authErrors: {},
    logUser: {},
};

const login = createAsyncThunk<IAuth, { user: ILogin }>(
    'authSlice/login',
    async ({user}, {rejectWithValue}) => {
        try {
            const {data} = await authService.login(user);

            return data;
        } catch (e: any) {
            return rejectWithValue({errorStatus: e.message, errorsFromForm: e.response.data});
        }
    }
);

const logout = createAsyncThunk<void, { access_token: string }>(
    'authSlice/logout',
    async ({access_token}, {dispatch, rejectWithValue}) => {
        try {
            await authService.logout(access_token);
            dispatch(logoutUser());
        } catch (e: any) {
            return rejectWithValue({errorStatus: e.message});
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuth: state => {
            state.isAuth = true;
        },

        logoutUser: state => {
            state.isAuth = false;
            state.authStatus = null;
            state.authErrors = {};
            state.logUser = {};
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                const {access_token, refresh_token, user} = action.payload;
                const {_id, name, surname} = user as IUser;
                state.logUser.name = name;
                state.logUser.surname = surname;
                state.logUser._id = _id;

                localStorage.setItem('access', access_token);
                localStorage.setItem('refresh', refresh_token);
                localStorage.setItem('idLoginUser', _id as string);
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuth = false;
                const {errorStatus, errorsFromForm} = action.payload as any;
                state.authStatus = errorStatus;
                state.authErrors = errorsFromForm;

            })
            .addCase(logout.rejected, (state, action) => {

                console.log(action.payload);

                const {errorStatus} = action.payload as any;
                state.authStatus = errorStatus;
            })
    }
});

const {reducer: authReducer, actions: {setAuth, logoutUser}} = authSlice;

const authActions = {
    login,
    logout,
    logoutUser,
    setAuth,
}

export {
    authReducer,
    authActions
}