import axios from "../custom/axios";

// Login
const loginUser = (data) => { return axios.post(`/api/v1/admin/user/login`, { data, }); };
const logoutUser = (data) => { return axios.post(`/api/v1/admin/user/logout`, { data, }); };
const registerUser = (data) => { return axios.post(`/api/v1/admin/user/register`, { data, }); };
const readJWT = () => { return axios.get(`/api/v1/admin/user/jwt-token`); };

// CRUD User
const createUser = (data) => { return axios.post(`/api/v1/admin/user/create`, { data, }); };
const readUser = (currentPage, currentLimit) => { return axios.get(`/api/v1/admin/user/read`, { params: { page: currentPage, limit: currentLimit, }, }); };
const updateUser = (data) => { return axios.put(`/api/v1/admin/user/update`, { data, }); };
const deleteUser = (id) => { return axios.delete(`/api/v1/admin/user/delete`, { data: { id: id, }, }); };

// CRUD Group
const createGroup = (data) => { return axios.post(`/api/v1/admin/group/create`, { data, }); };
const readGroup = (currentPage, currentLimit) => { return axios.get(`/api/v1/admin/group/read`, { params: { page: currentPage, limit: currentLimit, }, }); };
const updateGroup = (data) => { return axios.put(`/api/v1/admin/group/update`, { data, }); };
const deleteGroup = (id) => { return axios.delete(`/api/v1/admin/group/delete`, { data: { id: id, }, }); };

// CRUD Group Role
const createGroupRole = (data) => { return axios.post(`/api/v1/admin/group-role/create`, { data, }); };
const readGroupRole = (currentPage, currentLimit) => { return axios.get(`/api/v1/admin/group-role/read`, { params: { page: currentPage, limit: currentLimit, }, }); };
const updateGroupRole = (data) => { return axios.put(`/api/v1/admin/group-role/update`, { data, }); };
const deleteGroupRole = (id) => { return axios.delete(`/api/v1/admin/group-role/delete`, { data: { id: id, }, }); };

// CRUD Role
const createRole = (data) => { return axios.post(`/api/v1/admin/role/create`, { data, }); };
const readRole = (currentPage, currentLimit) => { return axios.get(`/api/v1/admin/role/read`, { params: { page: currentPage, limit: currentLimit, }, }); };
const updateRole = (data) => { return axios.put(`/api/v1/admin/role/update`, { data, }); };
const deleteRole = (id) => { return axios.delete(`/api/v1/admin/role/delete`, { data: { id: id, }, }); };

// CRUD Product
const createProduct = (data) => { return axios.post(`/api/v1/admin/product/create`, { data, }); };
const readProduct = (currentPage, currentLimit) => { return axios.get(`/api/v1/admin/product/read`, { params: { page: currentPage, limit: currentLimit }, }); };
const readProductDetail = (slug) => { return axios.get(`/api/v1/admin/product/read/${slug}`); };
const updateProduct = (data) => { return axios.put(`/api/v1/admin/product/update`, { data, }); };
const deleteProduct = (id) => { return axios.delete(`/api/v1/admin/product/delete`, { data: { id: id, }, }); };

// CRUD Categories
const createCategories = (data) => { return axios.post(`/api/v1/admin/categories/create`, { data, }); };
const readCategories = (currentPage, currentLimit) => { return axios.get(`/api/v1/admin/categories/read`, { params: { page: currentPage, limit: currentLimit, }, }); };
const updateCategories = (data) => { return axios.put(`/api/v1/admin/categories/update`, { data, }); };
const deleteCategories = (id) => { return axios.delete(`/api/v1/admin/categories/delete`, { data: { id: id, }, }); };

// CRUD Brand
const createBrand = (data) => { return axios.post(`/api/v1/admin/brand/create`, { data, }); };
const readBrand = (currentPage, currentLimit) => { return axios.get(`/api/v1/admin/brand/read`, { params: { page: currentPage, limit: currentLimit, }, }); };
const updateBrand = (data) => { return axios.put(`/api/v1/admin/brand/update`, { data, }); };
const deleteBrand = (id) => { return axios.delete(`/api/v1/admin/brand/delete`, { data: { id: id, }, }); };

// CRUD Cart
// const createCart = (data) => { return axios.post(`/api/v1/admin/cart/create`, { data, }); };
// const readCart = (currentPage, currentLimit, productId) => { return axios.get(`/api/v1/admin/cart/read`, { params: { page: currentPage, limit: currentLimit, productId: productId, }, }); };
// const updateCart = (data) => { return axios.put(`/api/v1/admin/cart/update`, { data, }); };
// const deleteCart = (id) => { return axios.delete(`/api/v1/admin/cart/delete`, { data: { id: id, }, }); };

export {
  loginUser, logoutUser, registerUser, readJWT,
  createUser, readUser, updateUser, deleteUser,
  createGroup, readGroup, updateGroup, deleteGroup,
  createGroupRole, readGroupRole, updateGroupRole, deleteGroupRole,
  createRole, readRole, deleteRole, updateRole,
  createProduct, readProduct, updateProduct, deleteProduct,
  createCategories, readCategories, updateCategories, deleteCategories,
  createBrand, readBrand, updateBrand, deleteBrand,
  readProductDetail
  // , createCart, readCart, deleteCart,
};
