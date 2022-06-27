import React ,{useState} from "react";
import SystemBreadcrumb from "../system/breadcrumb/systemBreadcrumb";
import {Table,Button} from "antd";
import {withRouter} from "react-router-dom";
import View from "./view";

const UserView = props =>{

    const [visible,setVisible] = useState(false)

    const data = [
        {
            key: 'viewName',
            project:'111',
            createTime:'hhhh',
            viewName:'admin',
        },
        {
            key: '111',
            project:'111',
            createTime:'hhhh',
            viewName:'admin',
        }
    ]

    const columns = [
        {
            title: '视图名',
            dataIndex: 'viewName',
            key: 'viewName',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '项目数',
            dataIndex: 'project',
            key: 'project',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key:"action",
            render:(text ,record)=>{
                return(
                    <span className='content-action'>
                        <span className='content-action-update'>修改</span>
                        <span className='content-action-del'>删除</span>
                    </span>
                )
            }
        },
    ]

    return(
        <div className='userCenter-view'>
            <SystemBreadcrumb
                firstItem={'用户中心'}
                secondItem={'用户视图'}
            />
            <div className='userCenter-view-content'>
                <div className='content-addView'>
                    <Button onClick={()=>setVisible(true)} type='primary'>新建视图</Button>
                </div>
                <Table
                    bordered
                    rowKey={record => record.key}
                    columns={columns}
                    dataSource={data}
                />
            </div>
            <View
                visible={visible}
                setVisible={setVisible}
            />
        </div>
    )
}

export default withRouter(UserView)