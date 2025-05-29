/**
 * @Description: Kubernetes集群
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useState,useEffect} from "react";
import {Col, Row, Space, Spin, Table, Tag} from "antd";
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
import K8sDetail from "./K8sDetail";

const pageSize = 13;

const K8s = props => {

    const {findKubectlPage,deleteKubectl} = k8sStore;

    //k8s数据
    const [k8sData,setK8sData] = useState({});
    //k8s弹出框
    const [visible,setVisible] = useState(false);
    //k8s详情数据
    const [formValue,setFormValue] = useState(null);
    const pageParam = {
        pageSize:pageSize,
        currentPage: 1,
    }
    //请求数据
    const [requestParams,setRequestParams] = useState({
        pageParam,
    });
    //加载
    const [spinning,setSpinning] = useState(false);
    //k8s详情状态
    const [detailVisible,setDetailVisible] = useState(false);

    useEffect(()=>{
        // 获取k8s
        findAuth()
    },[requestParams])

    /**
     * 获取k8s
     */
    const findAuth = () => {
        setSpinning(true)
        findKubectlPage(requestParams).then(r=>{
            if(r.code===0){
                setK8sData(r.data)
            }
        }).finally(()=>{
            setSpinning(false)
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
        deleteKubectl(record.id).then(r=>{
            if(r.code===0){
                const page = deleteSuccessReturnCurrenPage(k8sData.totalRecord,pageSize,requestParams.pageParam.currentPage)
                changPage(page)
            }
        })
    }

    /**
     * 详情
     */
    const goDetail = (record) => {
        setFormValue(record);
        setDetailVisible(true);
    }

    const column = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"16%",
            ellipsis:true,
            render:(text,record) => {
                return (
                    <span className='k8s-table-name' onClick={()=>goDetail(record)}>
                        <ListIcon text={text}/>
                        <span>{text}</span>
                    </span>
                )
            }
        },
        {
            title:"集群地址",
            dataIndex: ['k8sVersion','serverAddress'],
            key: "serverAddress",
            width:"20%",
            ellipsis:true,
        },
        {
            title:"集群状态",
            dataIndex: "connect",
            key: "connect",
            width:"13%",
            ellipsis:true,
            render: text=>text?<Tag color={'blue'}>正常</Tag>:<Tag color={'red'}>无法连接</Tag>
        },
        {
            title:"集群节点数量",
            dataIndex: "allNodes",
            key: "allNodes",
            width:"10%",
            ellipsis:true,
            render: text=> text?.length ? <span className='k8s-table-node'>{text.length}</span> : '--'
        },
        {
            title:"创建人",
            dataIndex:["user","nickname"],
            key:"user",
            width:"15%",
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
            width:"18%",
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
                        isMore={true}
                    />
                )
            }
        }
    ]

    // if(detailVisible){
    //     return (
    //         <K8sDetail
    //             visible={detailVisible}
    //             setVisible={setDetailVisible}
    //             formValue={formValue}
    //             setFormValue={setFormValue}
    //         />
    //     )
    // }

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
                <BreadCrumb
                    crumbs={[
                        {title:'Kubernetes集群'}
                    ]}
                >
                    <K8sAddBtn
                        visible={visible}
                        setVisible={setVisible}
                        formValue={formValue}
                        setFormValue={setFormValue}
                        findAuth={findAuth}
                    />
                </BreadCrumb>
                <Spin spinning={spinning}>
                    <div className="auth-content">
                        <Table
                            columns={column}
                            dataSource={k8sData?.dataList || []}
                            rowKey={record=>record.id}
                            pagination={false}
                            locale={{emptyText: <ListEmpty />}}
                        />
                        <Page
                            currentPage={requestParams.pageParam.currentPage}
                            changPage={changPage}
                            page={k8sData}
                        />
                    </div>
                </Spin>
                <K8sDetail
                    visible={detailVisible}
                    setVisible={setDetailVisible}
                    formValue={formValue}
                    setFormValue={setFormValue}
                />
            </Col>
        </Row>
    )
}

export default K8s
