import React from "react";
import {Version} from "tiklab-licence-ui";
import {Table} from "antd";
import {CloseOutlined,CheckOutlined} from "@ant-design/icons";

const VersionContent = props =>{

    const renderText = text => {
        if(text){
            return <CheckOutlined style={{color:"#0063FF"}}/>
        }else {
            return <CloseOutlined style={{color:"#ff0000"}}/>
        }
    }

    const columns = [
        {
            title: "功能",
            dataIndex: "title",
            key:"title",
            colSpan: 2,
            render: (value, row, index) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (index === 0) {
                    obj.props.rowSpan = 3;
                }
                if(index>0 && index<3){
                    obj.props.rowSpan = 0;
                }
                if (index === 3) {
                    obj.props.rowSpan = 2;
                }
                if(index > 3){
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        },
        {
            title: "功能",
            dataIndex: "feature",
            key:"feature",
            colSpan: 0,
        },
        {
            title: "社区版",
            dataIndex: "ce",
            key:"ce",
            render:text => renderText(text)
        },
        {
            title: "企业版",
            dataIndex: "ee",
            key:"ee",
            render:text => renderText(text)
        },
    ]

    const dataSource = [
        {
            key: "1",
            title:"基本功能",
            feature: "LDAP",
            ce: false,
            ee: true,
        },
        {
            key: "2",
            title:"基本功能",
            feature: "在线客服",
            ce: false,
            ee: true,
        },
        {
            key: "3",
            title:"基本功能",
            feature: "用户和部门",
            ce: true,
            ee: true,
        },
        {
            key: "4",
            title:"升级功能",
            feature: "插件",
            ce: false,
            ee: true,
        },
        {
            key: "5",
            title:"升级功能",
            feature: "权限",
            ce: true,
            ee: true,
        },
    ]

    return <Version {...props} bgroup={"matflow"}>
        <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            pagination={false}
        />

    </Version>
}

export default VersionContent