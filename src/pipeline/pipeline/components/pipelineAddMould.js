/**
 * @Description: 流水线添加模板
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {NodeIndexOutlined} from "@ant-design/icons";

const PipelineAddMould = ({templateType,setTemplateType}) =>{


    // 模板list
    const templateLis = [
        {
            id:2,
            title:"Java",
            brand:"Maven",
            desc:"Linux",
            first:"Maven构建",
            second:"部署",
            type:2131,
        },
        // {
        //     id:3,
        //     title:"Java",
        //     brand:"Maven",
        //     desc: "docker",
        //     first:"构建",
        //     second:"部署",
        //     type:2132,
        // },
        {
            id:4,
            title:"Java",
            brand:"Maven",
            desc: "Linux",
            zreo: "测试",
            first:"构建",
            second:"部署",
            type:112131,
        },
        // {
        //     id:5,
        //     title:"Java",
        //     brand:"Maven",
        //     desc: "docker",
        //     zreo: "测试",
        //     first:"构建",
        //     second:"部署",
        //     type:112132,
        // },
        {
            id:6,
            title:"Node.js",
            brand:"npm",
            desc: "Linux",
            first:"构建",
            second:"部署",
            type:2231,
        },
        // {
        //     id:7,
        //     title:"Node.js",
        //     brand:"npm",
        //     desc: "docker",
        //     first:"构建",
        //     second:"部署",
        //     type:2232,
        // },
    ]

    const name = liName =>{
        return (
            <div className="li-step">
                <span className="li-step-name">{liName}</span>
            </div>
        )
    }

    return (
        <div className="pipeline-template-ul">
            <div className="pipeline-template-title">流水线模板</div>
            <div className={`${templateType===1?"pipeline-template-li pipeline-template-select":"pipeline-template-li"}`}
                 onClick={()=>setTemplateType(1)}
            >
                <div className="li-self">自定义</div>
            </div>
            {
                templateLis.map(item=>{
                    return (
                        <div key={item.id}
                             className={`${templateType===item.type?"pipeline-template-li pipeline-template-select":"pipeline-template-li"}`}
                             onClick={()=>setTemplateType(item.type)}
                        >
                            <div>
                                <div className="pipeline-template-li-header">
                                    <span className="li-header-icon"><NodeIndexOutlined /></span>
                                    <span className="li-header-name">{item.title}-{item.brand}</span>
                                    <span>部署到</span>
                                    <span className="li-header-title">{item.desc}</span>
                                    <span>环境</span>
                                </div>
                                <div className="pipeline-template-li-content">
                                    { item.zreo && name(item.zreo)}
                                    { name(item.first) }
                                    { name(item.second) }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PipelineAddMould
