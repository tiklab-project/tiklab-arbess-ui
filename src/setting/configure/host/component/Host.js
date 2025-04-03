/**
 * @Description: 主机配置页面
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React, {useEffect, useState} from "react";
import {Space, Table, Row, Col, Select} from "antd";
import hostStore from "../store/HostStore";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListIcon from "../../../../common/component/list/ListIcon";
import ListAction from "../../../../common/component/list/ListAction";
import Profile from "../../../../common/component/profile/Profile";
import SearchInput from "../../../../common/component/search/SearchInput";
import SearchSelect from "../../../../common/component/search/SearchSelect";
import Page from "../../../../common/component/page/Page";
import HostAddBtn from "./HostAddBtn";
import {deleteSuccessReturnCurrenPage} from "../../../../common/utils/Client";
import "../../../common/Common.scss";

const pageSize = 13;

const Host = props =>{

    const {findAuthHostPage,deleteAuthHost} = hostStore

    //弹出框状态
    const [visible,setVisible] = useState(false);
    //弹出框form表单value
    const [formValue,setFormValue] = useState(null);
    //主机
    const [host,setHost] = useState({});

    const pageParam = {
        pageSize:pageSize,
        currentPage: 1,
    }
    //请求数据
    const [requestParams,setRequestParams] = useState({
        pageParam
    });

    useEffect(()=>{
        findAuth()
    },[requestParams])

    /**
     * 获取主机配置
     */
    const findAuth = () =>{
        findAuthHostPage(requestParams).then(r=>{
            if(r.code===0){
                setHost(r.data)
            }
        })
    }

    /**
     * 模糊查询
     */
    const onSearch = e => {
        setRequestParams({
            ...requestParams,
            pageParam,
            name:e.target.value,
        })
    }

    /**
     * 筛选
     */
    const changeHost = value => {
        setRequestParams({
            ...requestParams,
            pageParam,
            type:value
        })
    }

    /**
     * 换页
     */
    const changPage = page => {
        setRequestParams({
            ...requestParams,
            pageParam:{
                pageSize:pageSize,
                currentPage: page,
            }
        })
    }

    /**
     * 编辑主机配置
     * @param record
     */
    const editHost = record => {
        setVisible(true)
        setFormValue(record)
    }

    /**
     * 删除主机配置
     * @param record
     */
    const delHost = record =>{
        deleteAuthHost(record.hostId).then(r=>{
            if(r.code===0){
                const page = deleteSuccessReturnCurrenPage(host.totalRecord,pageSize,requestParams.pageParam.currentPage)
                changPage(page)
            }
        })
    }

    const column = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"18%",
            ellipsis:true,
            render:text => {
                return (
                    <span>
                        <ListIcon text={text}/>
                        <span>{text}</span>
                    </span>
                )
            }
        },
        {
            title:"IP地址",
            dataIndex: "ip",
            key: "ip",
            width:"15%",
            ellipsis:true,
        },
        {
            title:"端口",
            dataIndex: "port",
            key: "port",
            width:"8%",
            ellipsis:true,
        },
        {
            title:"认证类型",
            dataIndex:"authType",
            key:"authType",
            width:"18%",
            ellipsis:true,
            render: text => text===1?"username&password":"私钥"
        },
        {
            title:"创建人",
            dataIndex:["user","nickname"],
            key:"user",
            width:"13%",
            ellipsis:true,
            render:(text,record) => {
                return  <Space>
                            <Profile userInfo={record.user}/>
                            {text}
                        </Space>
            }
        },
        {
            title:"创建时间",
            dataIndex:"createTime",
            key:"createTime",
            width:"20%",
            ellipsis:true,
        },
        {
            title:"操作",
            dataIndex: "action",
            key: "action",
            width:"8%",
            ellipsis:true,
            render:(_,record) => {
                return (
                    <ListAction
                        edit={()=>editHost(record)}
                        del={()=>delHost(record)}
                        isMore={true}
                    />
                )
            }
        }
    ]

    return(
        <Row className="auth">
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{span: "24"}}
                xl={{ span: "22", offset: "1" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className="arbess-home-limited">
                    <BreadCrumb
                        crumbs={[
                            {title:'主机'}
                        ]}
                    >
                        <HostAddBtn
                            visible={visible}
                            setVisible={setVisible}
                            formValue={formValue}
                            setFormValue={setFormValue}
                            findAuth={findAuth}
                        />
                    </BreadCrumb>
                    <div className="auth-select">
                        <SearchInput
                            placeholder="搜索名称、IP地址"
                            style={{ width: 190 }}
                            onPressEnter={onSearch}
                        />
                        <SearchSelect
                            placeholder="主机类型"
                            style={{width:150}}
                            onChange={changeHost}
                        >
                            <Select.Option value={null}>全部</Select.Option>
                            <Select.Option value={'common'}>普通主机</Select.Option>
                            <Select.Option value={'aliyun'}>阿里云主机</Select.Option>
                            <Select.Option value={'tencent'}>腾讯云主机</Select.Option>
                        </SearchSelect>
                    </div>
                    <div className="auth-content">
                        <Table
                            columns={column}
                            dataSource={host?.dataList || []}
                            rowKey={record=>record.hostId}
                            pagination={false}
                            locale={{emptyText: <ListEmpty />}}
                        />
                        <Page
                            currentPage={requestParams.pageParam.currentPage}
                            changPage={changPage}
                            page={host}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Host
