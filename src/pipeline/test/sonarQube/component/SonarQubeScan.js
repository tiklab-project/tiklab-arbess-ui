/**
 * @Description: SonarQubeScan 扫描
 * @Author: gaomengyuan
 * @Date: 2025/5/26
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/5/26
 */
import React,{useState,useEffect} from "react";
import {Row, Col, Spin, Divider, Table} from "antd";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import Page from "../../../../common/component/page/Page";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListAction from "../../../../common/component/list/ListAction";
import {deleteSuccessReturnCurrenPage} from "../../../../common/utils/Client";
import sonarQubeScanStore from "../store/SonarQubeScanStore";
import "./SonarQubeScan.scss";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons";

const pageSize = 15;

const SonarQubeScan = (props) => {

    const {match:{params}} = props;

    const {findSonarQubeScanPage,deleteSonarQubeScan} = sonarQubeScanStore;

    //代码扫描数据
    const [scanData,setScanData] = useState({});
    //加载
    const [spinning,setSpinning] = useState(false);
    const pageParam = {
        pageSize: pageSize,
        currentPage: 1,
    };
    //请求数据
    const [scanParam,setScanParam] = useState({pageParam});

    useEffect(() => {
        setSpinning(true)
        findSonarQubeScanPage({
            pipelineId:params.id,
            ...scanParam,
        }).then(res=>{
            if(res.code===0){
                setScanData(res.data)
            }
        }).finally(()=>setSpinning(false))
    }, [scanParam]);

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

    /**
     * 删除SonarQube
     */
    const delSonarQube = record =>{
        deleteSonarQubeScan(record.id).then(res=>{
            if(res.code===0){
                const current = deleteSuccessReturnCurrenPage(scanData.totalRecord, pageSize, scanData.currentPage)
                changPage(current)
            }
        })
    }

    /**
     * 跳转详情
     */
    const goSonarQube = (record) => {
        window.open(`${record.url}`)
    }

    const columns = [
        {
            title: "名称",
            dataIndex: "name",
            key: "name",
            width:"65%",
            ellipsis:true,
            render:(text,record) =>{
                const { id, status, ncloc, files, bugs, loophole } = record;
                return (
                    <div className='data-item-left'>
                        <span className='data-item-name' onClick={()=>goSonarQube(record)}>
                            # {text || id || '--'}
                        </span>
                        {
                            status==='OK' &&
                                <CheckCircleOutlined className='success-text'/>
                        }
                        {
                            status==='ERROR' &&
                                <CloseCircleOutlined className='fail-text'/>
                        }
                        {
                            status==='WARN' &&
                                <ExclamationCircleOutlined className='warn-text'/>
                        }
                        {
                            status==='NONE' &&
                                <QuestionCircleOutlined className='warn-text'/>
                        }
                        <div className='data-item-count'>
                            <div className='data-item-pass'>
                                <span className='count-key'>代码行数</span>
                                {ncloc}
                            </div>
                            <Divider type="vertical" />
                            <div className='data-item-pass'>
                                <span className='count-key'>文件数量</span>
                                {files}
                            </div>
                            <Divider type="vertical" />
                            <div className='data-item-pass'>
                                <span className='count-key'>Bug数量</span>
                                {bugs}
                            </div>
                            <Divider type="vertical" />
                            <div className='data-item-fail'>
                                <span className='count-key'>漏洞数量</span>
                                {loophole}
                            </div>
                        </div>
                    </div>
                )
            }
        },
        {
            title: "扫描时间",
            dataIndex: "createTime",
            key: "createTime",
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
                    del={()=>delSonarQube(record)}
                    isMore={true}
                />
            )
        }
    ]

    return (
        <Row className='sonarquebe'>
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
                            {title:'代码扫描'},
                            {title:'SonarQube'}
                        ]}
                    />
                    <Spin spinning={spinning}>
                        <div className="sonarquebe-table">
                            <Table
                                bordered={false}
                                columns={columns}
                                dataSource={scanData?.dataList || []}
                                rowKey={record=>record.id}
                                pagination={false}
                                locale={{emptyText: <ListEmpty />}}
                            />
                            <Page
                                currentPage={scanData?.currentPage}
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

export default SonarQubeScan
