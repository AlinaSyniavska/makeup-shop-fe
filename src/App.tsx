import {FC} from "react";
import {Route, Routes} from "react-router-dom";

import {useAppDispatch} from "./hooks";
import {authActions} from "./redux";
import {AdminLayout} from "./layouts";
import './App.css';
import {BrandPage, CategoryPage, ProductPage, ProductTypePage} from "./pages";

const App: FC = () => {

    const dispatch = useAppDispatch();
    const access = localStorage.getItem('access');

    if(access) {
        dispatch(authActions.setAuth());
    }

    return (
        <Routes>
{/*            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'users'}/>}/>
                <Route path={'users'} element={<RequireAuth><UsersPage/></RequireAuth>}>
                    <Route path={':id'} element={<UserDetailsPage/>}/>
                </Route>
                <Route path={'auth/login'} element={<LoginPage/>}/>
                <Route path={'auth/logout'} element={<LogoutPage/>}/>
                <Route path={'auth/register'} element={<RegisterPage/>}/>
            </Route>*/}

            <Route path={'/admin'} element={<AdminLayout/>}>
                <Route path={'product'} element={<ProductPage/>}/>
                <Route path={'brand'} element={<BrandPage/>}/>
                <Route path={'category'} element={<CategoryPage/>}/>
                <Route path={'productType'} element={<ProductTypePage/>}/>
            </Route>
        </Routes>
    );
};

export {App};