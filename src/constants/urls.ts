const baseURL = process.env.REACT_APP_API;

const urls = {
    users: '/users',
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refreshToken',
}

const adminUrls = {
    brand: '/admin/brand',
    category: '/admin/category',
    productType: '/admin/productType',
    admin: '/admin',
}

export default baseURL;

export {
    adminUrls,
    urls
};