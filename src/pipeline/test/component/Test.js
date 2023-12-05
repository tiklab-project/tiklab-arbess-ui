import React,{useState,useEffect} from "react";
import {Table,message,Tag,Row,Col} from "antd";
import {applyJump} from "tiklab-core-ui"
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../common/component/list/ListEmpty";
import Page from "../../../common/component/page/Page";
import {deleteSuccessReturnCurrenPage} from "../../../common/utils/Client";
import ListAction from "../../../common/component/list/ListAction";
import Tabs from "../../../common/component/tabs/Tabs";
import TestMavenDetail from "./TestMavenDetail";
import testOnStore from "../store/TestOnStore";
import mavenTestStore from "../store/MavenTestStore";
import "./Test.scss";

/**
 * 测试页面(teston)
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Test = props => {

    const {match:{params}} = props

    const {findAllRelevance,deleteRelevance} = testOnStore;
    const {findMavenTestPage,deleteMavenTest} = mavenTestStore;

    // teston:自动化测试；unit:单元测试
    const [activeTab,setActiveTab] = useState("mavenTest");

    // 加载状态
    const [isLoading,setIsLoading] = useState(true)

    // 测试列表
    const [testList,setTestList] = useState([])

    // 测试页数
    const [testPage,setTestPage] = useState({
        totalPage:1,
        totalRecord:1
    })

    const pageParam= {
        pageSize:15,
        currentPage: 1,
    }

    // 请求数据
    const [param,setParam] = useState({
        pageParam
    })

    const [mavenTestObj,setMavenTestObj] = useState(null);

    useEffect(()=>{
        // 获取测试列表
        findTestList().then(Res=>{
            if(Res.code===0){
                setTestList(Res.data?.dataList || [])
                setTestPage({
                    totalPage: Res.data?.totalPage || 1,
                    totalRecord: Res.data?.totalRecord || 1,
                })
            }
            setIsLoading(false)
        })
    },[param])

    /**
     * 获取测试列表
     */
    const findTestList = async () => {
        let Res;
        if(activeTab === "teston"){
            Res = await findAllRelevance({
                pipelineId:params.id,
                ...param
            })
        }else {
            Res = findMavenTestPage({
                pipelineId:params.id,
                ...param
            })
        }
        return Res
    }

    /**
     * 查看测试详情
     * @param item
     */
    const goTestonDetail = item => {
        if(item.status===2){
            return message.info("当前测试报告详情已删除")
        }
        const url = item.url+"/#/repository/report/"+item.testonId
        return applyJump(url)
    }

    /**
     * 删除自动化测试
     * @param item
     */
    const delTeston = (item) => {
        deleteRelevance(item.relevanceId).then(res=>{
            if(res.code===0){
                const current = deleteSuccessReturnCurrenPage(testPage.totalRecord,15,param.pageParam.currentPage)
                changPage(current)
            }
        })
    }

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
                const current = deleteSuccessReturnCurrenPage(testPage.totalRecord,15,param.pageParam.currentPage)
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
                pageSize:15,
                currentPage: page
            }
        })
    }

    /**
     * 切换tab
     * @param item
     */
    const changActiveTab = item => {
        setIsLoading(true);
        setActiveTab(item.id)
        setParam({
            pageParam
        })
    }

    const testonColumns = [
        {
            title: "名称",
            dataIndex: ["object","testPlanName"],
            key: "testPlanName",
            width:"25%",
            ellipsis:true,
            render:(text,record) =>{
                return (
                    <span
                        className="test-item-name"
                        onClick={()=>goTestonDetail(record)}
                    >
                        # {text || '--'}
                    </span>
                )
            }
        },
        {
            title: "用例数",
            dataIndex: ["object","total"],
            key: "total",
            width:"10%",
            ellipsis:true,
            render:text=>text || '0'
        },
        {
            title: "成功数",
            dataIndex: ["object","passNum"],
            key: "passNum",
            width:"10%",
            ellipsis:true,
            render:text=>text || '0'
        },
        {
            title: "失败数",
            dataIndex: ["object","failNum"],
            key: "failNum",
            width:"10%",
            ellipsis:true,
            render:text=>text || '0'
        },
        {
            title: "通过率",
            dataIndex: ["object","passRate"],
            key: "passRate",
            width:"10%",
            ellipsis:true,
            render:text=> <Tag color="green">{text || "0.00%"}</Tag>
        },
        {
            title: "失误率",
            dataIndex: ["object","errorRate"],
            key: "errorRate",
            width:"10%",
            ellipsis:true,
            render:text=> <Tag color="red">{text || "0.00%"}</Tag>
        },
        {
            title: "执行时间",
            dataIndex: "time",
            key: "time",
            width:"20%",
            ellipsis:true,
            render:text=>text || '--'
        },
        {
            title: "操作",
            dataIndex: "action",
            key:"action",
            width:"5%",
            ellipsis:true,
            render:(_,record)=> (
                <ListAction
                    del={()=>delTeston(record)}
                />
            )
        }
    ]

    const mavenTestColumns = [
        {
            title: "名称",
            dataIndex: "id",
            key: "id",
            width:"25%",
            ellipsis:true,
            render:(text,record) =>{
                return (
                    <span
                        className="test-item-name"
                        onClick={()=>goMavenTestDetail(record)}
                    >
                        # {text}
                    </span>
                )
            }
        },
        {
            title: "状态",
            dataIndex: "testState",
            key: "testState",
            width:"10%",
            ellipsis:true,
            render:text=>(
                text==='success'?
                <Tag color="green">成功</Tag>
                :
                <Tag color="red">失败</Tag>
            )
        },
        {
            title: "总用例数",
            dataIndex: "allNumber",
            key: "allNumber",
            width:"10%",
            ellipsis:true,
            render:text=>text || '0'
        },
        {
            title: "错误用例数",
            dataIndex: "errorNumber",
            key: "errorNumber",
            width:"10%",
            ellipsis:true,
            render:text=>text || '0'
        },
        {
            title: "失败用例数",
            dataIndex: "failNumber",
            key: "failNumber",
            width:"10%",
            ellipsis:true,
            render:text=>text || '0'
        },
        {
            title: "跳过用例数",
            dataIndex: "skipNumber",
            key: "skipNumber",
            width:"10%",
            ellipsis:true,
            render:text=>text || '0'
        },
        {
            title: "执行时间",
            dataIndex: "createTime",
            key: "createTime",
            width:"20%",
            ellipsis:true,
        },
        {
            title: "操作",
            dataIndex: "action",
            key:"action",
            width:"5%",
            ellipsis:true,
            render:(_,record)=> (
                <ListAction
                    del={()=>delMavenTest(record)}
                />
            )
        }
    ]

    if(mavenTestObj){
        return (
            <TestMavenDetail
                mavenTestObj={mavenTestObj}
                setMavenTestObj={setMavenTestObj}
            />
        )
    }

    return (
        <Row className='test'>
            <Col
                lg={{span: "24"}}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className="mf-home-limited mf">
                    <BreadCrumb firstItem={"测试报告"}/>
                    <Tabs
                        tabLis={[
                            {id:"mavenTest",title:"单元测试"},
                            {id:"teston",title:"自动化测试"},
                        ]}
                        type={activeTab}
                        onClick={changActiveTab}
                    />
                    <div className='test-table'>
                        <Table
                            bordered={false}
                            loading={isLoading}
                            columns={activeTab==="teston"?testonColumns:mavenTestColumns}
                            dataSource={testList}
                            rowKey={record=>{
                                if(record.relevanceId){
                                    return record.relevanceId
                                }
                                return record.id
                            }}
                            pagination={false}
                            locale={{emptyText: <ListEmpty title={"暂无测试报告"}/>}}
                        />
                        <Page
                            currentPage={param.pageParam.currentPage}
                            changPage={changPage}
                            page={testPage}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Test
