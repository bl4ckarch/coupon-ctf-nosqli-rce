export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

export const isAdmin = () => {
  return localStorage.getItem('isAdmin') === 'true';
};

export const login = (token: string, isAdmin: boolean) => {
  localStorage.setItem('token', token);
  localStorage.setItem('isAdmin', String(isAdmin));
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
};