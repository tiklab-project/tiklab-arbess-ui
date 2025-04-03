/**
 * @Description: 流水线maven单元测试
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useState,useEffect} from "react";
import {Row, Col, Spin, Divider, Table, Tag} from "antd";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import Page from "../../../../common/component/page/Page";
import {deleteSuccessReturnCurrenPage} from "../../../../common/utils/Client";
import ListAction from "../../../../common/component/list/ListAction";
import TestMavenDetail from "./TestMavenDetail";
import mavenTestStore from "../store/TestMavenStore";
import "./TestMaven.scss";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";

const pageSize = 15;

const TestMaven = props => {

    const {match:{params}} = props

    const {findMavenTestPage,deleteMavenTest} = mavenTestStore;

    //加载状态
    const [isLoading,setIsLoading] = useState(true)
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
    //测试详情
    const [mavenTestObj,setMavenTestObj] = useState(null);

    useEffect(()=>{
        // 获取测试列表
        findMavenTestPage({
            pipelineId:params.id,
            ...param
        }).then(Res=>{
            if(Res.code===0){
                setTestData(Res.data)
            }
        }).finally(()=>setIsLoading(false))
    },[param])

    /**
     * 查看maven测试详情
     */
    const goMavenTestDetail = (record) => {
        setMavenTestObj(record)
    }

    /**
     * 删除maven测试
     * @param record
     */
    const delMavenTest = (record) => {
        deleteMavenTest(record.id).then(res=>{
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

    if(mavenTestObj){
        return (
            <TestMavenDetail
                mavenTestObj={mavenTestObj}
                setMavenTestObj={setMavenTestObj}
            />
        )
    }

    const columns = [
        {
            title: "测试信息",
            dataIndex: "id",
            key: "id",
            width:"65%",
            ellipsis:true,
            render:(text,record) =>{
                const { id, testState, allNumber, errorNumber, failNumber, skipNumber } = record;
                return (
                    <div className='data-item-left'>
                        <span className='data-item-name' onClick={()=>goMavenTestDetail(record)}>
                            # {id || '--'}
                        </span>
                        {
                            testState==='success' ?
                                <CheckCircleOutlined className='success-text'/>
                                :
                                <CloseCircleOutlined className='fail-text'/>
                        }
                        <div className='data-item-count'>
                            <div className='data-item-pass'>
                                <span className='count-key'>总数</span>
                                {allNumber}
                            </div>
                            <Divider type="vertical" />
                            <div className='data-item-pass'>
                                <span className='count-key'>错误数</span>
                                {errorNumber}
                            </div>
                            <Divider type="vertical" />
                            <div className='data-item-fail'>
                                <span className='count-key'>失败数</span>
                                {failNumber}
                            </div>
                            <Divider type="vertical" />
                            <div className='data-item-fail'>
                                <span className='count-key'>跳过数</span>
                                {skipNumber}
                            </div>
                        </div>
                    </div>
                )
            }
        },
        {
            title: "执行时间",
            dataIndex: "createTime",
            key: "createTime",
            width: "27%",
            ellipsis: true,
        },
        {
            title: "操作",
            dataIndex: "action",
            key:"action",
            width:"8%",
            ellipsis:true,
            render:(_,record)=> (
                <ListAction
                    del={()=>delMavenTest(record)}
                    isMore={true}
                />
            )
        }
    ]

    return (
        <Row className='test-maven'>
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
                            {title:'单元测试'},
                            {title:'Maven'}
                        ]}
                    />
                    <Spin spinning={isLoading}>
                        <div className='test-table'>
                            <Table
                                bordered={false}
                                columns={columns}
                                dataSource={testData?.dataList || []}
                                rowKey={record=>record.id}
                                pagination={false}
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

export default TestMaven
