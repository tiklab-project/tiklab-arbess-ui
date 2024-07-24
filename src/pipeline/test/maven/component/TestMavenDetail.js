import React,{useState,useEffect} from "react";
import {Table, Tag,Row,Col} from "antd";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import mavenTestStore from "../store/TestMavenStore";
import "./TestMaven.scss";

/**
 * maven单元测试详情
 */
const TestMavenDetail = (props) => {

    const {mavenTestObj,setMavenTestObj} = props;

    const {findMavenTestList} = mavenTestStore;

    const [mavenTestList,setMavenTestList] = useState([]);
    // 加载状态
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        if(mavenTestObj?.id){
            findMavenTestList({
                testId:mavenTestObj.id
            }).then(res => {
                setIsLoading(false);
                if(res.code===0){
                    setMavenTestList(res.data);
                }
            })
        }
    },[mavenTestObj?.id])

    /**
     * 返回测试报告
     */
    const backTest = () => {
        setMavenTestObj(null);
    }

    const columns = [
        {
            title: "名称",
            dataIndex: "name",
            key: "name",
            width:"40%",
            ellipsis:true,
            render:text=>text || "--"
        },
        {
            title: "状态",
            dataIndex: "testState",
            key: "testState",
            width:"12%",
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
            width:"12%",
            ellipsis:true,
            render:text=>text || '0'
        },
        {
            title: "错误用例数",
            dataIndex: "errorNumber",
            key: "errorNumber",
            width:"12%",
            ellipsis:true,
            render:text=>text || '0'
        },
        {
            title: "失败用例数",
            dataIndex: "failNumber",
            key: "failNumber",
            width:"12%",
            ellipsis:true,
            render:text=>text || '0'
        },
        {
            title: "跳过用例数",
            dataIndex: "skipNumber",
            key: "skipNumber",
            width:"12%",
            ellipsis:true,
            render:text=>text || '0'
        },
    ]

    return (
        <Row className='test'>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{span: "24"}}
                xl={{ span: "21", offset: "1" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className="mf-home-limited mf">
                    <BreadCrumb firstItem={"测试报告"} onClick={backTest}/>
                    <div className='test-overview'>
                        <div className="test-overview-info">
                            <div className="test-overview-info-item">
                                <div>状态</div>
                                <div className={`testState-${mavenTestObj?.testState}`}>
                                    {
                                        mavenTestObj?.testState==='success'?
                                            "成功"
                                            :
                                            "失败"
                                    }
                                </div>
                            </div>
                            <div className="test-overview-info-item">
                                <div>总用例数</div>
                                <div>{mavenTestObj?.allNumber || 0}</div>
                            </div>
                            <div className="test-overview-info-item">
                                <div>错误用例数</div>
                                <div>{mavenTestObj?.errorNumber || 0}</div>
                            </div>
                            <div className="test-overview-info-item">
                                <div>失败用例数</div>
                                <div>{mavenTestObj?.failNumber || 0}</div>
                            </div>
                            <div className="test-overview-info-item">
                                <div>跳过用例数</div>
                                <div>{mavenTestObj?.skipNumber || 0}</div>
                            </div>
                        </div>
                    </div>
                    <div className="test-table">
                        <Table
                            bordered={false}
                            loading={isLoading}
                            columns={columns}
                            dataSource={mavenTestList}
                            pagination={false}
                            rowKey={r=>r.id}
                            expandable={{
                                expandedRowRender: (record) => (
                                    <div className="test-table-expand">
                                        {record?.message}
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

export default TestMavenDetail
