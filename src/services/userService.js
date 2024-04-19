// import axios from "axios";
import axios from "../custom/axios";

// Login
const loginUser = (data) => {
  return axios.post(`/api/v1/user/login`, {
    data,
  });
};

// Logout
const logoutUser = (data) => {
  return axios.post(`/api/v1/user/logout`, {
    data,
  });
};

// Register
const registerUser = (data) => {
  return axios.post(`/api/v1/user/register`, {
    data,
  });
};

// Read JWT
const readJWT = (currentPage, currentLimit) => {
  return axios.get(`/api/v1/user/jwt-token`);
};

// CRUD User
const createUser = (data) => {
  return axios.post(`/api/v1/user/create`, {
    data,
  });
};

const readUser = (currentPage, currentLimit) => {
  return axios.get(`/api/v1/user/read`, {
    params: {
      page: currentPage,
      limit: currentLimit,
    },
  });
};

const updateUser = (data) => {
  return axios.put(`/api/v1/user/update`, {
    data,
  });
};

const deleteUser = (id) => {
  return axios.delete(`/api/v1/user/delete`, {
    data: {
      id: id,
    },
  });
};

// CRUD Group
const createGroup = (data) => {
  return axios.post(`/api/v1/group/create`, {
    data,
  });
};

const readGroup = (currentPage, currentLimit) => {
  return axios.get(`/api/v1/group/read`, {
    params: {
      page: currentPage,
      limit: currentLimit,
    },
  });
};

const updateGroup = (data) => {
  return axios.put(`/api/v1/group/update`, {
    data,
  });
};

const deleteGroup = (id) => {
  return axios.delete(`/api/v1/group/delete`, {
    data: {
      id: id,
    },
  });
};

// CRUD Group Role
const createGroupRole = (data) => {
  return axios.post(`/api/v1/group-role/create`, {
    data,
  });
};

const readGroupRole = (currentPage, currentLimit) => {
  return axios.get(`/api/v1/group-role/read`, {
    params: {
      page: currentPage,
      limit: currentLimit,
    },
  });
};

const updateGroupRole = (data) => {
  return axios.put(`/api/v1/group-role/update`, {
    data,
  });
};

const deleteGroupRole = (id) => {
  return axios.delete(`/api/v1/group-role/delete`, {
    data: {
      id: id,
    },
  });
};

// CRUD Role
const createRole = (data) => {
  return axios.post(`/api/v1/role/create`, {
    data,
  });
};

const readRole = (currentPage, currentLimit) => {
  return axios.get(`/api/v1/role/read`, {
    params: {
      page: currentPage,
      limit: currentLimit,
    },
  });
};

const updateRole = (data) => {
  return axios.put(`/api/v1/role/update`, {
    data,
  });
};

const deleteRole = (id) => {
  return axios.delete(`/api/v1/role/delete`, {
    data: {
      id: id,
    },
  });
};

// CRUD Product
const createProduct = (data) => {
  return axios.post(`/api/v1/product/create`, {
    data,
  });
};

const readProduct = (currentPage, currentLimit, category, search, ProductId) => {
  return axios.get(`/api/v1/product/read`, {
    params: {
      page: currentPage,
      limit: currentLimit,
      category: category,
      search: search,
      id: ProductId,
    },
  });
};

const readProductDetail = (slug) => {
  return axios.get(`/api/v1/product/read/${slug}`);
};

const updateProduct = (data) => {
  return axios.put(`/api/v1/product/update`, {
    data,
  });
};

const deleteProduct = (id) => {
  return axios.delete(`/api/v1/product/delete`, {
    data: {
      id: id,
    },
  });
};

// CRUD Category
const createCategory = (data) => {
  return axios.post(`/api/v1/category/create`, {
    data,
  });
};

const readCategory = (currentPage, currentLimit) => {
  return axios.get(`/api/v1/category/read`, {
    params: {
      page: currentPage,
      limit: currentLimit,
    },
  });
};

const updateCategory = (data) => {
  return axios.put(`/api/v1/category/update`, {
    data,
  });
};

const deleteCategory = (id) => {
  return axios.delete(`/api/v1/category/delete`, {
    data: {
      id: id,
    },
  });
};

// CRUD Heart
const createHeart = (data) => {
  return axios.post(`/api/v1/heart/create`, {
    data,
  });
};

const readHeart = (currentPage, currentLimit, productId) => {
  return axios.get(`/api/v1/heart/read`, {
    params: {
      page: currentPage,
      limit: currentLimit,
      productId: productId,
    },
  });
};

// const updateHeart = (data) => {
//   return axios.put(`/api/v1/heart/update`, {
//     data,
//   });
// };

const deleteHeart = (id) => {
  console.log(id);
  return axios.delete(`/api/v1/heart/delete`, {
    data: {
      id: id,
    },
  });
};

export {
  loginUser,
  registerUser,
  createUser,
  readUser,
  updateUser,
  deleteUser,
  readGroup,
  createGroup,
  readRole,
  deleteRole,
  createRole,
  updateRole,
  logoutUser,
  readJWT,
  createProduct,
  readProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
  updateGroup,
  deleteGroup,
  createGroupRole,
  readGroupRole,
  updateGroupRole,
  deleteGroupRole,
  readProductDetail,
  createHeart,
  readHeart,
  deleteHeart,
};
