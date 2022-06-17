import React,{useState,useEffect} from "react";
import {withRouter} from "react-router-dom";
import FirstMenu from "../menu/asideMenu/firstMenu";

const SystemAside = props =>{

    const [nav,setNav] = useState('')
    let path = props.location.pathname

    useEffect(()=>{
        if (path.indexOf('/index/system/user') === 0) {
            path='/index/system/user'
        }
        if (path.indexOf('/index/system/plugin') === 0) {
            path='/index/system/plugin'
        }
        if (path.indexOf('/index/system/secure') === 0) {
            path='/index/system/secure'
        }
        if (path.indexOf('/index/system/other') === 0) {
            path='/index/system/other'
        }
        setNav(path)
    },[path])

    const router = [
        {
            key:1,
            to:'/index/system/user',
            title:'用户中心',
            icon:'#icon-gongzuotongji',
            enCode:'1',
        },
        {
            key:2,
            to:'/index/system/plugin',
            title:'插件库',
            icon:'#icon-gongzuotongji',
            enCode:'2',
        },
        {
            key:3,
            to:'/index/system/secure',
            title:'安全设置',
            icon:'#icon-gongzuotongji',
            enCode:'3',
        },
        {
            key:4,
            to:'/index/system/other',
            title:'其他',
            icon:'#icon-gongzuotongji',
            enCode:'4',
        },
    ]

    return(
        <div className='aside'>
            <ul  className='content'>
                <FirstMenu nav={nav} routers={router}/>
            </ul>
        </div>
    )
}

export default withRouter(SystemAside)