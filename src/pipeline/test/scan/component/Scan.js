/**
 * @Description: 流水线代码扫描
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useState,useEffect} from "react";
import {Row, Col, Spin, Divider, Table} from "antd";
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

    const {match:{params}} = props;

    const {spotbugsScan,deleteSpotbugs} = scanStore;

    //加载状态
    const [isLoading,setIsLoading] = useState(true);
    //代码扫描数据
    const [scanData,setScanData] = useState({});
    const pageParam = {
        pageSize: pageSize,
        currentPage: 1,
    };
    //请求数据
    const [scanParam,setScanParam] = useState({pageParam});
    //扫描详情
    const [detailObj,setDetailObj] = useState(null);

    useEffect(()=>{
        //获取代码扫描
        spotbugsScan({
            pipelineId:params.id,
            ...scanParam
        }).then(r=>{
            if(r.code===0){
                setScanData(r.data)
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
                const current = deleteSuccessReturnCurrenPage(scanData.totalRecord,pageSize,scanParam.currentPage)
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
                pageSize: pageSize,
                currentPage: page
            }
        })
    }

    const columns = [
        {
            title: "名称",
            dataIndex: "id",
            key: "id",
            width:"65%",
            ellipsis:true,
            render:(text,record) =>{
                const {priorityOne, priorityTwo, priorityThree} = record;
                return (
                    <div className='data-item-left'>
                        <span className='data-item-name' onClick={()=>getBugs(record)}>
                            # {text || '--'}
                        </span>
                        <div className='data-item-count'>
                            <div className='data-item-pass'>
                                <span className='count-key'>一级问题</span>
                                {priorityOne || '0'}
                            </div>
                            <Divider type="vertical" />
                            <div className='data-item-fail'>
                                <span className='count-key'>二级问题</span>
                                {priorityTwo || '0'}
                            </div>
                            <Divider type="vertical" />
                            <div className='data-item-fail'>
                                <span className='count-key'>三级问题</span>
                                {priorityThree || '0'}
                            </div>
                        </div>
                    </div>
                )
            }
        },
        {
            title: "扫描时间",
            dataIndex: "scanTime",
            key: "scanTime",
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
                    del={()=>del(record)}
                    isMore={true}
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
                    <BreadCrumb
                        crumbs={[
                            {title:'代码扫描'}
                        ]}
                    />
                    <Spin spinning={isLoading}>
                        <div className="scan-table">
                            <Table
                                bordered={false}
                                columns={columns}
                                dataSource={scanData?.dataList || []}
                                rowKey={record=>record.id}
                                pagination={false}
                                locale={{emptyText: <ListEmpty />}}
                            />
                            <Page
                                currentPage={scanParam.pageParam.currentPage}
                                changPage={changPage}
                                page={scanData}
                            />
                        </div>
                    </Spin>
                </div>
            </Col>
        </Row>
    )
}

export default observer(Scan)
