/*
    构建历史
 */

import React,{Component} from 'react'
import {Button,  Table} from "antd";
import ModalHistory from "./modal";


class HistoryTask extends Component{
    state={
        visible:false,
        initialValues:[]
    }
    show=()=>{

        this.setState({
            visible:true
        })
    }
     onCreate=(values)=>{
        console.log(values)
        this.setState({
            visible:false
        })
    }
    onCancel=()=>{
        this.setState({
            visible:false
        })
    }

    render() {
        const columns = [
            {
                title: '构建',
                dataIndex: 'build',
                key: 'build',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '构建时间',
                dataIndex: 'buildTime',
                key: 'buildTime',
            },
            {
                title: '执行人',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '执行方式',
                dataIndex: 'mode',
                key: 'mode',
            },
            {
                title: '执行时间',
                dataIndex: 'modeTime',
                key: 'modeTime',
            },
            {
                title: '代码源',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: '凭证',
                dataIndex: 'voucher',
                key: 'voucher',
            },
            {
                title: '分支',
                dataIndex: 'master',
                key: 'master',
            },
        ]
        const dataSource=[
            {
                key:"1",
                build:<a href='/task/build'>构建1</a>,
                status:"成功",
                buildTime:"2022年1月14日18：21：25",
                username:<a href="/system">admin</a>,
                mode:"自动",
                modeTime:"50s",
                code:"git",
                voucher:"SSH",
                master:"master",
            }
        ]
        return(
            <div className='task-history'>
                <div className='task-history-top'>
                    <h1>历史记录</h1>
                    <Button type='primary' onClick={this.show}>
                        筛选
                    </Button>
                    {/* 弹出框 */}
                    <ModalHistory
                        visible={this.state.visible}
                        onCreate={this.onCreate}
                        onCancel={this.onCancel}
                    />
                </div>
                <div className='task-history-bottom'>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                    />
                </div>
            </div>
        )
    }
}
export default HistoryTask