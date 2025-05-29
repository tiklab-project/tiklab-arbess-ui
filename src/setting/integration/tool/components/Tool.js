/**
 * @Description: 工具配置
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useState,useEffect} from "react";
import {Table, Row, Col, Space, Spin, Select} from "antd";
import toolStore from "../store/ToolStore";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListAction from "../../../../common/component/list/ListAction";
import ListIcon from "../../../../common/component/list/ListIcon";
import "../../../common/Common.scss";
import ToolAddBtn from "./ToolAddBtn";
import {scmTitle, scmImage, scmList} from "./ToolCommon";
import Page from "../../../../common/component/page/Page";
import {deleteSuccessReturnCurrenPage} from "../../../../common/utils/Client";
import SearchInput from "../../../../common/component/search/SearchInput";
import SearchSelect from "../../../../common/component/search/SearchSelect";

const pageSize = 13;

const Tool = props =>{

    const {findPipelineScmPage,deletePipelineScm} = toolStore

    const pageParam = {
        pageSize:pageSize,
        currentPage: 1,
    }
    //弹出框
    const [visible,setVisible] = useState(false)
    //工具数据
    const [toolData,setToolData] = useState([])
    //表单数据
    const [formValue,setFormValue] = useState(null)
    //请求数据
    const [requestParams,setRequestParams] = useState({
        pageParam,
    });
    //加载
    const [spinning,setSpinning] = useState(false)

    useEffect(()=>{
        // 初始化工具配置
        findAllScm()
    },[requestParams])

    /**
     * 获取所有工具配置
     */
    const findAllScm = () =>{
        setSpinning(true)
        findPipelineScmPage(requestParams).then(res=>{
            if(res.code===0){
                setToolData(res.data)
            }
        }).finally(()=>{
            setSpinning(false)
        })
    }

    /**
     * 模糊查询
     */
    const onSearch = (e) => {
        setRequestParams({
            ...requestParams,
            pageParam,
            name: e.target.value
        })
    }

    /**
     * 切换类型
     * @param value
     */
    const changeTool = (value) => {
        const {scmType,...rest} = requestParams;
        setRequestParams({
            ...rest,
            pageParam,
            ...(value !== 'all' && { scmType: value }),
        })
    }

    /**
     * 换页
     */
    const changPage = page=>{
        setRequestParams({
            ...requestParams,
            pageParam: {
                pageSize: pageSize,
                currentPage: page
            }
        })
    }

    /**
     * 删除工具配置
     * @param record
     */
    const delTool = record => {
        deletePipelineScm(record.scmId).then(res=>{
            if(res.code===0){
                const page = deleteSuccessReturnCurrenPage(toolData.totalRecord,pageSize,requestParams.pageParam.currentPage)
                changPage(page)
            }
        })
    }

    /**
     * 编辑工具配置
     * @param record
     */
    const editTool = record => {
        setFormValue(record)
        setVisible(true)
    }

    const columns = [
        {
            title:"名称",
            dataIndex:"scmName",
            key:"scmName",
            width:"30%",
            ellipsis:true,
            render:text => (
                <span>
                    <ListIcon text={text}/>
                    <span>{text}</span>
                </span>
            )
        },
        {
            title:"类型",
            dataIndex:"scmType",
            key:"scmType",
            width:"20%",
            ellipsis:true,
            render:text =>(
                <Space size={'small'}>
                    <img src={scmImage[text]} alt="" width={20} height={20}/>
                    <span>{ scmTitle[text] }</span>
                </Space>
            )
        },
        {
            title:"地址",
            dataIndex:"scmAddress",
            key:"scmAddress",
            width:"40%",
            ellipsis:true,
        },
        {
            title:"操作",
            dataIndex:"action",
            key:"action",
            width:"10%",
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <ListAction
                        edit={()=>editTool(record)}
                        del={()=>delTool(record)}
                        isMore={true}
                    />
                )
            }
        }
    ]

    return (
        <Row className="auth">
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='arbess-home-limited'>
                    <BreadCrumb
                        crumbs={[
                            {title:'工具集成'}
                        ]}
                    >
                        <ToolAddBtn
                            visible={visible}
                            setVisible={setVisible}
                            formValue={formValue}
                            setFormValue={setFormValue}
                            findAllScm={findAllScm}
                        />
                    </BreadCrumb>
                    <div className="auth-select">
                        <SearchInput
                            placeholder="搜索名称"
                            style={{ width: 190 }}
                            onPressEnter={onSearch}
                        />
                        <SearchSelect
                            placeholder="工具类型"
                            style={{width:150}}
                            onChange={changeTool}
                        >
                            {
                                ['all',...scmList].map(id=>(
                                    <Select.Option value={id} key={id}>{id==='all'? '全部' : scmTitle[id]}</Select.Option>
                                ))
                            }
                        </SearchSelect>
                    </div>
                    <Spin spinning={spinning}>
                        <div className="auth-content">
                            <Table
                                columns={columns}
                                dataSource={toolData?.dataList || []}
                                rowKey={record=>record.scmId}
                                pagination={false}
                                locale={{emptyText: <ListEmpty />}}
                            />
                            <Page
                                currentPage={requestParams.pageParam.currentPage}
                                changPage={changPage}
                                page={toolData}
                            />
                        </div>
                    </Spin>
                </div>
            </Col>
        </Row>
    )
}

export default Tool
