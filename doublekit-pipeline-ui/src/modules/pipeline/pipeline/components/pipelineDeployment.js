import React,{useEffect} from 'react'
import SourceCode from "./editDeploymnet/SourceCode";
import Structure from "./editDeploymnet/structure";
import Deploy from "./editDeploymnet/deploy";
import {Breadcrumb, Button, Form} from "antd";
import moment from "../../../../common/moment/moment";
import {withRouter} from "react-router-dom"
import {inject, observer} from "mobx-react";

const scrollToAnchor = (anchorName) => {
    if (anchorName) {
        let anchorElement = document.getElementById("box");
        let a = document.getElementById(anchorName)
        if (anchorElement) {
            anchorElement.scrollTop = a.offsetTop -200;
        }
    }
}
const  handleScroll=()=>{
    let scrollTop = document.getElementById("box").scrollTop;  //滚动条滚动高度
    let lis=document.getElementsByClassName("a")
    if(scrollTop>16 && scrollTop<=115){
        lis.item(0).classList.add("ac")
        lis.item(1).classList.remove("ac")
        lis.item(2).classList.remove("ac")
    }
    if(scrollTop>120 && scrollTop<240){
        lis.item(1).classList.add("ac")
        lis.item(0).classList.remove("ac")
        lis.item(2).classList.remove("ac")
    }

    if(scrollTop>240 ){
        lis.item(2).classList.add("ac")
        lis.item(0).classList.remove("ac")
        lis.item(1).classList.remove("ac")
    }
}

const PipelineDeployment=props=>{

    const {PIPELINE_STORE}=props
    const {createPipelineConfigure}=PIPELINE_STORE

    const onFinish=(values)=>{
        let configure={
            configureCodeSource:values.configureCodeSource,
            configureCodeSourceAddress:values.configureCodeSourceAddress,
            configureCodeStructure:values.configureCodeStructure,
            configureStructureAddress:values.configureStructureAddress,
            configureStructureOrder:values.configureStructureOrder,
            configureDeployAddress:values.configureDeployAddress,
            configureCreateTime:moment.moment,
            pipelineId:localStorage.getItem('pipelineId'),
            proofId:localStorage.getItem('proofId'),
        }
        createPipelineConfigure(configure)
        props.history.push('/home/task')
    }

    return (
        <div className='newDeployment' >
            <Breadcrumb separator=">">
                <Breadcrumb.Item>流水线</Breadcrumb.Item>
                <Breadcrumb.Item href="">{localStorage.getItem('pipelineName')}</Breadcrumb.Item>
            </Breadcrumb>
            <div className='newDeployment-bottom'>
                <div className='newDeployment-tab'>
                    <ul>
                        <li className='ac a '>
                            <a  onClick={()=>scrollToAnchor('a1')}>
                                源码管理
                            </a>
                        </li>
                        <li className=' a '>
                            <a  onClick={()=>scrollToAnchor('a2')}>
                                构建
                            </a>
                        </li>
                        <li className=' a '>
                            <a  onClick={()=>scrollToAnchor('a3')}>
                                部署
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='newDeployment-bc'>
                    <div className='newDeployment-con' id='box' onScroll={handleScroll} >
                        <Form
                            onFinish={onFinish}
                            id={'form'}
                            initialValues={{"configureCodeStructure":'b',"configureCodeSource":'a'}}
                            layout="vertical"
                            autoComplete = "off"
                        >
                            <div id="a1" >
                                <SourceCode />
                            </div>
                            <div id="a2">
                                <Structure   />
                            </div>
                            <div id="a3">
                                <Deploy/>
                            </div>
                        </Form>
                        <div style={{backgroundColor:"white",height:700}} />
                    </div>
                    <div className={'btn'}>
                        <Button
                            htmlType='submit'
                            form='form'
                            type='primary'
                            style={{marginLeft:30,marginRight:30}}
                        > 保存</Button>
                        <Button>取消</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(inject('PIPELINE_STORE')(observer(PipelineDeployment)))