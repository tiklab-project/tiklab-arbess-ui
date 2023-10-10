import React,{useState,useEffect} from "react";
import {Row, Col, message, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Btn from "../../../../common/component/btn/Btn";
import EmptyText from "../../../../common/component/emptyText/EmptyText";
import Listaction from "../../../../common/component/list/Listaction";
import VariableAdd from "./VariableAdd";
import "./Variable.scss";

/**
 * 变量页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Variable = props =>{

    const {variableStore,pipelineStore} = props

    const {createVariable,findVariable,fresh,variableData,deleteVariable,updateVariable} = variableStore
    const {pipeline} = pipelineStore

    const [variableVisible,setVariableVisible] = useState(false)
    const [formValue,setFormValue] = useState("")


    useEffect(()=>{
        // 初始化变量
        findVariable(pipeline.id)
    },[fresh])

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
            res.code===0 && message.info("删除成功",0.5)
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
                <Listaction
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
                               variableData={variableData}
                               createVariable={createVariable}
                               updateVariable={updateVariable}
                               pipelineId={pipeline && pipeline.id}
                           />
                       </div>
                       <div className="variable-tables">
                           <Table
                               bordered={false}
                               columns={columns}
                               dataSource={variableData}
                               rowKey={record=>record.varId}
                               pagination={false}
                               locale={{emptyText: <EmptyText title={"暂无变量"}/>}}
                           />
                       </div>
                   </div>
               </div>
           </Col>
       </Row>
    )
}

export default inject("variableStore","pipelineStore")(observer(Variable))
