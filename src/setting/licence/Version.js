import React from "react";
import {Version} from "tiklab-licence-ui";
import {Table} from "antd";
import {CloseOutlined,CheckOutlined} from "@ant-design/icons";

/**
 * 版本与许可证页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const VersionContent = props =>{

    const columns=[
        {
            title: '功能',
            dataIndex: 'title',
            key: 'title',
            colSpan: 2,
            render: (value, row, index) => {
                return {
                    children: value,
                    props: {
                        rowSpan: row.rowSpan,
                    },
                };
            },
        },
        {
            title: '功能点',
            dataIndex: 'feature',
            key: 'feature',
            colSpan: 0,
            render: (value, row, index) => {
                if (row.colSpan > 0) {
                    return null
                } else {
                    return value
                }
            },
        },
        {
            title: '社区版',
            dataIndex: 'ce',
            key: 'ce',
            render: (value, row, index) => {
                if (row.colSpan > 0) {
                    return null
                } else {
                    return value ? <CheckOutlined style={{color:"var(--tiklab-blue)", fontSize:'var(--tiklab-icon-size-16)'}}/> : <CloseOutlined style={{color:"red"}}/>
                }
            },
        },
        {
            title: '企业版',
            dataIndex: 'ee',
            key: 'ee',
            render: (value, row, index) => {
                return value ? <CheckOutlined style={{color:"var(--tiklab-blue)",fontSize:'var(--tiklab-icon-size-16)'}}/> : <CloseOutlined style={{color:"red"}}/>
            },
        },
    ]

    const dataSource = [
        {
            key: '1',
            title:"基本功能",
            feature: '用户和部门',
            ce: true,
            ee: true,
            rowSpan: 2
        },
        {
            key: '2',
            title:"基本功能",
            feature: '权限',
            ce: true,
            ee: true,
            rowSpan: 0
        },
        {
            key: '3',
            title: "升级功能",
            feature: '企业微信',
            ce: false,
            ee: true,
            rowSpan: 4,
        },
        {
            key: '4',
            title: "升级功能",
            feature: 'LDAP',
            ce: false,
            ee: true,
            rowSpan: 0,
        },
        {
            key: '5',
            title:"升级功能",
            feature: '插件',
            ce: false,
            ee: true,
            rowSpan: 0
        },
        {
            key: '6',
            title:"升级功能",
            feature: '在线客服',
            ce: false,
            ee: true,
            rowSpan: 0
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
