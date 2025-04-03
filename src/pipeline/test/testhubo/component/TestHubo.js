/**
 * @Description: 流水线TestHubo自动化测试
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useState,useEffect} from "react";
import {message, Row, Col, Divider, Spin, Table} from "antd";
import {applyJump} from "tiklab-core-ui"
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import Page from "../../../../common/component/page/Page";
import {deleteSuccessReturnCurrenPage} from "../../../../common/utils/Client";
import ListAction from "../../../../common/component/list/ListAction";
import testhuboStore from "../store/TestHuboStore";
import "./TestHubo.scss";

const pageSize = 15;

const TestHubo = props => {

    const {match:{params}} = props

    const {findAllRelevance,deleteRelevance} = testhuboStore;

    //加载状态
    const [isLoading,setIsLoading] = useState(true);
    //测试数据
    const [testData,setTestData] = useState({});
    const pageParam= {
        pageSize:pageSize,
        currentPage: 1,
    }
    //请求数据
    const [param,setParam] = useState({
        pageParam
    })

    useEffect(()=>{
        //获取测试列表
        findAllRelevance({
            pipelineId:params.id,
            ...param
        }).then(Res=>{
            if(Res.code===0){
                setTestData(Res.data)
            }
        }).finally(()=>setIsLoading(false))
    },[param])

    /**
     * 查看测试详情
     * @param item
     */
    const goTestHubo = item => {
        if(item.status===2){
            return message.info("当前测试报告详情已删除")
        }
        return applyJump(`${item.url}/#/plan/${item.testonId}/instance`)
    }

    /**
     * 删除自动化测试
     * @param item
     */
    const delTestHubo = (item) => {
        deleteRelevance(item.relevanceId).then(res=>{
            if(res.code===0){
                const current = deleteSuccessReturnCurrenPage(testData.totalRecord,pageSize,param.pageParam.currentPage)
                changPage(current)
            }
        })
    }

    /**
     * 换页
     * @param page
     */
    const changPage = page => {
        setParam({
            pageParam:{
                pageSize:pageSize,
                currentPage: page
            }
        })
    }

    const columns = [
        {
            title: "测试信息",
            dataIndex: ["object","testPlanName"],
            key: "testPlanName",
            width:"65%",
            ellipsis:true,
            render:(text,record) =>{
                const { object } = record;
                const { passNum='0', failNum='0' } = object || {};
                return (
                    <div className='data-item-left'>
                        <span className='data-item-name' onClick={()=>goTestHubo(record)}>
                            # {text || '--'}
                        </span>
                        <div className='data-item-count'>
                            <div className='data-item-pass'>
                                <span className='count-key'>成功数</span>
                                {passNum}
                            </div>
                            <Divider type="vertical" />
                            <div className='data-item-fail'>
                                <span className='count-key'>失败数</span>
                                {failNum}
                            </div>
                        </div>
                    </div>
                )
            }
        },
        {
            title: "执行时间",
            dataIndex: "time",
            key: "time",
            width:"27%",
            ellipsis:true,
            render:text=>text || '--'
        },
        {
            title: "操作",
            dataIndex: "action",
            key:"action",
            width:"8%",
            ellipsis:true,
            render:(_,record)=> (
                <ListAction
                    del={()=>delTestHubo(record)}
                    isMore={true}
                />
            )
        }
    ]

    return (
        <Row className='test-hubo'>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "21", offset: "1" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className="arbess-home-limited">
                    <BreadCrumb
                        crumbs={[
                            {title:'自动化测试'},
                            {title:'TestHubo'}
                        ]}
                    />
                   <Spin spinning={isLoading}>
                       <div className='test-table'>
                           <Table
                               bordered={false}
                               pagination={false}
                               columns={columns}
                               dataSource={testData?.dataList || []}
                               rowKey={record=>record.relevanceId}
                               locale={{emptyText: <ListEmpty />}}
                           />
                           <Page
                               currentPage={param.pageParam.currentPage}
                               changPage={changPage}
                               page={testData}
                           />
                       </div>
                   </Spin>
                </div>
            </Col>
        </Row>
    )
}

export default TestHubo
