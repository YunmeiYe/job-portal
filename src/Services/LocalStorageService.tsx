// class LocalStorageService {
//   setItem(key: string, value: string) { 
//     localStorage.setItem(key, JSON.stringify(value));
//   };
//   getItem(key: string) {
//     return JSON.parse(localStorage.getItem(key) as string);
//   };
//   removeItem(key: string) {
//     localStorage.removeItem(key);
//   }
//   clearAll() {
//     localStorage.clear();
//   }
// }

// export default new LocalStorageService();

const setItem = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const getItem = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string);
}

const removeItem = (key: string) => {
  localStorage.removeItem(key);
}

export {setItem, getItem, removeItem}