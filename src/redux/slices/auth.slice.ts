import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services";
import { IAuth, ILogin, IUser } from "../../interfaces";
import { localStorageItemsEnum } from "../../constants";

interface IState {
  isAuth: boolean;
  authStatus: null;
  authErrors: any;
  logUser: Partial<IUser>;
}

const initialState: IState = {
  isAuth: false,
  authStatus: null,
  authErrors: {},
  logUser: {},
};

const login = createAsyncThunk<IAuth, { user: ILogin }>(
  "authSlice/login",
  async ({ user }, { rejectWithValue }) => {
    try {
      const { data } = await authService.login(user);

      return data;
    } catch (e: any) {
      return rejectWithValue({
        errorStatus: e.message,
        errorsFromForm: e.response.data,
      });
    }
  }
);

const logout = createAsyncThunk<void, { access_token: string }>(
  "authSlice/logout",
  async ({ access_token }, { dispatch, rejectWithValue }) => {
    try {
      await authService.logout(access_token);
      dispatch(logoutUser());
    } catch (e: any) {
      return rejectWithValue({ errorStatus: e.message });
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuth = true;
    },

    logoutUser: (state) => {
      state.isAuth = false;
      state.authStatus = null;
      state.authErrors = {};
      state.logUser = {};
      localStorage.removeItem(localStorageItemsEnum.ACCESS);
      localStorage.removeItem(localStorageItemsEnum.REFRESH);
      localStorage.removeItem(localStorageItemsEnum.LOGIN_USER);
      localStorage.removeItem(localStorageItemsEnum.ID_LOGIN_USER);
    },

    editLogUserInfo: (state, action) => {
      const { user } = action.payload;
      const { name, surname } = user as IUser;
      state.logUser.name = name;
      state.logUser.surname = surname;
    },

    clearErrors: (state) => {
      state.authStatus = null;
      state.authErrors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        const { access_token, refresh_token, user } = action.payload;
        const { _id, name, surname, favoriteList } = user as IUser;
        state.logUser.name = name;
        state.logUser.surname = surname;
        state.logUser._id = _id;
        state.logUser.favoriteList = favoriteList;

        localStorage.setItem(localStorageItemsEnum.ACCESS, access_token);
        localStorage.setItem(localStorageItemsEnum.REFRESH, refresh_token);
        localStorage.setItem(
          localStorageItemsEnum.LOGIN_USER,
          `${name} ${surname}` as string
        );
        localStorage.setItem(
          localStorageItemsEnum.ID_LOGIN_USER,
          _id as string
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuth = false;
        const { errorStatus, errorsFromForm } = action.payload as any;
        state.authStatus = errorStatus;
        state.authErrors = errorsFromForm;
      })
      .addCase(logout.rejected, (state, action) => {
        const { errorStatus } = action.payload as any;
        state.authStatus = errorStatus;
      });
  },
});

const {
  reducer: authReducer,
  actions: { clearErrors, editLogUserInfo, logoutUser, setAuth },
} = authSlice;

const authActions = {
  clearErrors,
  editLogUserInfo,
  login,
  logout,
  logoutUser,
  setAuth,
};

export { authReducer, authActions };
