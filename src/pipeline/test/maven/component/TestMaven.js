import React,{useState,useEffect} from "react";
import {Table,Tag,Row,Col} from "antd";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import Page from "../../../../common/component/page/Page";
import {deleteSuccessReturnCurrenPage} from "../../../../common/utils/Client";
import ListAction from "../../../../common/component/list/ListAction";
import TestMavenDetail from "./TestMavenDetail";
import mavenTestStore from "../store/TestMavenStore";
import "./TestMaven.scss";

const pageSize = 15;

/**
 * 测试页面
 */
const TestMaven = props => {

    const {match:{params}} = props

    const {findMavenTestPage,deleteMavenTest} = mavenTestStore;

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
    const [mavenTestObj,setMavenTestObj] = useState(null);

    useEffect(()=>{
        // 获取测试列表
        findMavenTestPage({
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
            setIsLoading(false)
        })
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
            dataIndex: "id",
            key: "id",
            width:"22%",
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
            width:"8%",
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
        <Row className='test-maven'>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{span: "24"}}
                xl={{ span: "21", offset: "1" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className="mf-home-limited mf">
                    <BreadCrumb firstItem={"Maven单元测试"}/>
                    <div className='test-table'>
                        <Table
                            bordered={false}
                            loading={isLoading}
                            columns={columns}
                            dataSource={testList}
                            rowKey={record=>record.id}
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

export default TestMaven
