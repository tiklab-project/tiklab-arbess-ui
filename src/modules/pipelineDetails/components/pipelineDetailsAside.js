import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {Dropdown} from 'antd';
import PipelineDetailsAsideOpt from "./pipelineDetailsAsideOpt";
import FirstMenu from "../../asideMenu/firstMenu";

const PipelineDetailsAside = props =>{

    const {pipelineList,visible,setVisible,isPrompt,setPipeline} = props

    const [nav,setNav] = useState('')
    let path = props.location.pathname

    useEffect(()=>{
        if (path.indexOf('/index/task/assembly') === 0) {
            path='/index/task/assembly'
        }
        setNav(path)
    },[path])


    const  taskRouters=[
        {
            to:'/index/task/work',
            title:'工作空间',
            icon:'#icon-gongzuotongji',
            key:'2'
        },
        {
            to:'/index/task/config',
            title: '配置',
            icon: '#icon-jiekoupeizhi',
            key:'3'
        },
        {
            to:'/index/task/structure',
            title: '历史',
            icon:'#icon-lishijishi',
            key:'4'
        },
        {
            to:'/index/task/assembly',
            title: '设置',
            icon:'#icon-shezhi',
            key:'5'
        }
    ]

    return(
         <div className='aside'>
            <ul  className='content'>
                <li
                    onClick={()=>setVisible(!visible)}
                    onBlur={()=>setVisible(false)}
                    className='aside_content aside_dropdown'
                    style={{padding:10}}
                >
                    <Dropdown overlay={
                        <PipelineDetailsAsideOpt
                            {...props}
                            pipelineList={pipelineList}
                            setVisible={setVisible}
                            isPrompt={isPrompt}
                            setPipeline={setPipeline}
                        />}
                        visible={visible}
                    >
                        <svg  className='icon' aria-hidden="true">
                            <use xlinkHref='#icon-shaixuan1'/>
                        </svg>
                    </Dropdown>
                </li>
                <FirstMenu
                    nav={nav}
                    routers={taskRouters}
                />
            </ul>
        </div>
    )
}

export default withRouter(PipelineDetailsAside)