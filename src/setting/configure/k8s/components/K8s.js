/**
 * @Description: Kubernetes集群
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useState,useEffect} from "react";
import {Col, Row, Space, Table} from "antd";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListIcon from "../../../../common/component/list/ListIcon";
import Profile from "../../../../common/component/profile/Profile";
import ListAction from "../../../../common/component/list/ListAction";
import Page from "../../../../common/component/page/Page";
import {deleteSuccessReturnCurrenPage} from "../../../../common/utils/Client";
import K8sAddBtn from "./K8sAddBtn";
import "../../../common/Common.scss";
import k8sStore from "../store/K8sStore";

const pageSize = 15;

const K8s = props => {

    const {findAuthHostK8sPage,deleteAuthHostK8s} = k8sStore;

    //k8s数据
    const [k8sData,setK8sData] = useState({});
    //k8s弹出框
    const [visible,setVisible] = useState(false);
    //k8s弹出框数据
    const [formValue,setFormValue] = useState(null);
    const pageParam = {
        pageSize:pageSize,
        currentPage: 1,
    }
    //请求数据
    const [requestParams,setRequestParams] = useState({
        pageParam,
    });

    useEffect(()=>{
        // 获取k8s
        findAuth()
    },[requestParams])

    /**
     * 获取k8s
     */
    const findAuth = () => {
        findAuthHostK8sPage(requestParams).then(r=>{
            if(r.code===0){
                setK8sData(r.data)
            }
        })
    }

    /**
     * 换页
     */
    const changPage = page => {
        setRequestParams({
            ...requestParams,
            pageParam:{
                pageSize:pageSize,
                currentPage: page,
            }
        })
    }

    /**
     * 编辑K8s配置
     * @param record
     */
    const editK8s = record => {
        setVisible(true)
        setFormValue(record)
    }

    /**
     * 删除K8s配置
     * @param record
     */
    const delK8s = (record) => {
        deleteAuthHostK8s(record.hostId).then(r=>{
            if(r.code===0){
                findAuth()
                const page = deleteSuccessReturnCurrenPage(k8sData.totalRecord,pageSize,requestParams.pageParam.currentPage)
                changPage(page)
            }
        })
    }

    const column = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"18%",
            ellipsis:true,
            render:text => {
                return (
                    <span>
                        <ListIcon text={text}/>
                        <span>{text}</span>
                    </span>
                )
            }
        },
        {
            title:"IP地址",
            dataIndex: "ip",
            key: "ip",
            width:"15%",
            ellipsis:true,
        },
        {
            title:"端口",
            dataIndex: "port",
            key: "port",
            width:"8%",
            ellipsis:true,
        },
        {
            title:"认证类型",
            dataIndex:"authType",
            key:"authType",
            width:"18%",
            ellipsis:true,
            render: text => text===1?"username&password":"私钥"
        },
        {
            title:"创建人",
            dataIndex:["user","nickname"],
            key:"user",
            width:"13%",
            ellipsis:true,
            render:(text,record) => {
                return (
                    <Space>
                        <Profile userInfo={record.user}/>
                        {text}
                    </Space>
                )
            }
        },
        {
            title:"创建时间",
            dataIndex:"createTime",
            key:"createTime",
            width:"20%",
            ellipsis:true,
        },
        {
            title:"操作",
            dataIndex: "action",
            key: "action",
            width:"8%",
            ellipsis:true,
            render:(_,record) => {
                return (
                    <ListAction
                        edit={()=>editK8s(record)}
                        del={()=>delK8s(record)}
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
                lg={{span: "24"}}
                xl={{ span: "22", offset: "1" }}
                xxl={{ span: "18", offset: "3" }}
                className='arbess-home-limited'
            >
                <BreadCrumb firstItem={"Kubernetes集群"}>
                    <K8sAddBtn
                        visible={visible}
                        setVisible={setVisible}
                        formValue={formValue}
                        setFormValue={setFormValue}
                        findAuth={findAuth}
                    />
                </BreadCrumb>
                <div className="auth-content">
                    <Table
                        columns={column}
                        dataSource={k8sData?.dataList || []}
                        rowKey={record=>record.hostId}
                        pagination={false}
                        locale={{emptyText: <ListEmpty />}}
                    />
                    <Page
                        currentPage={requestParams.pageParam.currentPage}
                        changPage={changPage}
                        page={k8sData}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default K8s
