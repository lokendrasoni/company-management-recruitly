import { createContext } from "react";

const UserStore = createContext({
    isLogin: false,
    setIsLogin: (_val: boolean) => {}
});

export default UserStore;