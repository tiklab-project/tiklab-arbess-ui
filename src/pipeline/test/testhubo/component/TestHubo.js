import React,{useState,useEffect} from "react";
import {Table,message,Tag,Row,Col} from "antd";
import {applyJump} from "tiklab-core-ui"
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import Page from "../../../../common/component/page/Page";
import {deleteSuccessReturnCurrenPage} from "../../../../common/utils/Client";
import ListAction from "../../../../common/component/list/ListAction";
import testhuboStore from "../store/TestHuboStore";
import "./TestHubo.scss";

const pageSize = 15;

/**
 * 测试页面
 */
const TestHubo = props => {

    const {match:{params}} = props

    const {findAllRelevance,deleteRelevance} = testhuboStore;

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
        pageSize:pageSize,
        currentPage: 1,
    }
    // 请求数据
    const [param,setParam] = useState({
        pageParam
    })

    useEffect(()=>{
        // 获取测试列表
        findAllRelevance({
            pipelineId:params.id,
            ...param
        }).then(Res=>{
            if(Res.code===0){
                setTestList(Res.data?.dataList || [])
                setTestPage({
                    totalPage: Res.data?.totalPage || 1,
                    totalRecord: Res.data?.totalRecord || 1,
                })
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
    const delTeston = (item) => {
        deleteRelevance(item.relevanceId).then(res=>{
            if(res.code===0){
                const current = deleteSuccessReturnCurrenPage(testPage.totalRecord,pageSize,param.pageParam.currentPage)
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
            title: "名称",
            dataIndex: ["object","testPlanName"],
            key: "testPlanName",
            width:"22%",
            ellipsis:true,
            render:(text,record) =>{
                return (
                    <span className="test-item-name" onClick={()=>goTestHubo(record)}>
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
            width:"8%",
            ellipsis:true,
            render:(_,record)=> (
                <ListAction
                    del={()=>delTeston(record)}
                />
            )
        }
    ]

    return (
        <Row className='test-on'>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{span: "24"}}
                xl={{ span: "21", offset: "1" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className="arbess-home-limited">
                    <BreadCrumb firstItem={"TestHubo自动化测试"}/>
                    <div className='test-table'>
                        <Table
                            bordered={false}
                            loading={isLoading}
                            columns={columns}
                            dataSource={testList}
                            rowKey={record=>record.relevanceId}
                            pagination={false}
                            locale={{emptyText: <ListEmpty />}}
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

export default TestHubo
