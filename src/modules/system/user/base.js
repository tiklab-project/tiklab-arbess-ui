import React from "react";
import {getUser} from "doublekit-core-ui";
import {Descriptions} from "antd";
import SystemBreadcrumb from "../breadcrumb/systemBreadcrumb";

const Base = props =>{
    return(
        <div className='userCenter-base'>
            <SystemBreadcrumb
                firstItem={'用户中心'}
                secondItem={'基本信息'}
            />
            <div className='userCenter-base-content'>
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="用户名">{getUser().name}</Descriptions.Item>
                    <Descriptions.Item label="邮箱">{getUser().email}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{getUser().phone}</Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    )
}

export default Base