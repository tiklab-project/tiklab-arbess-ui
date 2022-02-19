import React, {useEffect, useState} from "react";
import {Form, Input, Button,message} from "antd";
import {ApiOutlined} from "@ant-design/icons";
import {observer,inject} from "mobx-react";
import moment from "../../../../common/moment/moment";

const PipelineAdd = props => {

    let {PIPELINE_STORE}=props
    const {createPipeline}=PIPELINE_STORE

    const pipelineList=JSON.parse(localStorage.getItem('pipelineList'))

    const [btn,setBtn]=useState(true)

    const inputOnChange=(e)=>{
        pipelineList.map(item=>{
            if(item.pipelineName===e.target.value){
                message.info('名称已经存在')
                setBtn(true)
            }
        })
    }

    const onclick=(e)=>{
        const div = e.target.parentNode;
        div.classList.add("new-content-type-active")
        setBtn(false)

    }

    const handSubmit = value => {
        let aa={
            pipelineName:value.pipelineName,
            pipelineCreateUser:'admin',
            pipelineType:1,
            pipelineCreateTime:moment.moment
        }

        createPipeline(aa).then(res=>{
            // if (res.data===null){
            //     message.info('名称已经存在')
            // }else {
            //     localStorage.setItem('pipelineName',aa.pipelineName)
            //     props.history.push('/home/deployment',value)
            // }
            localStorage.setItem('pipelineName',aa.pipelineName)
            props.history.push('/home/deployment',value)
        })
    }


    return(
        <div className='new'>
            <div className='new-content'>
                <Form
                    id='form'
                    name="basic"
                    onFinish={handSubmit}
                    autoComplete = "off"
                >
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: '请输入流水线名称'
                            }
                        ]}
                        label="流水线名称"
                        name="pipelineName"
                    >
                        <Input style={{width:400}} onChange={inputOnChange} />
                    </Form.Item>
                </Form>
                <div  className={'new-content-type'}>
                    <div onClick={onclick}  className={'new-content-type-choose'} >
                       <div className={'new-content-type-choose-c'} >
                            <span>
                                <ApiOutlined />&nbsp;流水线
                            </span>
                           <p>
                               精心地组织一个可以长期运行在多个节点上的任务。适用于构建流水线（更加正式地应当称为工作流），增加或者组织难以采用自由风格的任务类型。
                           </p>
                       </div>

                    </div>
                </div>
                <div className='new-content-btn'>
                    <Button htmlType="submit"  form="form" type='primary' disabled={btn} >
                        添加
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default inject('PIPELINE_STORE')(observer(PipelineAdd))