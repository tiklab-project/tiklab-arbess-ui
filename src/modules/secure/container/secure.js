import React, {Fragment} from "react";
import {renderRoutes} from "react-router-config";
import './secure.scss'
import SecondarySubMenu from "../../asideMenu/secondarySubMenu";

const Secure = props =>{

    const {route}=props

    const router = [
        {
            key:'1',
            label:'权限设置',
            icon: <svg className="icon" aria-hidden="true">
                    <use xlinkHref='#icon-fenleiguanli'/>
                  </svg>,
            enCode:'31',
            children:[
                {
                    label:'功能设置',
                    key:'/index/system/secure/powerDomain',
                    icon:   <svg className="icon" aria-hidden="true">
                                <use xlinkHref='#icon-fenleiguanli'/>
                            </svg>,
                },
                {
                    label:'角色设置',
                    key:'/index/system/secure/powerRole',
                    icon: <svg className="icon" aria-hidden="true">
                                <use xlinkHref='#icon-fenleiguanli'/>
                            </svg>,
                }
            ]
        },
        {
            label:'凭证设置',
            key:'/index/system/secure/proof',
            icon: <svg className="icon" aria-hidden="true">
                    <use xlinkHref='#icon-fenleiguanli'/>
                </svg>,
            enCode:'32',
        },
    ]

    return(
        <Fragment>
            <SecondarySubMenu secureRouter={router} type={'secure'}/>
            <div className='secure'>
                {renderRoutes(route.routes)}
            </div>
        </Fragment>
    )
}

export default Secure