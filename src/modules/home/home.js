import React  from 'react'
import './home.scss';
import {renderRoutes} from "react-router-config";
import Heads from "./header";

const Home=props=>{
    const headerRoutes=[
        {
            title: "首页",
            key:'homePage',
        },
        {
            to:'/home/pipeline',
            title: "流水线",
            key:'pipeline',
        },
        {
            to:'/home/system',
            title:'系统设置',
            key:'system'
        }
    ]

    const {route}=props


    return(
        <div className="frame">
            <Heads {...props} routers={headerRoutes} />
            <div className='frame-content'>
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}
export default Home