import axios from "../custom/axios";

// Login
const loginUser = (data) => { return axios.post(`/v1/user/login`, { data, }); };
const logoutUser = (data) => { return axios.post(`/v1/user/logout`, { data, }); };
const registerUser = (data) => { return axios.post(`/v1/user/register`, { data, }); };
const readJWT = (currentPage, currentLimit) => { return axios.get(`/v1/user/jwt-token`); };

// CRUD User
const readUser = (currentPage, currentLimit) => { return axios.get(`/v1/user/read`, { params: { page: currentPage, limit: currentLimit, }, }); };

// CRUD Group
const readGroup = (currentPage, currentLimit) => { return axios.get(`/v1/group/read`, { params: { page: currentPage, limit: currentLimit, }, }); };

// CRUD Group Role
const readGroupRole = (currentPage, currentLimit) => { return axios.get(`/v1/group-role/read`, { params: { page: currentPage, limit: currentLimit, }, }); };

// CRUD Role
const readRole = (currentPage, currentLimit) => { return axios.get(`/v1/role/read`, { params: { page: currentPage, limit: currentLimit, }, }); };

// CRUD Product
const readProduct = (currentPage, currentLimit, categories, search, ProductId) => { return axios.get(`/v1/product/read`, { params: { page: currentPage, limit: currentLimit, categories: categories, search: search, id: ProductId, }, }); };
const readProductDetail = (slug) => { return axios.get(`/v1/product/read/${slug}`); };

// CRUD Category
const readCategory = (currentPage, currentLimit) => { return axios.get(`/v1/categories/read`, { params: { page: currentPage, limit: currentLimit, }, }); };

// CRUD Brand
const readBrand = (currentPage, currentLimit) => { return axios.get(`/v1/brand/read`, { params: { page: currentPage, limit: currentLimit, }, }); };

// CRUD Cart
const deleteCart = (id) => { return axios.delete(`/v1/cart/delete`, { data: { id: id, }, }); };
const readCart = (currentPage, currentLimit, productId) => { return axios.get(`/v1/cart/read`, { params: { page: currentPage, limit: currentLimit, productId: productId, }, }); };

export { loginUser, logoutUser, registerUser, readJWT, readUser, readGroup, readRole, readProduct, readCategory, readBrand, readGroupRole, readProductDetail, readCart, deleteCart };
