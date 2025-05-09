/**
 * @Description: Agent
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
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
import Button from "../../../../common/component/button/Button";
import {disableFunction} from "tiklab-core-ui";
import EnhanceModal from "../../../../common/component/modal/EnhanceModal";

const pageSize = 15;

const Agent = (props) => {

    const {AgentAddComponent} = props;

    const {findAgentPage,deleteAgent,updateDefaultAgent} = agentStore;

    const disable = disableFunction();

    const pageParam = {
        pageSize:pageSize,
        currentPage: 1,
    }

    //agent数据
    const [agentData,setAgentData] = useState({});
    //agent请求数据
    const [agentRequest,setAgentRequest]=useState({pageParam});
    //添加弹出框
    const [visible,setVisible] = useState(false);
    //特性弹出框
    const [featureModal,setFeatureModal] = useState(false);

    useEffect(()=>{
        //获取agent
        findAgent()
    },[agentRequest]);

    /**
     * 获取Agent
     */
    const findAgent = () =>{
        findAgentPage({
            ...agentRequest,
            displayType: 'yes',
        }).then(res=>{
            if(res.code===0){
                setAgentData(res.data)
            }
        })
    }

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
                const current = deleteSuccessReturnCurrenPage(agentData.totalRecord,pageSize,agentRequest.pageParam.currentPage)
                changPage(current)
            }
        })
    }

    /**
     * 添加
     */
    const addAgent = () =>{
        if(disable){
            setFeatureModal(true)
        } else {
            setVisible(true)
        }
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
            title:"IP地址",
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
            ellipsis:true,
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
                   {
                       record?.connect ? null : (
                           <ListAction
                               del={()=>delAgent(record.id)}
                               isMore={true}
                           />
                       )
                   }
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
                <div className='arbess-home-limited'>
                    <BreadCrumb
                        crumbs={[
                            {title:'Agent'}
                        ]}
                    >
                        <Button
                            type={'primary'}
                            onClick={addAgent}
                        >添加</Button>
                    </BreadCrumb>
                    {
                        AgentAddComponent &&
                        <AgentAddComponent
                            visible={visible}
                            setVisible={setVisible}
                            findAgent={findAgent}
                            findAgentPage={findAgentPage}
                        />
                    }
                    <EnhanceModal
                        type={'configure'}
                        visible={featureModal}
                        setVisible={setFeatureModal}
                    />
                    <div className="auth-content">
                        <Table
                            columns={columns}
                            dataSource={agentData?.dataList || []}
                            rowKey={record=>record.id}
                            pagination={false}
                            locale={{emptyText: <ListEmpty />}}
                        />
                        <Page
                            currentPage={agentRequest.pageParam.currentPage}
                            changPage={changPage}
                            page={agentData}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
}


export default Agent
