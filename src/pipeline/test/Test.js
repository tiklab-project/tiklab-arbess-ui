import React,{useState,useEffect} from "react";
import {Tooltip,Table} from "antd";
import {applyJump} from "tiklab-core-ui"
import {DeleteOutlined} from "@ant-design/icons";
import testOnStore from "../design/processDesign/processDesign/store/TestOnStore";
import Breadcrumb from "../../common/component/breadcrumb/Breadcrumb";
import ListEmpty from "../../common/component/list/ListEmpty";
import {SpinLoading} from "../../common/component/loading/Loading";
import Page from "../../common/component/page/Page";
import {deleteSuccessReturnCurrenPage} from "../../common/utils/Client";
import ListAction from "../../common/component/list/ListAction";
import "./Test.scss";

/**
 * 测试页面(teston)
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Test = props => {

    const {match:{params}} = props

    const {findAllRelevance,deleteRelevance} = testOnStore

    const [pageParam] = useState({
        pageSize:10,
        currentPage: 1,
    })

    // 测试列表
    const [testList,setTestList] = useState([])

    // 测试页数
    const [testPage,setTestPage] = useState({
        totalPage:1,
        totalRecord:1
    })

    // 请求数据
    const [param,setParam] = useState({
        pageParam
    })

    // 加载状态
    const [isLoading,setIsLoading] = useState(true)


    useEffect(()=>{
        // 获取测试列表
        findAllRelevance({
            pipelineId:params.id,
            ...param
        }).then(r=>{
            if(r.code===0){
                setTestList(r.data?.dataList || [])
                setTestPage({
                    totalPage: r.data?.totalPage || 1,
                    totalRecord: r.data?.totalRecord || 1,
                })
            }

            setIsLoading(false)
        })
    },[param])

    /**
     * 查看测试详情
     * @param item
     */
    const goTestDetail = item => {
        if(item.status===2) return
        const url = item.url+"/#/repository/report/"+item.testonId
        return applyJump(url)
    }

    /**
     * 删除测试
     * @param item
     */
    const del = (item) => {
        deleteRelevance(item.relevanceId).then(res=>{
            if(res.code===0){
                const current = deleteSuccessReturnCurrenPage(testPage.totalRecord,10,param.pageParam.currentPage)
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
                pageSize:10,
                currentPage: page
            }
        })
    }

    const columns = [
        {
            title: "名称",
            dataIndex: ["object","testPlanName"],
            key: "testPlanName",
            width:"30%",
            ellipsis:true,
            render:(text,record) =>{
                return (
                    <span
                        className="test-item-name"
                        onClick={()=>goTestDetail(record)}
                    >
                        # {text}
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
            title: "成功率",
            dataIndex: ["object","passRate"],
            key: "passRate",
            width:"15%",
            ellipsis:true,
            render:text=>text || '0.00%'
        },
        {
            title: "时间",
            dataIndex: "time",
            key: "time",
            width:"15%",
            ellipsis:true,
            render:text=>text || '--'
        },
        {
            title: "操作",
            dataIndex: "action",
            key:"action",
            width:"10%",
            ellipsis:true,
            render:(_,record)=> (
                <ListAction
                    del={()=>del(record)}
                />
            )
        }
    ]


    return (
        <div className='test'>
            <div className="test-content mf">
                <Breadcrumb firstItem={"测试报告"}/>
                <div className='test-table'>
                    <Table
                        bordered={false}
                        loading={isLoading}
                        columns={columns}
                        dataSource={testList}
                        rowKey={record=>record.relevanceId}
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
        </div>
    )
}

export default Test
