import React, {Fragment} from "react";
import { Menu, Dropdown, Space } from 'antd';
import {DownOutlined} from "@ant-design/icons";

const StructureLeft_dropdown = props =>{
    const menu = (
        <Menu>
            <Menu.Item key={1}>成功</Menu.Item>
            <Menu.Item key={2}>执行</Menu.Item>
            <Menu.Item key={3}>失败</Menu.Item>
        </Menu>
    );
    const menu1 = (
        <Menu>
            <Menu.Item key={1}>admin</Menu.Item>
            <Menu.Item key={2}>Lucy</Menu.Item>
        </Menu>
    );
    const menu2 = (
        <Menu>
            <Menu.Item key={1}>手动</Menu.Item>
            <Menu.Item key={2}>自动</Menu.Item>
        </Menu>
    );

    return(
        <Fragment>
            <Dropdown overlay={menu} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        状态
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
            <Dropdown overlay={menu1} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        执行人
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
            <Dropdown overlay={menu2} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        触发方式
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>

        </Fragment>
    )
}

export default StructureLeft_dropdown