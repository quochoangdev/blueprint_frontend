import axios from "../custom/axios";

// Login
const loginUser = (data) => { return axios.post(`/api/v1/user/login`, { data, }); };
const logoutUser = (data) => { return axios.post(`/api/v1/user/logout`, { data, }); };
const registerUser = (data) => { return axios.post(`/api/v1/user/register`, { data, }); };
const readJWT = (currentPage, currentLimit) => { return axios.get(`/api/v1/user/jwt-token`); };

// Read User
const readUser = (idUser) => { return axios.get(`/api/v1/user/read`, { params: { idUser }, }); };
const updateUser = (data) => { return axios.put(`/api/v1/user/update`, { data, }); };

// Read Group
const readGroup = (currentPage, currentLimit) => { return axios.get(`/api/v1/group/read`, { params: { page: currentPage, limit: currentLimit, }, }); };

// Read Group Role
const readGroupRole = (currentPage, currentLimit) => { return axios.get(`/api/v1/group-role/read`, { params: { page: currentPage, limit: currentLimit, }, }); };

// Read Role
const readRole = (currentPage, currentLimit) => { return axios.get(`/api/v1/role/read`, { params: { page: currentPage, limit: currentLimit, }, }); };

// Read Product
const readProduct = (currentPage, currentLimit,) => { return axios.get(`/api/v1/product/read`, { params: { page: currentPage, limit: currentLimit }, }); };
const readProductId = (currentPage, currentLimit, ProductId) => { return axios.get(`/api/v1/product/read`, { params: { page: currentPage, limit: currentLimit, id: ProductId, }, }); };
const readProductFilter = (currentPage, currentLimit, categories, brand, version, sort) => { return axios.get(`/api/v1/product/read`, { params: { page: currentPage, limit: currentLimit, categories, brand, version, sort } }); };
const readProductSearch = (currentPage, currentLimit, search) => { return axios.get(`/api/v1/product/read`, { params: { page: currentPage, limit: currentLimit, search } }); };
const readProductDetail = (slug) => { return axios.get(`/api/v1/product/read/${slug}`); };

// Read Category
const readCategory = (currentPage, currentLimit) => { return axios.get(`/api/v1/categories/read`, { params: { page: currentPage, limit: currentLimit, }, }); };

// Read Brand
const readBrand = (currentPage, currentLimit) => { return axios.get(`/api/v1/brand/read`, { params: { page: currentPage, limit: currentLimit, }, }); };

// Read Cities
const readCities = (idCities) => { return axios.get(`/api/v1/cities/read`, { params: { idCities } }) };

// Read Districts
const readDistricts = (idCities, idDistricts) => { return axios.get(`/api/v1/districts/read`, { params: { idCities, idDistricts } }) };

// Read Cart
const addCart = (data) => { return axios.post(`/api/v1/cart/add`, { data, }); };
const createCart = (data) => { return axios.post(`/api/v1/cart/create`, { data, }); };
const readCart = (currentPage, currentLimit, idUser) => { return axios.get(`/api/v1/cart/read`, { params: { page: currentPage, limit: currentLimit, idUser }, }); };
const readCartTotal = (idUser) => { return axios.get(`/api/v1/cart/read`, { params: { idUser }, }) };
const readCartWithOrderId = (idOrder) => { return axios.get(`/api/v1/order/read-cart`, { params: { idOrder }, }) };
const deleteCart = (idUser, idProduct) => { return axios.delete(`/api/v1/cart/delete`, { data: { idUser, idProduct } }) };

const updateCart = (idCart, idOrder) => { return axios.put(`/api/v1/cart/update`, { idCart, idOrder }); };

// Read Order
const createOrderWithUser = (idUser) => { return axios.post(`/api/v1/order/create`, { idUser }) };
const readOrder = (currentPage, currentLimit, idUser) => { return axios.get(`/api/v1/order/read`, { params: { page: currentPage, limit: currentLimit, idUser }, }); };
const deleteOrder = (id) => { return axios.delete(`/api/v1/order/delete`, { data: { id } }) };

// Send Mail
const sendMailer = (data) => { return axios.post(`/api/v1/send-mail`, { data }) };
const sendMailerContact = (data) => { return axios.post(`/api/v1/send-mail-contact`, { data }) };

export {
    loginUser, logoutUser, registerUser, readJWT,
    readUser, readGroup, readRole, readGroupRole, updateUser,
    readProduct, readProductId, readProductFilter, readProductSearch, readProductDetail,
    readCategory, readBrand, readCities, readDistricts,
    addCart, createCart, readCart, readCartTotal, updateCart, deleteCart, readCartWithOrderId,
    createOrderWithUser, readOrder, deleteOrder,
    sendMailer, sendMailerContact
};
