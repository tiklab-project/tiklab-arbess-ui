/**
 * @Description:
 * @Author: gaomengyuan
 * @Date: 2025/5/15
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/5/15
 */
import React from "react";
import {Col, Row, Table, Tag} from "antd";
import Drawer from "../../../../common/component/drawer/Drawer";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import {CloseOutlined} from "@ant-design/icons";


const K8sDetail = (props) => {

    const {visible,setVisible,formValue,setFormValue} = props;

    const goBack = () => {
        setVisible(false);
        setFormValue(null);
    }

    const column = [
        {
            title:"名称",
            dataIndex:"nodeName",
            key:"nodeName",
            width:"17%",
            ellipsis:true,
        },
        {
            title:"Ip",
            dataIndex:"nodeIp",
            key:"nodeIp",
            width:"17%",
            ellipsis:true,
        },
        {
            title:"状态",
            dataIndex:"nodeStatus",
            key:"nodeStatus",
            width:"12%",
            ellipsis:true,
            render: text=>(
                <>
                    {text==='Ready' && <Tag color={'blue'}>正常</Tag>}
                    {text==='NotReady' && <Tag color={'red'}>不可用</Tag>}
                    {text==='Unknown' && <Tag>无法获取</Tag>}
                    {text==='SchedulingDisabled' && <Tag color={'volcano'}>不可调度</Tag>}
                    {text==='Ready,SchedulingDisabled' && <Tag color={'volcano'}>不可调度</Tag>}
                    {text==='NotReady,SchedulingDisabled' && <Tag color={'magenta'}>节点异常</Tag>}
                </>
            )
        },
        {
            title:"角色",
            dataIndex:"nodeRole",
            key:"nodeRole",
            width:"17%",
            ellipsis:true,
        },
        {
            title:"容器运行时",
            dataIndex:"containerRuntime",
            key:"containerRuntime",
            width:"17%",
            ellipsis:true,
        },
        {
            title:"加入时间",
            dataIndex:"acg",
            key:"acg",
            width:"20%",
            ellipsis:true,
        },
    ]

    return (
        <Drawer
            className="k8s-detail"
            visible={visible}
            onClose={goBack}
            width={'70%'}
        >
            <div className='k8s-detail-content'>
               <div className='k8s-detail-top'>
                   <BreadCrumb
                       crumbs={[
                           {
                               title: formValue?.name || '详情',
                           }
                       ]}
                   >
                       <CloseOutlined style={{fontSize:16}} onClick={goBack}/>
                   </BreadCrumb>
               </div>
                <div className='k8s-detail-item'>
                    <div className='k8s-detail-label'>集群地址</div>
                    <div>{formValue?.k8sVersion?.serverAddress || '--'}</div>
                </div>
                <div className='k8s-detail-item'>
                    <div className='k8s-detail-label'>服务端版本</div>
                    <div>{formValue?.k8sVersion?.serverVersion || '--'}</div>
                </div>
                <div className='k8s-detail-item'>
                    <div className='k8s-detail-label'>客户端版本</div>
                    <div>{formValue?.k8sVersion?.clientVersion || '--'}</div>
                </div>
                <div className='k8s-detail-node'>
                    <div className='node-title k8s-detail-label'>集群节点</div>
                    <Table
                        columns={column}
                        dataSource={formValue?.allNodes || []}
                        rowKey={(_,index)=>index}
                        pagination={false}
                        locale={{emptyText: <ListEmpty />}}
                    />
                </div>
            </div>
        </Drawer>
    )
}

export default K8sDetail
