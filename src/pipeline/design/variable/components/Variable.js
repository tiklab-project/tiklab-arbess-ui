/**
 * @Description: 变量
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/28
 */
import React,{useState,useEffect} from "react";
import {Row, Col, Table} from "antd";
import {inject,observer} from "mobx-react";
import Button from "../../../../common/component/button/Button";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListAction from "../../../../common/component/list/ListAction";
import VariableAddEdit from "./VariableAddEdit";
import "./Variable.scss";
import {pipeline_task_update} from "../../../../common/utils/Constant";

const Variable = props =>{

    const {taskStore,variableStore,match:{params}} = props

    const {findAllVariable,deleteVariable,variableData} = variableStore
    const {taskPermissions} = taskStore

    const [variableVisible,setVariableVisible] = useState(false)
    const [formValue,setFormValue] = useState("")

    const taskUpdate = taskPermissions?.includes(pipeline_task_update);

    /**
     * 获取变量
     */
    const findVariable = () =>{
        findAllVariable(params.id)
    }

    /**
     * 添加变量
     */
    const addVariable = () =>{
        setFormValue("")
        setVariableVisible(true)
    }

    /**
     * 编辑变量
     * @param reocrd
     */
    const editVariable = reocrd =>{
        setFormValue(reocrd)
        setVariableVisible(true)
    }

    /**
     * 删除变量
     * @param reocrd
     */
    const delVariable = reocrd =>{
        deleteVariable(reocrd.varId).then(res=>{
            if(res.code===0){
                findVariable()
            }
        })
    }

    const columns = [
        {
            title: "变量名",
            dataIndex: "varKey",
            key: "varKey",
            width:"40%",
            ellipsis:true,
        },
        {
            title: "类别",
            dataIndex: "varType",
            key: "varType",
            width:"20%",
            ellipsis:true,
            render:text => text==="str"?"字符串":"单选"
        },
        {
            title: "默认值",
            dataIndex: "varValue",
            key: "varValue",
            width:"30%",
            ellipsis:true,
        },
        taskUpdate ? {
            title: "操作",
            dataIndex: "action",
            key: "action",
            width:"10%",
            ellipsis:true,
            render:(_,record) => (
                <ListAction
                    edit={()=>editVariable(record)}
                    del={()=>delVariable(record)}
                    isMore={true}
                />
            )
        } : {width:0},
    ]

    return(
        <Row className="design-content">
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "16", offset: "4" }}
                className="variable"
            >
                <div className="variable-up">
                    <div className="variable-up-num">共{variableData && variableData.length?variableData.length:0}条</div>
                    { taskUpdate && <Button title={"添加"} onClick={addVariable}/> }
                    <VariableAddEdit
                        {...props}
                        findVariable={findVariable}
                        variableVisible={variableVisible}
                        setVariableVisible={setVariableVisible}
                        formValue={formValue}
                        pipelineId={params.id}
                    />
                </div>
                <div className="variable-tables">
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={variableData}
                        rowKey={record=>record.varId}
                        pagination={false}
                        locale={{emptyText: <ListEmpty />}}
                    />
                </div>
           </Col>
       </Row>
    )
}

export default inject("variableStore","taskStore")(observer(Variable))
