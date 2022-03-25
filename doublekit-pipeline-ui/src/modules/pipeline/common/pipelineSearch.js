import React,{Fragment} from 'react'
import { Button,Input} from "antd";
import {withRouter} from "react-router-dom";
import {PlusOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";

const { Search } = Input;

const PipelineSearch= props=>{

    const {PipelineStore}=props
    const {findOneName}=PipelineStore

    const onSearch = values =>{
        findOneName(values).then(()=>{
            props.history.push(`/home/searchresult/${values}`)
        })
    }

    return(
        <Fragment>
            <h2>流水线</h2>
            <div className='pipeline-top-r'>
               <Search placeholder="请输入流水线"  onSearch={onSearch} style={{ width: 240,marginRight:10 }} />
               <Button
                   type='primary'
                   onClick={()=>props.history.push('/home/new')}
               >
                   <PlusOutlined/>
                   新建流水线
               </Button>
            </div>
        </Fragment>
    )
}

export default withRouter(inject('PipelineStore')(observer(PipelineSearch)))