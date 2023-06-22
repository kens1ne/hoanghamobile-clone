import instance from "./instance";
import { ILogin, IRegister } from "../types/auth";

export const handleLogin = (data : ILogin) => {
    return instance.post('/auth/signin', data)
}

export const handleRegister = (data : IRegister) => {
    return instance.post('/auth/signup', data)
}

export const handleAccessToken = () => {
    return instance.post('/tokens')
}