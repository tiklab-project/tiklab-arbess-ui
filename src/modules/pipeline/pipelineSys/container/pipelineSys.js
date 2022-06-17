import React from 'react'
import './pipelineSys.scss'
import SecondarySubMenuRender from "../../../menu/renderMenu/secondarySubMenuRender";

const PipelineSys= props=>{

    const {route}=props

    const router = [
        {
            key:'1',
            label:'角色设置',
            icon:   <svg className="icon" aria-hidden="true">
                        <use xlinkHref='#icon-fenleiguanli'/>
                    </svg>,
            enCode:'1',
            children:[
                {
                    key:'/index/task/assembly/domain',
                    label:'功能管理',
                    icon:   <svg className="icon" aria-hidden="true">
                                <use xlinkHref='#icon-fenleiguanli'/>
                            </svg>,
                    enCode:'11'
                },
                {
                    key:'/index/task/assembly/role',
                    label:'角色管理',
                    icon:   <svg className="icon" aria-hidden="true">
                                <use xlinkHref='#icon-fenleiguanli'/>
                            </svg>,
                    enCode:'12'
                }
            ]
        },
        {
            key:'/index/task/assembly/membro',
            label:'成员设置',
            icon:   <svg className="icon" aria-hidden="true">
                        <use xlinkHref='#icon-fenleiguanli'/>
                    </svg>,
            enCode:'2',
        },
        {
            key:'/index/task/assembly/proof',
            label:'凭证设置',
            icon:   <svg className="icon" aria-hidden="true">
                        <use xlinkHref='#icon-fenleiguanli'/>
                    </svg>,
            enCode:'3',
        },
        {
            key:'/index/task/assembly/other',
            label:'其他设置',
            icon:   <svg className="icon" aria-hidden="true">
                        <use xlinkHref='#icon-fenleiguanli'/>
                    </svg>,
            enCode:'4',
        },
    ]

    return <SecondarySubMenuRender
                {...props}
                pipelineSysRouter={router}
                type={'sys'}
                route={route}
                className={'pipelineSys'}
            />
}

export default PipelineSys