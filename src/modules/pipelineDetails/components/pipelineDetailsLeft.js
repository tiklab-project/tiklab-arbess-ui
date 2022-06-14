import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import './pipelineDetailsLeft.scss';
import {Dropdown} from 'antd';
import PipelineDetailsLeftOpt from "./pipelineDetailsLeftOpt";

const PipelineDetailsLeft = props =>{

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

    const changeNav = item=>{
        props.history.push(item.to)
    }

    return(
         <div className='aside'>
            <ul  className='content'>
                <li
                    onClick={()=>setVisible(!visible)}
                    onBlur={()=>setVisible(false)}
                    className='aside_content'
                    style={{padding:10}}
                >
                    <Dropdown overlay={
                        <PipelineDetailsLeftOpt
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
                {
                    taskRouters && taskRouters.map(item=>{
                        return(
                            <li
                                className={nav===item.to ? 'aside_content aside_link' : 'aside_content'}
                                key={item.key}
                                onClick={()=>changeNav(item)}
                            >
                                <div className='aside_content_icon'>
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref= {item.icon}/>
                                    </svg>
                                </div>
                                <div className='aside_content_title'>{item.title}</div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default withRouter(PipelineDetailsLeft)