import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authService} from "../../services";
import {IAuth, ILogin, IUser} from "../../interfaces";

interface IState {
    isAuth: boolean,
    loginError: boolean,

    authStatus: null,
    authErrors: any,
}

const initialState: IState = {
    isAuth: false,
    loginError: false,

    authStatus: null,
    authErrors: {},
};

const login = createAsyncThunk<IAuth, { user: ILogin }>(
    'authSlice/login',
    async ({user}, {rejectWithValue}) => {
        try {
            const {data} = await authService.login(user);

            console.log(data);


            return data;
        } catch (e: any) {
            console.log(e);
            return rejectWithValue({errorStatus: e.message, errorsFromForm: e.response.data});
        }
    }
);

const logout = createAsyncThunk<void, { user: IUser, access: string }>(
    'authSlice/logout',
    async ({user, access}, {dispatch, rejectWithValue}) => {
        try {
            await authService.logout(user, access);
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
            state.loginError = false;
            state.authStatus = null;
            state.authErrors = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                state.loginError = false;
                const {access_token, refresh_token, user} = action.payload;
                const {_id} = user as IUser;

                localStorage.setItem('access', access_token);
                localStorage.setItem('refresh', refresh_token);
                localStorage.setItem('idLoginUser', _id as string);
            })
            .addCase(login.rejected, (state, action) => {
                state.loginError = true;
                const {errorStatus, errorsFromForm} = action.payload as any;
                state.authStatus = errorStatus;
                state.authErrors = errorsFromForm;

                state.isAuth = false;
            })
            .addCase(logout.rejected, (state, action) => {
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