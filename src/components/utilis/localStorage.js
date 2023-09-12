export const setToken = (token) => {
    localStorage.setItem("access_token", token);
  };
  export const getToken = () => {
    return localStorage.getItem("access_token");
  };
  export const deleteToken = () => {
    localStorage.removeItem("access_token");
  };
  export const setIsPaid = (flag) => {
    var string_flag = flag.toString();
    localStorage.setItem("is_paid", string_flag);
  };
  export const getIsPaid = () => {
    var data = localStorage.getItem("is_paid");
    if (data != null && data === "true") {
      return true;
    } else {
      return false;
    }
  };
  
  export const removeIsPaid = () => {
    localStorage.removeItem("is_paid");
  };