let APP_URL = '//grabthon.com/app';

let API_URL = '//localhost:3333';
if (process.env.NODE_ENV === 'production') {
  API_URL = '//grabthon.com';
}

export const API_HOST = `${API_URL}/api`;

export const ASSETS_URL = `${APP_URL}`;

// public paths
export const simplePath = `${API_URL}/public/simple`;
