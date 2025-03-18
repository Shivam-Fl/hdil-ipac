// utils/auth.js
export const getAuth = () => {
    const token = localStorage.getItem("IPACAuthToken");
    const role = localStorage.getItem("IPACRole");
    return { token, role };
  };
  