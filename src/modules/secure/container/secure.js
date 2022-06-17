import React from "react";
import './secure.scss'
import SecondarySubMenuRender from "../../menu/renderMenu/secondarySubMenuRender";

const Secure = props =>{

    const {route}=props

    const router = [
        {
            key:'1',
            label:'权限设置',
            icon:    <svg className="icon" aria-hidden="true">
                        <use xlinkHref='#icon-fenleiguanli'/>
                     </svg>,
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
                    icon:   <svg className="icon" aria-hidden="true">
                                <use xlinkHref='#icon-fenleiguanli'/>
                            </svg>,
                }
            ]
        },
        {
            label:'凭证设置',
            key:'/index/system/secure/proof',
            icon:   <svg className="icon" aria-hidden="true">
                        <use xlinkHref='#icon-fenleiguanli'/>
                    </svg>,


        },
    ]

    return  <SecondarySubMenuRender
                {...props}
                secureRouter={router}
                type={'secure'}
                route={route}
                className={'secure'}
            />
}

export default Secure