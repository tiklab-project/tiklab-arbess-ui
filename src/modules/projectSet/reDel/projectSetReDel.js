import React, {Fragment} from "react";
import {Button, Form, Input, Popconfirm} from "antd";
import {inject, observer} from "mobx-react";
import ProjectBreadcrumb from "../../project/breadcrumb/projectBreadcrumb";
import {getUser} from "doublekit-core-ui";

const ProjectSetReDel = props =>{

    const {pipelineStore} = props
    const {deletePipeline,updatePipeline,pipelineList}=pipelineStore
    const [form]=Form.useForm()
    const userId=getUser().userId
    const pipelineId=localStorage.getItem('pipelineId')

    const onConfirm=()=>{
        const params = {
            userId:userId,
            pipelineId:pipelineId
        }
        deletePipeline(params).then(()=>{
            props.history.push('/index/pipeline')
        }).catch(error=>{
            console.log(error)
        })
    }

    const onFinish=(values)=>{
        const params={
            user:{
                id:userId,
            },
            pipelineId:pipelineId,
            pipelineName:values.pipelineName
        }
        updatePipeline(params).then(res=>{
            if(res.code === 0){
                localStorage.setItem('pipelineName',values.pipelineName);
                props.history.push('/index/task/work')
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    return(
       <Fragment>
           <ProjectBreadcrumb/>
           <div className='pipelineSys-reDel' style={{padding:20}}>
               <Form onFinish={onFinish} form={form} layout="inline" autoComplete = "off">
                   <Form.Item
                       label="重命名"
                       name='pipelineName'
                       rules={[
                           ({ getFieldValue }) => ({
                               validator(rule, value) {
                                   if(value){
                                       let nameArray = []
                                       if(pipelineList){
                                           nameArray=pipelineList && pipelineList.map(item=>item.pipelineName);
                                       }
                                       if (nameArray.includes(value)) {
                                           return Promise.reject('名称已经存在');
                                       }
                                       return Promise.resolve()
                                   }else {
                                       return Promise.reject()
                                   }
                               },
                           }),
                       ]}
                   >
                       <Input />
                   </Form.Item>
                   <Form.Item shouldUpdate>
                       {() => (
                           <Button
                               htmlType="submit"
                               disabled={
                                   !form.isFieldsTouched(true) ||
                                   !!form.getFieldsError().filter(({ errors }) => errors.length).length
                               }
                           >
                               确定
                           </Button>
                       )}
                   </Form.Item>
               </Form>
               <div style={{marginTop:100}}>
                   <Popconfirm
                       style={{marginTop:100}}
                       title="你确定删除吗"
                       onConfirm={onConfirm}
                       okText="确定"
                       cancelText="取消"
                   >
                       <Button type="primary" >
                           删除流水线
                       </Button>
                   </Popconfirm>

               </div>
           </div>
       </Fragment>
    )
}

export default inject('pipelineStore')(observer(ProjectSetReDel))