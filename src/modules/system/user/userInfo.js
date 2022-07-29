import React from "react";
import {getUser} from "tiklab-core-ui";
import {Descriptions} from "antd";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";

// 用户基础信息
const UserInfo = props =>{
    return(
        <div className="userCenter-base">
            <BreadcrumbContent firstItem={"用户管理"} secondItem={"基本信息"} type={"system"}/>
            <div className="userCenter-base-content">
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="用户名">{getUser().name}</Descriptions.Item>
                    <Descriptions.Item label="邮箱">{getUser().email}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{getUser().phone}</Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    )
}

export default UserInfo