import {FC} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {useAppDispatch} from "./hooks";
import {authActions} from "./redux";
import {AdminLayout, MainLayout} from "./layouts";
import './App.css';
import {
    BrandPage, CartPage,
    CatalogProductPage,
    CategoryPage,
    LoginPage, LogoutPage, NotFoundPage, ProductDetailsPage,
    ProductPage,
    ProductTypePage,
    RegisterPage
} from "./pages";

const App: FC = () => {

    const dispatch = useAppDispatch();
    const access = localStorage.getItem('access');

    if(access) {
        dispatch(authActions.setAuth());
    }

    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'home'}/>}/>
                <Route path={'home'} element={<CatalogProductPage/>}/>

                <Route path={'home/product/:id'} element={<ProductDetailsPage/>}/>

                <Route path={'category/cream/face'} element={<CatalogProductPage/>}/>
                <Route path={'category/cream/body'} element={<CatalogProductPage/>}/>
                <Route path={'category/eyebrow'} element={<CatalogProductPage/>}/>
                <Route path={'category/eyeshadow/palette'} element={<CatalogProductPage/>}/>
                <Route path={'category/eyeshadow/pencil'} element={<CatalogProductPage/>}/>
                <Route path={'category/eyeshadow/cream'} element={<CatalogProductPage/>}/>
                <Route path={'category/powder'} element={<CatalogProductPage/>}/>
                <Route path={'category/lipstick/lipstick'} element={<CatalogProductPage/>}/>
                <Route path={'category/lipstick/lipgloss'} element={<CatalogProductPage/>}/>
                <Route path={'category/mascara'} element={<CatalogProductPage/>}/>

                <Route path={'auth/login'} element={<LoginPage/>}/>
                <Route path={'auth/logout'} element={<LogoutPage/>}/>
                <Route path={'auth/register'} element={<RegisterPage/>}/>

                <Route path={'cart'} element={<CartPage/>}/>

                <Route path={'*'} element={<NotFoundPage/>}/>
            </Route>

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