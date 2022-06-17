import React  from 'react'
import './pipelineSys.scss';
import PipelineSysLeftNav from "../components/pipelineSysLeftNav";
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";

const PipelineSys= props=>{

    const {route}=props

    const router = [
        {
            key:'1',
            label:'权限管理',
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
            label:'项目成员',
            icon:   <svg className="icon" aria-hidden="true">
                        <use xlinkHref='#icon-fenleiguanli'/>
                    </svg>,
            enCode:'2',
        },
        {
            key:'/index/task/assembly/proof',
            label:'凭证管理',
            icon:   <svg className="icon" aria-hidden="true">
                        <use xlinkHref='#icon-fenleiguanli'/>
                    </svg>,
            enCode:'3',
        },
        {
            key:'/index/task/assembly/other',
            label:'其他管理',
            icon:   <svg className="icon" aria-hidden="true">
                        <use xlinkHref='#icon-fenleiguanli'/>
                    </svg>,
            enCode:'4',
        },
    ]

    return (
        <div className='pipelineSys'>
            <div className='pipelineSys-left'>
                <PipelineSysLeftNav {...props} router={router}/>
            </div>
            <div className='pipelineSys-content'>
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default withRouter(PipelineSys)