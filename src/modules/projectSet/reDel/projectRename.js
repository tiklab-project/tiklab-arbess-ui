import React,{useEffect} from "react";
import {Button,Form,Input,Radio} from "antd";

const ProjectRename = props =>{

    const {pipelineList,form,re,layout,pipeline} = props

    useEffect(()=>{
        pipeline && form.setFieldsValue({pipelineName:pipeline.pipelineName})
    },[])

    const style1 = {
        "width":416
    }

    const init = {
        pipelinePower:2
    }

    return(
        <Form
            form={form}
            onFinish={re}
            autoComplete="off"
            layout={layout}
            initialValues={re ?null:init}
        >
            <Form.Item
                label={layout==="vertical"?"流水线名称":"重命名"}
                name="pipelineName"
                rules={[
                    {required:true,message:""},
                    {
                        pattern: /^[\s\u4e00-\u9fa5a-zA-Z0-9_-]{0,}$/,
                        message: "流水线名称不能包含非法字符，如&,%，&，#……等",
                    },
                    {
                        type: "string",
                        max: 20,
                        message:"流水线名称过长"
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value) {
                                return Promise.reject("请输入名称")
                            }
                            let nameArray = []
                            if(pipelineList){
                                nameArray = pipelineList && pipelineList.map(item=>item.pipelineName);
                            }
                            if (nameArray.includes(value)) {
                                return Promise.reject("名称已经存在");
                            }
                            return Promise.resolve()
                        },
                    }),
                ]}
            >
                <Input
                    allowClear
                    style={ re ? style1:null}
                />
            </Form.Item>
            {
                layout === "vertical" ?
                    <Form.Item
                        label={"流水线权限"}
                        name={"pipelinePower"}
                    >
                        <Radio.Group>
                            <Radio value={2}>私有</Radio>
                            <Radio value={1}>全局</Radio>
                            {/*<Radio value={2}>私有</Radio>*/}
                        </Radio.Group>
                    </Form.Item>
                    :null
            }
            {
                re ?
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                    :
                    null
            }
        </Form>
    )
}

export default ProjectRename