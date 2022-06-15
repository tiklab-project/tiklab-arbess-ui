import React from 'react'
import './pipelineSys.scss'
import {renderRoutes} from "react-router-config";
import SecondarySubMenu from "../../asideMenu/secondarySubMenu";

const PipelineSys= props=>{

    const {route}=props

    const router = [
        {
            key:'1',
            label:'角色设置',
            icon:   <svg className="icon" aria-hidden="true">
                        <use xlinkHref='#icon-fenleiguanli'/>
                    </svg>,
            // enCode:'541',
            children:[
                {
                    key:'/index/task/assembly/domain',
                    label:'功能设置',
                    enCode:'11',
                    icon:   <svg className="icon" aria-hidden="true">
                                <use xlinkHref='#icon-fenleiguanli'/>
                            </svg>,
                    // enCode:'5412'
                },
                {
                    key:'/index/task/assembly/role',
                    label:'角色设置',
                    icon:   <svg className="icon" aria-hidden="true">
                                <use xlinkHref='#icon-fenleiguanli'/>
                            </svg>,
                    // enCode:'5411'
                }
            ]
        },
        {
            key:'/index/task/assembly/membro',
            label:'成员设置',
            icon:   <svg className="icon" aria-hidden="true">
                        <use xlinkHref='#icon-fenleiguanli'/>
                    </svg>,
            // enCode:'542',
        },
        {
            label:'凭证设置',
            key:'/index/task/assembly/proof',
            icon:   <svg className="icon" aria-hidden="true">
                        <use xlinkHref='#icon-fenleiguanli'/>
                    </svg>,
            // enCode:'543',
        },
        {
            key:'/index/task/assembly/other',
            label:'其他设置',
            icon:   <svg className="icon" aria-hidden="true">
                        <use xlinkHref='#icon-fenleiguanli'/>
                    </svg>,
            // enCode:'544',
        },
    ]

    return(
        <div className='pipelineSys'>
            <div className='pipelineSys-content'>
                <SecondarySubMenu pipelineSysRouter={router} type={'sys'}/>
                <div className='pipelineSys-content-right'>
                    {renderRoutes(route.routes)}
                </div>
            </div>
        </div>
    )
}

export default PipelineSys