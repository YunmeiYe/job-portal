const setItem = (key: string, value: string | number | boolean | object) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const getItem = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string);
}

const removeItem = (key: string) => {
  localStorage.removeItem(key);
}

const setAuthLocalStorage = (user: any, accessToken:string, exp:number) => {
  setItem("user", user);
  setItem("accessToken", accessToken);
  setItem("exp", exp);
}

const clearAuthLocalStorage = () => {
  removeItem("user");
  removeItem("accessToken");
  removeItem("exp");
}

export {setItem, getItem, removeItem, setAuthLocalStorage, clearAuthLocalStorage}