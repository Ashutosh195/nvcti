export const isAdminLogin = (token) => {
  if (localStorage.getItem(token)) {
    return true;
  }
   return false;
};
