import React from "react";
import {Button,Form,Input} from "antd";

const ProjectRename = props =>{

    const {style,pipelineList,form,re,setVisible} = props

    return(
        <Form form={form} onFinish={re} autoComplete="off" layout={style?null:"inline"}>
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
                <Input allowClear style={{width:416}}/>
            </Form.Item>
            <Form.Item shouldUpdate style={style?style:null}>
                {() => (
                    <>
                        {
                            style ?
                                <Button onClick={()=>setVisible(false)} style={{marginRight:10}}>取消</Button>
                                :
                                null
                        }
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
    )
}

export default ProjectRename