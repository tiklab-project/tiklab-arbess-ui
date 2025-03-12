/**
 * @Description: 系统设置入口
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {renderRoutes} from "react-router-config";

const Setting = props =>{

    const {route} = props

    return renderRoutes(route.routes)

}

export default Setting
