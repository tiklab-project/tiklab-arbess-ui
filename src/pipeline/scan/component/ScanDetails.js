import React,{useState,useEffect} from "react";
import {Table} from "antd";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../common/component/list/ListEmpty";
import scanStore from "../store/ScanStore";
import "./Scan.scss";

const ScanDetails = (props) => {

    const {detailObj,setDetailObj} = props

    const {findBugs} = scanStore;

    const [bugsList,setBugsList] = useState([]);

    // 加载状态
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        if(detailObj?.xmlPath){
            findBugs(detailObj.xmlPath).then(res=>{
                setIsLoading(false)
                if(res.code===0){
                    setBugsList(res.data)
                }
            })
        }
    }, [detailObj?.xmlPath]);

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
        <div className="scan">
            <div className="mf-home-limited mf">
                <BreadCrumb
                    firstItem={"代码扫描"}
                    onClick={backScan}
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
                        locale={{emptyText: <ListEmpty title={"暂无代码扫描"}/>}}
                    />
                </div>
            </div>
        </div>
    )
}

export default ScanDetails
