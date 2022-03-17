import React,{Fragment} from 'react'
import { Button,Input,message,Breadcrumb} from "antd";
import {withRouter} from "react-router-dom";
import {PlusOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";

const { Search } = Input;

const PipelineHeader=props=>{

    const {PipelineStore}=props
    const {selectName}=PipelineStore

    const onSearch = values =>{
        selectName(values).then(res=>{
            if (res.data.length===0){
                message.info('没有该流水线')
            }else {
                props.history.push(`/home/searchresult/${values}`)
            }
        })
    }

    return(
        <Fragment>
            <div>
                <div className='pipeline-top-l'>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>流水线</Breadcrumb.Item>
                   </Breadcrumb>
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
                <Search placeholder="请输入流水线"  onSearch={onSearch} style={{ width: 200 }} />
            </div>
        </Fragment>
    )
}

export default withRouter(inject('PipelineStore')(observer(PipelineHeader)))