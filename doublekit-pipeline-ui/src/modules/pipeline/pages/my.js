import React from "react";
import {Table} from "antd";
import {withRouter} from "react-router-dom";

const My=()=> {
    const dataSource = [
        {
            key:"1",
            state:"失败",
            task: <a onClick={()=>this.props.history.push("/task/work")}>任务一</a>,
            lastTime:"3031",
            lastSuccess:"3031"
        }
    ];
    const columns = [
        {
            title: '收藏',
            dataIndex: 'collection',
            render:()=>{
                return(
                    <>
                        收藏
                    </>
                )
            }
        },
        {
            title: '最近构建状态',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: '任务名',
            dataIndex: 'task',
            key: 'task',
        },
        {
            title: '上次构建时间',
            dataIndex: 'lastTime',
            key: 'lastTime',
        },
        {
            title: '上次成功时间',
            dataIndex: 'lastSuccess',
            key: 'lastSuccess',
        },
        {
            title: '操作',
            dataIndex: 'action',
            render:()=>{
                return(
                    <>
                        运行
                    </>
                )
            }
        },
    ];
    return(
        <>
            <Table
                bordered
                columns={columns}
                dataSource={dataSource} />
        </>
    )
}

export default withRouter(My)