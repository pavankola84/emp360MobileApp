import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:4242/';

export const createRazorpay = (amount: string, currency: string) => {
  return axios.post(BASE_URL + 'razorpay', {amount, currency});
};

export const createStripe = (amount: string, currency: string) => {
  return axios.post(BASE_URL + 'stripe', {amount, currency});
};

export const createPaypal = (amount: number, currency: string) => {
  return axios.post(BASE_URL + 'paypal', {amount, currency});
};
