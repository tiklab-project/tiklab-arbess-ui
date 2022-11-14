import React from "react";
import {Form,Input} from "antd";
import {LockOutlined,UnlockOutlined} from "@ant-design/icons";
import Btn from "../../common/btn/btn";
import "./pipelineInfo.scss";

const PipelineName = props =>{

    const {pipelineList,form,re,set,powerType,setPowerType} = props

    const style1 = {
        "width":416
    }

    const getPowerType = item =>{
        setPowerType(item.id)
    }

    const powerLis = [
        {
            id:1,
            title:"全局",
            icon:<UnlockOutlined />,
            desc:"互联网上的任何人都可以查看该项目。不支持TFVC等某些功能。"
        },
        {
            id:2,
            title:"私有",
            icon:<LockOutlined />,
            desc: "只有您授予访问权限的人才能查看此项目。"
        }
    ]

    return(
        <Form
            form={form}
            autoComplete="off"
            layout={"vertical"}
        >
            <Form.Item
                label={"流水线名称"}
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
            <div className="pipeline-power">
                <div className="pipeline-power-title">流水线权限</div>
                <div className="pipeline-power-content">
                    {
                        powerLis.map(item=>{
                            return <div
                                key={item.id}
                                className={`pipeline-power-item ${set?"pipeline-power-set":"pipeline-power-noSet"} ${powerType===item.id?"pipeline-power-select":""}`}
                                onClick={()=>getPowerType(item)}
                            >
                                <div className="power-item">
                                    <div>
                                        <div className="power-title power-icon">
                                            {item.icon}
                                        </div>
                                        <div className="power-title power-name">
                                            {item.title}
                                        </div>
                                    </div>
                                    {
                                        powerType===item.id &&
                                        <div className="power-select-show"/>
                                    }
                                </div>
                                <div className="power-desc">
                                    {item.desc}
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
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