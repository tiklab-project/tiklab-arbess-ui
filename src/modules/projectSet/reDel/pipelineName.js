import React from "react";
import {Form,Input} from "antd";
import Btn from "../../common/btn/btn";
import PipelinePower from "./pipelinePower";

const PipelineName = props =>{

    const {pipelineList,form,re,layout,powerType,setPowerType} = props

    const style1 = {
        "width":416
    }

    const getPowerType = item =>{
        setPowerType(item.id)
    }

    return(
        <Form
            form={form}
            autoComplete="off"
            layout={layout}
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
            {layout === "vertical" &&
                <PipelinePower
                    powerType={powerType}
                    onClick={getPowerType}
                />
            }
            {re &&
                <Form.Item>
                    <Btn
                        htmlType="submit"
                        type={"primary"}
                        title={"确定"}
                        onClick={re}
                    />
                </Form.Item>
            }
        </Form>
    )
}

export default PipelineName