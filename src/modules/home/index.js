import React  from 'react';
import { renderRoutes } from "react-router-config";
import { withRouter } from 'react-router';
import LocalHeader  from "./components/localHeader";
import "./components/header.scss";
const IndexSaas = (props) => {
    const headerRoutes=[
        {
            to:'/home/pipeline',
            title: "流水线",
            key:'pipeline'
        },
        {
            to:'/home/system',
            title:'系统设置',
            key:'system'
        }
    ]
    const route = props.route;
    return (
        <div className="frame">
            <LocalHeader
                headerRoutes={headerRoutes}
            />
            <div className='frame-container'>
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default withRouter(IndexSaas);