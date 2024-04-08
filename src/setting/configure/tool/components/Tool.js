import React,{useState,useEffect} from "react";
import {Table,Row,Col} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import toolStore from "../store/ToolStore";
import ToolModal from "./ToolModal";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import Btn from "../../../../common/component/btn/Btn";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListAction from "../../../../common/component/list/ListAction";
import {TaskTitleIcon} from "../../../../pipeline/design/processDesign/gui/component/TaskTitleIcon";
import ListIcon from "../../../../common/component/list/ListIcon";
import "../../../common/Common.scss";

/**
 * 工具配置
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Tool = props =>{

    const {findAllPipelineScm,deletePipelineScm,updatePipelineScm} = toolStore

    const [visible,setVisible] = useState(false)
    const [enviData,setEnviData] = useState([])
    const [formValue,setFormValue] = useState(null)

    useEffect(()=>{
        // 初始化环境配置
        findAllScm()
    },[])

    /**
     * 获取所有环境配置
     */
    const findAllScm = () =>{
        findAllPipelineScm().then(res=>{
            if(res.code===0 && res.data){
                setEnviData(res.data)
            }
        })
    }

    /**
     * 添加环境配置
     */
    const addEnvi = () =>{
        setFormValue(null)
        setVisible(true)
    }

    /**
     * 删除环境配置
     * @param record
     */
    const delEnvi = record => {
        deletePipelineScm(record.scmId).then(res=>{
            if(res.code===0){
                findAllScm()
            }
        })
    }

    /**
     * 编辑环境配置
     * @param record
     */
    const editEnvi = record => {
        setFormValue(record)
        setVisible(true)
    }

    const columnsCe = [
        {
            title:"名称",
            dataIndex:"scmName",
            key:"scmName",
            width:"25%",
            ellipsis:true,
            render:text => {
                return  <span>
                            <ListIcon text={text}/>
                            <span>{text}</span>
                        </span>
            }
        },
        {
            title:"类型",
            dataIndex:"scmType",
            key:"scmType",
            width:"25%",
            ellipsis:true,
            render:text =>{
                switch (text) {
                    case 1:  return <TaskTitleIcon type='git'/>
                    case 5:  return <TaskTitleIcon type='svn'/>
                    case 21: return <TaskTitleIcon type='maven'/>
                    case 22: return <TaskTitleIcon type='nodejs'/>
                }
            }
        },
        {
            title:"地址",
            dataIndex:"scmAddress",
            key:"scmAddress",
            width:"40%",
            ellipsis:true,
        },
        {
            title:"操作",
            dataIndex:"action",
            key:"action",
            width:"10%",
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <ListAction
                        edit={()=>editEnvi(record)}
                        del={()=>delEnvi(record)}
                    />
                )
            }
        }
    ]

    const columns = [
        {
            title:"名称",
            dataIndex:"scmName",
            key:"scmName",
            width:"30%",
            ellipsis:true,
            render:text => {
                return  <span>
                            <ListIcon text={text}/>
                            <span>{text}</span>
                        </span>
            }
        },
        {
            title:"类型",
            dataIndex:"scmType",
            key:"scmType",
            width:"30%",
            ellipsis:true,
            render:text =>{
                switch (text) {
                    case 1:  return <TaskTitleIcon type='git'/>
                    case 5:  return <TaskTitleIcon type='svn'/>
                    case 21: return <TaskTitleIcon type='maven'/>
                    case 22: return <TaskTitleIcon type='nodejs'/>
                }
            }
        },
        {
            title:"地址",
            dataIndex:"scmAddress",
            key:"scmAddress",
            width:"40%",
            ellipsis:true,
        }
    ]

    return (
        <Row className="auth">
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='mf-home-limited mf'>
                    <BreadCrumb firstItem={"工具"}>
                        {
                            version==='ce' &&
                            <Btn
                                onClick={addEnvi}
                                type={"primary"}
                                title={"添加工具"}
                                icon={<PlusOutlined/>}
                            />
                        }
                    </BreadCrumb>
                    <div className="auth-content">
                        <Table
                            columns={version==='ce'?columnsCe:columns}
                            dataSource={enviData}
                            rowKey={record=>record.scmId}
                            pagination={false}
                            locale={{emptyText: <ListEmpty title={'暂无环境配置'}/>}}
                        />

                        <ToolModal
                            visible={visible}
                            setVisible={setVisible}
                            enviData={enviData}
                            updatePipelineScm={updatePipelineScm}
                            formValue={formValue}
                            findAllScm={findAllScm}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Tool
