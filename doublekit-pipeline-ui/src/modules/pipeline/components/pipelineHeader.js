import React ,{Component} from 'react'
import { Button,Input} from "antd";
import {withRouter} from "react-router";
import {PlusOutlined} from "@ant-design/icons";

const { Search } = Input;

const PipelineHeader=(props)=>{
    return(
        <>
            <div>
                <div className='pipeline-top-l'>
                    <h1 >流水线</h1>
                </div>
                <div className='pipeline-top-r'>
                    <Button
                        type='primary'
                        onClick={()=>props.history.push('/home/new')}
                    >
                        <PlusOutlined/>
                        新建流水线
                    </Button>
                </div>
            </div>
            <div className='pipeline-top-s'>
                <Search placeholder="请输入流水线" style={{ width: 200 }} />
            </div>
        </>
    )
}
export default withRouter(PipelineHeader)