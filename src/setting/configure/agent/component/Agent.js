import React,{useState,useEffect} from 'react';
import {Row, Col, Table, Tag, Space, Tooltip} from "antd";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import ListIcon from "../../../../common/component/list/ListIcon";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListAction from "../../../../common/component/list/ListAction";
import Page from "../../../../common/component/page/Page";
import {deleteSuccessReturnCurrenPage} from "../../../../common/utils/Client";
import agentStore from "../store/AgentStore";
import "../../../common/Common.scss";
import {UserSwitchOutlined} from "@ant-design/icons";

const pageSize = 15;

const Agent = (props) => {

    const {findAgentPage,deleteAgent,updateDefaultAgent} = agentStore;

    const pageParam = {
        pageSize:pageSize,
        currentPage: 1,
    }

    //agent列表
    const [agentList,setAgentList]=useState([]);
    //agent请求数据
    const [agentRequest,setAgentRequest]=useState({pageParam})
    //agent分页数据
    const [agentPage,setAgentPage]=useState({});

    useEffect(()=>{
        findAgentPage(agentRequest).then(res=>{
            if(res.code===0){
                setAgentList(res.data.dataList);
                setAgentPage({
                    totalPage: res.data.totalPage,
                    totalRecord: res.data.totalRecord,
                })
            }
        })
    },[agentRequest]);

    /**
     * 换页
     */
    const changPage = (page) => {
        setAgentRequest({
            pageParam:{
                pageSize:pageSize,
                currentPage: page,
            }
        })
    }

    /**
     * 设置默认agent
     */
    const setDefaultAgent = (id) => {
        updateDefaultAgent(id).then(res=>{
            if(res.code===0){
                setAgentRequest({
                   ...agentRequest
                })
            }
        })
    }

    /**
     * 删除agent
     * @param id
     */
    const delAgent = (id) => {
        deleteAgent(id).then(res=>{
            if(res.code===0){
                const current = deleteSuccessReturnCurrenPage(agentPage.totalRecord,pageSize,agentRequest.pageParam.currentPage)
                changPage(current)
            }
        })
    }

    const columns = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"25%",
            ellipsis:true,
            render:(text,record) => (
                <span>
                    <ListIcon text={text}/>
                    <span>{text}</span>
                    {
                        record?.businessType==='default' &&
                        <span className='agent-text-default'><Tag color="#87d068">默认</Tag></span>
                    }
                </span>
            )
        },
        {
            title:"Ip",
            dataIndex:"ip",
            key:"ip",
            width:"20%",
            ellipsis:true,
            render:text => text || "--"
        },
        {
            title:"连接时间",
            dataIndex:"createTime",
            key:"createTime",
            width:"25%",
            ellipsis:true,
            render:text => text || "--"
        },
        {
            title:"状态",
            dataIndex: "connect",
            key: "connect",
            width:"20%",
            ellipsis:true,
            render:text => text?<span className="agent-text-success">已连接</span>:<span className="agent-text-danger">未连接</span>
        },
        {
            title:"操作",
            dataIndex: "action",
            key: "action",
            width:"10%",
            render:(text,record) => (
               <Space size={'middle'}>
                   {
                       record?.businessType!=='default' &&
                       <Tooltip title="设置默认">
                           <UserSwitchOutlined
                               style={{fontSize:17,cursor:'pointer'}}
                               onClick={() => setDefaultAgent(record.id)}
                           />
                       </Tooltip>
                   }
                   <ListAction
                       del={record?.connect ? undefined:()=>delAgent(record.id)}
                   />
               </Space>
            )
        },
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
                <div className='mf-home-limited'>
                    <BreadCrumb firstItem={"Agent"}/>
                    <div className="auth-content">
                        <Table
                            columns={columns}
                            dataSource={agentList}
                            rowKey={record=>record.id}
                            pagination={false}
                            locale={{emptyText: <ListEmpty title={'暂无Agent'}/>}}
                        />
                        <Page
                            currentPage={agentRequest.pageParam.currentPage}
                            changPage={changPage}
                            page={agentPage}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
}


export default Agent
