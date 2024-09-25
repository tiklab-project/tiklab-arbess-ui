import React,{useState,useEffect} from "react";
import {Table,Row,Col} from "antd";
import toolStore from "../store/ToolStore";
import ToolModal from "./ToolModal";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import Btn from "../../../../common/component/btn/Btn";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListAction from "../../../../common/component/list/ListAction";
import {TaskIcon,taskTitle} from "../../../../pipeline/design/processDesign/gui/component/TaskTitleIcon";
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

    const columns = [
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
                const taskMap = {
                    1: 'git',
                    5: 'svn',
                    21: 'maven',
                    22: 'nodejs'
                };
                const taskType = taskMap[text];
                return (
                    <>
                        <TaskIcon type={taskType} width={20} height={20}/>
                        <span style={{paddingLeft:5}}>{ taskTitle(taskType) }</span>
                    </>
                )
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

    return (
        <Row className="auth">
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='arbess-home-limited'>
                    <BreadCrumb firstItem={"工具"}>
                        <Btn
                            onClick={addEnvi}
                            type={"primary"}
                            title={"添加工具"}
                        />
                    </BreadCrumb>
                    <div className="auth-content">
                        <Table
                            columns={columns}
                            dataSource={enviData}
                            rowKey={record=>record.scmId}
                            pagination={false}
                            locale={{emptyText: <ListEmpty />}}
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
