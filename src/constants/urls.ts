const baseURL = process.env.REACT_APP_API;

const urls = {
    users: '/users',
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refreshToken',
}

const adminUrls = {
    admin: '/admin',
    brand: '/admin/brand',
    category: '/admin/category',
    productType: '/admin/productType',
    product: '/admin/product',
}

const urlGetData = {
    brand: 'brand',
    category: 'category',
    productType: 'productType',
}

export default baseURL;

export {
    adminUrls,
    urls,
    urlGetData,
};