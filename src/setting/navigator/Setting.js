import React from "react";
import {renderRoutes} from "react-router-config";

/**
 * 系统设置页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Setting = props =>{

    const {route} = props

    return renderRoutes(route.routes)

}

export default Setting
