import React from "react";
import { Menu, Dropdown, Space } from 'antd';
import {DownOutlined} from "@ant-design/icons";

const StructureLeft_dropdown = props =>{

    const lis = [
        {
            id:1,
            desc:'状态',
            menu:  <Menu>
                        <Menu.Item key={1}>成功</Menu.Item>
                        <Menu.Item key={2}>执行</Menu.Item>
                        <Menu.Item key={3}>失败</Menu.Item>
                    </Menu>
        },
        {
            id:2,
            desc:'执行人',
            menu:  <Menu>
                        <Menu.Item key={1}>admin</Menu.Item>
                        <Menu.Item key={2}>Lucy</Menu.Item>
                    </Menu>
        },
        {
            id:3,
            desc:'执行方式',
            menu:  <Menu>
                        <Menu.Item key={1}>手动</Menu.Item>
                        <Menu.Item key={2}>自动</Menu.Item>
                    </Menu>
        },
    ]

    return(
        <div className='structure-content-left-dropdown'>
            {
                lis.map(item=>{
                    return (
                        <Dropdown
                            key={item.id}
                            overlay={item.menu}
                            trigger={['click']}
                        >
                            <a onClick={(e) =>
                                e.preventDefault()}
                            >
                                <Space>
                                    {item.desc}
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    )
                })
            }
        </div>
    )
}

export default StructureLeft_dropdown