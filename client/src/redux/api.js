import {
  registerPending,
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginStart,
  loginFailure,
  updateUser,
} from './userSlice';

import { publicRequest, userRequest } from './requestMethod';
import {
  addProduct,
  deleteProduct,
  showError,
  startLoading,
  updateProduct,
  getProduct
} from './productSlice';
import { addNews, getNew } from './newsSlice';
import { getTeam, loading } from './teamSlice';
import { addOrder, fetchOrder, isError, isLoading, updateOrder } from './orderSlice';

export const register = async (dispatch, user) => {
  dispatch(registerPending());
  try {
    const res = await publicRequest.post('/auth/register', user);
    dispatch(registerSuccess(res.data));
    // navigate('/');
  } catch (error) {
    dispatch(registerFailure());
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
    // navigate('/');
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const update = async (dispatch, user, email, id) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.patch(`/users/${id}`, user, email);
    dispatch(updateUser(res.data));
    // navigate('/');
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const addProducts = async (dispatch, product, navigate) => {
  dispatch(startLoading());
  try {
    const res = await userRequest.post('/products', product);
    dispatch(addProduct(res.data));
    navigate('/products');
  } catch (error) {
    dispatch(showError());
  }
};

export const updateProducts = async (dispatch, id, product) => {
  dispatch(startLoading());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProduct(res.data));
  } catch (error) {
    dispatch(showError());
  }
};

export const deleteProducts = async (dispatch, id) => {
  dispatch(startLoading());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProduct(id));
  } catch (error) {
    dispatch(showError());
  }
};

export const addNew = async (dispatch, news, navigate) => {
  dispatch(loading());
  try {
    const res = await userRequest.post('/news', news);
    dispatch(addNews(res.data));
    navigate('/news');
  } catch (error) {
    dispatch(error());
  }
};

export const getNewsDetail = async (dispatch, id) => {
  dispatch(loading());
  try {
    const res = await publicRequest.get(`/news/find/${id}`);
    dispatch(getNew(res.data));
  } catch (error) {
    dispatch(error());
  }
};

export const getProductDetails = async (dispatch, productId) => {
  dispatch(startLoading());
  try {
    const res = await publicRequest.get(`/products/find/${productId}`);
    dispatch(getProduct(res.data));
  } catch (error) {
    dispatch(showError());
  }
};

export const getTeamDetails = async (dispatch, teamId) => {
  dispatch(startLoading());
  try {
    const res = await publicRequest.get(`/teams/find/${teamId}`);
    dispatch(getTeam(res.data));
  } catch (error) {
    dispatch(showError());
  }
};

export const orderAction = async (dispatch, items) => {
  dispatch(isLoading())
  try{
  const res = await userRequest.post(`/orders`, items)
  dispatch(addOrder(res.data))
  } catch (error) {
    dispatch(isError());
  }
}

export const getOrder = async (dispatch, id) => {
  dispatch(isLoading())
  try{
  const res = await userRequest.get(`/orders/mine/${id}`,)
  dispatch(fetchOrder(res.data))
  } catch (error) {
    dispatch(isError());
  }
}

export const updateAdminOrder = async (dispatch, id, value, navigate) => {
  dispatch(isLoading())
  try{
  const res = await userRequest.put(`/orders/admin/${id}`, value)
  dispatch(updateOrder(res.data))
  navigate('/admin')
  } catch (error) {
    dispatch(isError());
  }
}

export const updateUserOrder = async (dispatch, id, value) => {
  dispatch(isLoading())
  try{
  const res = await userRequest.put(`/orders/mine/payment/${id}`, value)
  dispatch(updateOrder(res.data))
  } catch (error) {
    dispatch(isError());
  }
}








