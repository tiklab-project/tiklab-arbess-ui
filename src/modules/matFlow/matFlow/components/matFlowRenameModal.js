import React,{useEffect} from "react";
import {Button,Form,Input,Modal} from "antd";

const MatFlowRenameModal = props =>{

    const {renameVisible,setRenameVisible,matFlowList,updateMatFlow,userId,matFlowId,fresh,setFresh} = props
    const [form] = Form.useForm()

    useEffect(()=>{
        if(renameVisible){
            form.resetFields()
        }
    },[renameVisible])

    const re = value =>{
        const params={
            user:{id:userId},
            matflowId:matFlowId,
            matflowName:value.matFlowName
        }
        updateMatFlow(params).then(res=>{
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
            <div className="matflowTable-rename">
                <Form form={form} onFinish={re} autoComplete="off">
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

export default MatFlowRenameModal