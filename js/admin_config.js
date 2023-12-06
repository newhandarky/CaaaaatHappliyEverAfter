export const headerObj = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
  },
};
