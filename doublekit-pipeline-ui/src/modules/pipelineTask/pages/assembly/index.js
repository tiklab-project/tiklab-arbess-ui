/*
    流水线设置
 */
import React,{Component} from 'react'
import {Input, Form, Button,Popconfirm} from "antd";

class AssemblyTask extends Component{
    render() {
        return(
            <div className='task-assembly'>
               <div className='task-assembly-top'>
                   <Form layout="inline">
                       <Form.Item  label="重命名" >
                           <Input />
                       </Form.Item>
                       <Form.Item>
                           <Button htmlType="submit">
                               确定
                           </Button>
                       </Form.Item>
                   </Form>
               </div>
                <div className='task-assembly-bottom'>
                    <Popconfirm
                        title="你确定删除吗"
                        onConfirm={()=>{
                            this.props.history.push('/pipeline/all')
                        }}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type="primary" >
                        删除流水线
                        </Button>
                    </Popconfirm>

                </div>
            </div>
        )
    }
}
export default AssemblyTask