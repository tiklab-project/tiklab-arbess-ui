/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-12-29 09:45:33
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-01-05 13:28:48
 */
import React, {useState, useEffect} from 'react';
import {Popover, Modal, Row, Col, Input, Button, Table, Space, Form, message, Select} from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';
import WorkService  from './servers'

import './useAppConfig.scss'

const WORK_NAME = {
    apibox: {
        label: 'API BOX',
    },
    project: {
        label: '项目管理',
    },
};
const WORK_APP_LINK = [
    {
        label: '项目管理',
        value: 'project',
    },
    {
        label: 'API BOX',
        value: 'apibox',
    },
];

const useAppConfig = (isSSO) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    const [appList, setAppList] = useState([])
    const [visibleList, setVisibleList] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [edit, setEdit] = useState(null);

    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text,record) => {
                return WORK_NAME[record.appType].label
            }
        },
        {
            title: '应用链接地址',
            dataIndex: 'appUrl',
            key: 'appUrl',
        },
        {
            title: '权限',
            dataIndex: 'promisse',
            key: 'promisse',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => updateItem(record)}>编辑</a>
                    <a onClick={() => deleteItem(record.id)}>删除</a>
                </Space>
            ),
        },
    ];


    useEffect(() => {
        if (!isSSO) {
            getWorkList()
        }
    },[]);

    useEffect(() => {
        if (edit) {
            form.setFieldsValue({
                appType: edit.appType,
                appUrl: edit.appUrl
            })
        }
    }, [edit]);


    const deleteItem = async id => {
        const data = await WorkService.deleteWorkByID(id);
        if (!data.code) {
            await getWorkList()
        }
    }

    const updateItem = item => {
        setEdit(item)
        setEditVisible(true)
    }

    // 获取所有配置列表
    const getWorkList = async () => {
        const data = await WorkService.getWorkList();
        setAppList(data)
    }

    const managerApp = () => {
        setVisibleList(true)
    }
    const content = (
        <div className={'popover'}>
            <div className={'popover_header'}>
                <span>应用链接</span>
                <span onClick={managerApp}>管理</span>
            </div>
            {
                appList.map((item, index) => {
                    return (
                        <div key={item.id+ index}>
                            <QuestionCircleOutlined />
                            <a href={item.appUrl} target='_blank'>
                                {WORK_NAME[item.appType].label}
                            </a>
                        </div>
                    )
                })
            }

        </div>
    );


    const component = <Popover
        content={content}
        placement="bottom"
    >
        {/* 应用链接 */}
        <svg className="icon ant-popover-open" aria-hidden="true">
            <use xlinkHref="#icon24gf-appsBig5"></use>
        </svg>
    </Popover>


    const handleOk = () => {
        setVisibleList(false)
    }
    const handleCancel = () => {
        setVisibleList(false)
    }
    const handleEditOpen = () => {
        setEditVisible(true)
    }
    // 显示应用来编辑
    const ModalComponent = <Modal
        visible={visibleList}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        destroyOnClose={true}
        preserve={false}
        width={1200}
    >
        <Row>
            <Col span={24}>
                <div className={'useHook_app'}>
                    <Input placeholder="搜索标题" style={{width:'240px'}}/>
                    <Button onClick={handleEditOpen}>添加应用管理</Button>
                </div>
            </Col>
        </Row>
        <Table dataSource={appList} columns={columns} />
    </Modal>


    // TODO 提交表单
    const handleEditOk = () => {
        form.submit()
        setEdit(null)
        setEditVisible(false)
    };
    // TODO 取消提交
    const handleEditCancel = () => {
        form.resetFields()
        setEdit(null)
        setEditVisible(false)
    };


    // TODO 完成表单提交的接口
    const onFinish = values => {
        if (values && values.appType) {
            if (edit) {
                WorkService.updateWork({...values, id: edit.id}).then(res => {
                    if (!res.code) {
                        message.success('成功!').then(() => {
                            getWorkList()
                            handleEditOk()
                        })
                    } else {
                        message.error('失败!').then();
                    }
                })
            } else {
                WorkService.createWorkAppLink(values).then(res => {
                    if (!res.code) {
                        message.success('成功!').then(() => {
                            getWorkList()
                            handleEditOk()
                        })

                    } else {
                        message.error('失败!').then();
                    }
                })
            }
        }
    };


    const editOrAddModal = <Modal
        visible={editVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        closable={false}
        destroyOnClose={true}
        preserve={false}
    >
        <Form
            {...layout}
            form={form}
            onFinish={onFinish}
        >
            <Form.Item
                label= "标题"
                name="appType"
                rules={[{ required: true, message: '用户名不能包含非法字符，如&,%，&，#……等' }]}
            >
                <Select options={WORK_APP_LINK}/>
            </Form.Item>

            <Form.Item
                label= "应用链接地址"
                name="appUrl"
                rules={[{ required: true, message: "请填写地址"}]}
            >
                <Input />
            </Form.Item>

        </Form>
    </Modal>

    return [component, ModalComponent, editOrAddModal]
}
export default useAppConfig
