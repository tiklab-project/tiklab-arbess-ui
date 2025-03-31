/**
 * @Description: 流水线代码扫描详情
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useState,useEffect} from "react";
import {Table,Row,Col} from "antd";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import scanStore from "../store/ScanStore";
import "./Scan.scss";

const ScanDetails = (props) => {

    const {detailObj,setDetailObj} = props

    const {findBugs} = scanStore;

    //扫描bug列表
    const [bugsList,setBugsList] = useState([]);
    //加载状态
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        if(detailObj?.xmlPath){
            //扫描bug列表
            findBugs(detailObj.xmlPath).then(res=>{
                if(res.code===0){
                    setBugsList(res.data)
                }
            }).finally(()=>setIsLoading(false))
        }
    }, [detailObj?.xmlPath]);

    /**
     * 返回
     */
    const backScan = () => {
        setDetailObj(null)
    }

    const columns = [
        {
            title: "包路径",
            dataIndex: ["bugClass","classname"],
            key: ["bugClass","classname"],
            width:"60%",
            ellipsis:true,
        },
        {
            title: "Bug类型",
            dataIndex: "bugType",
            key: "bugType",
            width:"30%",
            ellipsis:true,
        },
        {
            title: "优先级",
            dataIndex: "bugPriority",
            key: "bugPriority",
            width:"10%",
            ellipsis:true,
        },
    ]

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
                            {title:'代码扫描',click:()=>backScan()},
                            {title:detailObj?.id}
                        ]}
                    />
                    <div className="scan-overview">
                        <div className="scan-overview-info">
                            <div className="scan-overview-info-item">
                                <div>检测Bug数量</div>
                                <div>{detailObj?.totalBugs || 0}</div>
                            </div>
                            <div className="scan-overview-info-item">
                                <div>检测包数量</div>
                                <div>{detailObj?.numPackages || 0}</div>
                            </div>
                            <div className="scan-overview-info-item">
                                <div>检测类数量</div>
                                <div>{detailObj?.totalClasses || 0}</div>
                            </div>
                            <div className="scan-overview-info-item">
                                <div>一级问题</div>
                                <div>{detailObj?.priorityOne || 0}</div>
                            </div>
                            <div className="scan-overview-info-item">
                                <div>二级问题</div>
                                <div>{detailObj?.priorityTwo || 0}</div>
                            </div>
                            <div className="scan-overview-info-item">
                                <div>三级问题</div>
                                <div>{detailObj?.priorityThree || 0}</div>
                            </div>
                        </div>
                    </div>
                    <div className="scan-table">
                        <Table
                            bordered={false}
                            loading={isLoading}
                            columns={columns}
                            dataSource={bugsList}
                            pagination={false}
                            rowKey={(_,index)=>index}
                            expandable={{
                                expandedRowRender: (record) => (
                                    <div className="scan-table-expand">
                                        <div>{record.bugCode?.description}</div>
                                        <div>{record?.longMessage}</div>
                                    </div>
                                )}}
                            locale={{emptyText: <ListEmpty />}}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default ScanDetails
