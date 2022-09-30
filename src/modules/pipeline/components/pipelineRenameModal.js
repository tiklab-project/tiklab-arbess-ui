import React,{useEffect} from "react";
import {Button,Form,Input,Modal} from "antd";

const PipelineRenameModal = props =>{

    const {renameVisible,setRenameVisible,pipelineList,updatePipeline,userId,pipelineId,fresh,setFresh} = props
    const [form] = Form.useForm()

    useEffect(()=>{
        if(renameVisible){
            form.resetFields()
        }
    },[renameVisible])

    const re = value =>{
        const params={
            user:{id:userId},
            pipelineId:pipelineId,
            pipelineName:value.pipelineName
        }
        updatePipeline(params).then(res=>{
            if(res.code === 0){
                setFresh(!fresh)
            }
        }).catch(error=>{
            console.log(error)
        })
        setRenameVisible(false)
    }

    return(
        <Modal
            visible={renameVisible}
            closable={false}
            forceRender
            onCancel={()=>setRenameVisible(false)}
            footer = {null}
            okText="确认"
            cancelText="取消"
        >
            <div className="pipelineTable-rename">
                <Form form={form} onFinish={re} autoComplete="off">
                    <Form.Item
                        label="重命名"
                        name="pipelineName"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if(value){
                                        let nameArray = []
                                        if(pipelineList){
                                            nameArray=pipelineList && pipelineList.map(item=>item.pipelineName)
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
                    <Form.Item shouldUpdate style={{textAlign:"right"}}>
                        {() => (
                            <>
                                <Button onClick={()=>setRenameVisible(false)} style={{marginRight:10}}>取消</Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={
                                        !form.isFieldsTouched(true) ||
                                        !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                    }
                                >
                                    确定
                                </Button>
                            </>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default PipelineRenameModal