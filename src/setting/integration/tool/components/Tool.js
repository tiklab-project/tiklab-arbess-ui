/**
 * @Description: 工具配置
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useState,useEffect} from "react";
import {Table, Row, Col, Space} from "antd";
import toolStore from "../store/ToolStore";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListAction from "../../../../common/component/list/ListAction";
import ListIcon from "../../../../common/component/list/ListIcon";
import "../../../common/Common.scss";
import ToolAddBtn from "./ToolAddBtn";
import {scmTitle,scmImage} from "./ToolCommon";

const Tool = props =>{

    const {findAllPipelineScm,deletePipelineScm} = toolStore

    //弹出框
    const [visible,setVisible] = useState(false)
    //工具数据
    const [toolData,setToolData] = useState([])
    //表单数据
    const [formValue,setFormValue] = useState(null)

    useEffect(()=>{
        // 初始化工具配置
        findAllScm()
    },[])

    /**
     * 获取所有工具配置
     */
    const findAllScm = () =>{
        findAllPipelineScm().then(res=>{
            if(res.code===0 && res.data){
                setToolData(res.data)
            }
        })
    }

    /**
     * 删除工具配置
     * @param record
     */
    const delTool = record => {
        deletePipelineScm(record.scmId).then(res=>{
            if(res.code===0){
                findAllScm()
            }
        })
    }

    /**
     * 编辑工具配置
     * @param record
     */
    const editTool = record => {
        setFormValue(record)
        setVisible(true)
    }

    const columns = [
        {
            title:"名称",
            dataIndex:"scmName",
            key:"scmName",
            width:"30%",
            ellipsis:true,
            render:text => (
                <span>
                    <ListIcon text={text}/>
                    <span>{text}</span>
                </span>
            )
        },
        {
            title:"类型",
            dataIndex:"scmType",
            key:"scmType",
            width:"20%",
            ellipsis:true,
            render:text =>(
                <Space size={'small'}>
                    <img src={scmImage[text]} alt="" width={20} height={20}/>
                    <span>{ scmTitle[text] }</span>
                </Space>
            )
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
                        edit={()=>editTool(record)}
                        del={()=>delTool(record)}
                        isMore={true}
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
                    <BreadCrumb
                        crumbs={[
                            {title:'工具集成'}
                        ]}
                    >
                        <ToolAddBtn
                            visible={visible}
                            setVisible={setVisible}
                            formValue={formValue}
                            setFormValue={setFormValue}
                            findAllScm={findAllScm}
                        />
                    </BreadCrumb>
                    <div className="auth-content">
                        <Table
                            columns={columns}
                            dataSource={toolData}
                            rowKey={record=>record.scmId}
                            pagination={false}
                            locale={{emptyText: <ListEmpty />}}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Tool
