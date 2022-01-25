/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2022-01-05 15:35:09
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-01-15 17:41:12
 */
import React, {useState, useEffect} from 'react';
import {Axios} from "doublekit-core-ui";


const useAccountConfig = () => {
    const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('authConfig')) || {})
    useEffect(() => {
        getProjectAuthentication()
        return () => {
            setAuthData({})
        }
    }, []);

    // 获取登录配置数据
    const getProjectAuthentication = () => {
        Axios.post('/authConfig/getAuthConfig').then(data => {
            if (!data.code) {
                localStorage.setItem('authConfig', JSON.stringify(data.data))
                setAuthData(data.data)
            }
        })
    }

    return authData
}

export default useAccountConfig;