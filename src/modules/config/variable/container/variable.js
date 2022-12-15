import React,{useState,useEffect} from "react";
import {message,Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Listaction from "../../../common/list/listaction";
import Btn from "../../../common/btn/btn";
import EmptyText from "../../../common/emptyText/emptyText";
import VariableAdd from "../components/variableAdd";
import "../components/variable.scss";

const Variable = props =>{

    const {variableStore,pipelineStore} = props

    const {createVariable,findAllVariable,fresh,variableData,deleteVariable,updateVariable} = variableStore
    const {pipelineId} = pipelineStore

    const [variableVisible,setVariableVisible] = useState(false)
    const [formValue,setFormValue] = useState("")

    useEffect(()=>{
        pipelineId &&findAllVariable(pipelineId)
    },[pipelineId,fresh])

    const addVariable = () =>{
        setFormValue("")
        setVariableVisible(true)
    }

    const edit = (text,reocrd) =>{
        console.log(reocrd,"zzzz")
        setFormValue(reocrd)
        setVariableVisible(true)
    }

    const del = (text,reocrd) =>{
        deleteVariable(reocrd.varId).then(res=>{
            res.code===0 && message.info("删除成功",0.5)
        })
    }

    const columns = [
        {
            title: "变量名",
            dataIndex: "varKey",
            key: "varKey",
            // width:"40%",
            // ellipsis:true
        },
        {
            title: "类别",
            dataIndex: "taskType",
            key: "taskType",
            // width:"40%",
            // ellipsis:true,
            render:(text,record)=>{
                switch (text) {
                    case 1:
                        return "字符串"
                    case 2:
                        return "单选"
                }
            }
        },
        {
            title: "默认值",
            dataIndex: "varValue",
            key: "varValue",
            // width:"40%",
            // ellipsis:true

        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            // width:"40%",
            // ellipsis:true
            render:(text,record) => {
                return  <Listaction
                    edit={()=>edit(text,record)}
                    del={()=>del(text,record)}
                />
            }
        },
    ]

    return(
        <div className="variable">
            <div className="variable-content home-limited">
                <div className="variable-up">
                    <div className="variable-up-title">变量</div>
                    <div className="variable-up-num">共{variableData && variableData.length?variableData.length:0}个变量</div>
                    <Btn
                        title={"添加"}
                        icon={<PlusOutlined/>}
                        onClick={()=>addVariable()}
                    />
                    <VariableAdd
                        variableVisible={variableVisible}
                        setVariableVisible={setVariableVisible}
                        formValue={formValue}
                        createVariable={createVariable}
                        updateVariable={updateVariable}
                        pipelineId={pipelineId}
                    />
                </div>
                <div className="variable-tables">
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={variableData}
                        rowKey={record=>record.varId}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={"没有查询到变量"}/>}}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject("variableStore")(observer(Variable))