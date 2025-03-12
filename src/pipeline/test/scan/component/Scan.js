/**
 * @Description: 流水线代码扫描
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useState,useEffect} from "react";
import {Table,Row,Col} from "antd";
import {observer} from "mobx-react";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import Page from "../../../../common/component/page/Page";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListAction from "../../../../common/component/list/ListAction";
import {deleteSuccessReturnCurrenPage} from "../../../../common/utils/Client";
import scanStore from "../store/ScanStore";
import ScanDetails from "./ScanDetails";
import "./Scan.scss";

const pageSize = 15;

const Scan = (props) => {

    const {match:{params}} = props

    const {spotbugsScan,deleteSpotbugs} = scanStore

    //加载状态
    const [isLoading,setIsLoading] = useState(true)
    //页数
    const [scanPage,setScanPage] = useState({
        totalPage:1,
        totalRecord:1
    })
    const pageParam = {
        pageSize:pageSize,
        currentPage: 1,
    }
    //请求数据
    const [scanParam,setScanParam] = useState({pageParam})
    //扫描数据
    const [scanList,setScanList] = useState([]);
    //扫描详情
    const [detailObj,setDetailObj] = useState(null);

    useEffect(()=>{
        //获取代码扫描
        spotbugsScan({
            pipelineId:params.id,
            ...scanParam
        }).then(r=>{
            if(r.code===0){
                setScanList(r.data?.dataList || [])
                setScanPage({
                    totalPage: r.data?.totalPage || 1,
                    totalRecord: r.data?.totalRecord || 1,
                })
            }
        }).finally(()=>setIsLoading(false))
    },[scanParam])

    /**
     * 详情
     * @param record
     */
    const getBugs = record => {
        setDetailObj(record)
    }

    /**
     * 删除
     * @param record
     */
    const del = record => {
        deleteSpotbugs(record.id).then(res=>{
            if(res.code===0){
                const current = deleteSuccessReturnCurrenPage(scanPage.totalRecord,pageSize,scanParam.pageParam.currentPage)
                changPage(current)
            }
        })
    }

    /**
     * 换页
     * @param page
     */
    const changPage = page => {
        setScanParam({
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
            width:"20%",
            ellipsis:true,
            render:(text,record) =>{
                return (
                    <span className="scan-item-name" onClick={()=>getBugs(record)}>
                        # {text}
                    </span>
                )
            }
        },
        {
            title: "Bug数量",
            dataIndex: "totalBugs",
            key: "totalBugs",
            width:"13%",
            ellipsis:true,
            render:text=>(
                <div className="scan-data-height">{text || '0'}</div>
            )
        },
        {
            title: "一级问题",
            dataIndex: "priorityOne",
            key: "priorityOne",
            width:"13%",
            ellipsis:true,
        },
        {
            title: "二级问题",
            dataIndex: "priorityTwo",
            key: "priorityTwo",
            width:"13%",
            ellipsis:true,
            render:text=>text || '0'
        },
        {
            title: "三级问题",
            dataIndex: "priorityThree",
            key: "priorityThree",
            width:"13%",
            ellipsis:true,
            render:text=>text || '0'
        },
        {
            title: "扫描时间",
            dataIndex: "scanTime",
            key: "scanTime",
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
                    del={()=>del(record)}
                />
            )
        }
    ]

    if(detailObj){
        return (
            <ScanDetails
                detailObj={detailObj}
                setDetailObj={setDetailObj}
            />
        )
    }

    return (
        <Row className="scan">
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "21", offset: "1" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className="arbess-home-limited">
                    <BreadCrumb firstItem={"代码扫描"}/>
                    <div className="scan-table">
                        <Table
                            bordered={false}
                            loading={isLoading}
                            columns={columns}
                            dataSource={scanList}
                            rowKey={record=>record.id}
                            pagination={false}
                            locale={{emptyText: <ListEmpty />}}
                        />
                        <Page
                            currentPage={scanParam.pageParam.currentPage}
                            changPage={changPage}
                            page={scanPage}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default observer(Scan)
