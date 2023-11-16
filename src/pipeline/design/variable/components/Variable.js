import React,{useState,useEffect} from "react";
import {Row, Col, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Btn from "../../../../common/component/btn/Btn";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListAction from "../../../../common/component/list/ListAction";
import VariableAddEdit from "./VariableAddEdit";
import "./Variable.scss";

/**
 * 变量页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Variable = props =>{

    const {variableStore,match:{params}} = props

    const {findAllVariable,deleteVariable,variableData} = variableStore

    const [variableVisible,setVariableVisible] = useState(false)
    const [formValue,setFormValue] = useState("")

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
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            width:"10%",
            render:(_,record) => (
                <ListAction
                    edit={()=>editVariable(record)}
                    del={()=>delVariable(record)}
                />
            )
        },
    ]

    return(
        <Row className="design-content">
            <Col md={{ span: 24 }} lg={{ span: "18", offset: "3" }}>
               <div className="variable">
                   <div className="variable-content">
                       <div className="variable-up">
                           {/*<div className="variable-up-title">变量</div>*/}
                           <div className="variable-up-num">共{variableData && variableData.length?variableData.length:0}个变量</div>
                           <Btn
                               title={"添加"}
                               icon={<PlusOutlined/>}
                               onClick={()=>addVariable()}
                           />
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
                               locale={{emptyText: <ListEmpty title={"暂无变量"}/>}}
                           />
                       </div>
                   </div>
               </div>
           </Col>
       </Row>
    )
}

export default inject("variableStore")(observer(Variable))
