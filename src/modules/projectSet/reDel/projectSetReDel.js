import React,{useState} from "react";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import {Button,Form,Input,message,Popconfirm,Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {getUser} from "tiklab-core-ui";
import {inject,observer} from "mobx-react";

const ProjectSetReDel = props =>{

    const {matFlowStore} = props
    const {deleteMatFlow,updateMatFlow,matFlowList,matFlowId,matFlowName}=matFlowStore

    const [form]=Form.useForm()
    const [processVisible,setProcessVisible] = useState(false)
    const userId = getUser().userId

    const del = () =>{
        setProcessVisible(true)
        const params = {
            userId:userId,
            matFlowId:matFlowId
        }
        deleteMatFlow(params).then(res=>{
            if(res.code === 0 && res.data === 1){
                message.info({content: "删除成功", className: "message"})
            }else {
                message.error({content:"删除失败", className:"message"})
            }
            props.history.push("/index/matFlow")
        }).catch(error=>{
            console.log(error)
        })
    }

    const re = value =>{
        const params={
            user:{id:userId},
            matflowId:matFlowId,
            matflowName:value.matFlowName
        }
        updateMatFlow(params).then(res=>{
            if(res.code === 0){
                props.history.push(`/index/task/${value.matFlowName}/work`)
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    return(
        <div className="matFlowSys-reDel">
            <BreadcrumbContent firstItem={matFlowName} secondItem={"其他管理"}/>
            <div className="matFlowSys-reDel-content" style={{padding:"8px 8px 0"}}>
                <Form onFinish={re} form={form} layout="inline" autoComplete="off">
                    <Form.Item
                        label="重命名"
                        name="matFlowName"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if(value){
                                        let nameArray = []
                                        if(matFlowList){
                                            nameArray=matFlowList && matFlowList.map(item=>item.matFlowName)
                                        }
                                        if (nameArray.includes(value)) {
                                            return Promise.reject("名称已经存在");
                                        }
                                        return Promise.resolve()
                                    }else {
                                        return Promise.reject()
                                    }
                                },
                            }),
                        ]}
                    >
                        <Input allowClear/>
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
                        onConfirm={del}
                        title="你确定删除吗"
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type="primary" >删除流水线</Button>
                    </Popconfirm>
                    &nbsp;
                    {
                        processVisible ?
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} />
                            :null
                    }
                </div>
            </div>
        </div>
    )
}

export default inject("matFlowStore")(observer(ProjectSetReDel))