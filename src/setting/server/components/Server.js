import React,{useState,useEffect} from "react";
import {Space, Table, Row, Col, Select} from "antd";
import serverStore from "../store/ServerStore";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../common/component/list/ListEmpty";
import ListIcon from "../../../common/component/list/ListIcon";
import ListAction from "../../../common/component/list/ListAction";
import Profile from "../../../common/component/profile/Profile";
import ServerAddBtn from "./ServerAddBtn";
import "../../common/Common.scss";
import SearchInput from "../../../common/component/search/SearchInput";
import SearchSelect from "../../../common/component/search/SearchSelect";
import Page from "../../../common/component/page/Page";

const pageSize = 13;

/**
 * 服务集成
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Server = props =>{

    const {findAuthServerPage,deleteAuthServer} = serverStore

    //弹出框状态
    const [visible,setVisible] = useState(false);
    //弹出窗form表单value
    const [formValue,setFormValue] = useState(null);
    //服务配置列表
    const [authServer,setAuthServer] = useState({});

    const pageParam = {
        pageSize:pageSize,
        currentPage: 1,
    };
    //请求数据
    const [requestParams,setRequestParams] = useState({
        pageParam
    });

    useEffect(()=>{
        // 初始化服务配置
        findAuth()
    },[requestParams])

    /**
     * 获取服务配置
     */
    const findAuth = () =>{
        findAuthServerPage(requestParams).then(r=>{
            if(r.code===0){
                setAuthServer(r.data)
            }
        })
    }

    /**
     * 模糊搜索
     */
    const onSearch = e => {
        setRequestParams({
            ...requestParams,
            pageParam,
            name:e.target.value,
        })
    }

    /**
     * 切换服务配置类型
     */
    const changeServer = value =>{
        setRequestParams({
            ...requestParams,
            pageParam,
            type:value==='all' ? null:value
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
     * 编辑服务配置
     * @param record
     */
    const editServer = record => {
        setFormValue(record)
        setVisible(true)
    }

    /**
     * 删除服务配置
     * @param record
     */
    const delServer = record =>{
        deleteAuthServer(record.serverId).then(r=>{
            if(r.code===0){
                findAuth()
            }
        })
    }

    // 标题
    const name = text => (
        <span>
            <ListIcon text={text}/>
            <span>{text}</span>
        </span>
    )

    // 创建人
    const user = (text,record) => (
        <Space>
            <Profile userInfo={record.user}/>
            {text || '--'}
        </Space>
    )

    // 操作
    const action = record =>{
        const {type} = record
        if(type==='gitpuk' || type==='hadess' || type==='testhubo'){
            if(version ==='cloud'){
                return (
                    <ListAction edit={()=>editServer(record)}/>
                )
            }
        }
        return (
            <ListAction
                edit={()=>editServer(record)}
                del={()=>delServer(record)}
            />
        )
    }

    // 全部
    const allColumn = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"20%",
            ellipsis:true,
            render:text => name(text)
        },
        {
            title: "服务地址",
            dataIndex: "serverAddress",
            key: "serverAddress",
            width:"25%",
            ellipsis:true,
            render:text => text || '--'
        },
        {
            title:"类型",
            dataIndex:"type",
            key:"type",
            width:"10%",
            ellipsis:true,
        },
        {
            title:"创建人",
            dataIndex:["user","nickname"],
            key:"user",
            width:"17%",
            ellipsis:true,
            render:(text,record) => user(text,record)
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
            render:(text,record) => action(record)
        }
    ]

    // 第三方授权认证 Gitee和Github
    const authorizeColumn = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"20%",
            ellipsis:true,
            render:text => name(text)
        },
        {
            title:"授权信息",
            dataIndex:"accessToken",
            key:"accessToken",
            width:"25%",
            ellipsis:true,
        },
        {
            title:"创建人",
            dataIndex:["user","nickname"],
            key:["user","nickname"],
            width:"25%",
            ellipsis:true,
            render:(text,record) => user(text,record)

        },
        {
            title:"创建时间",
            dataIndex:"createTime",
            key:"createTime",
            width:"22%",
            ellipsis:true,
        },
        {
            title:"操作",
            dataIndex: "action",
            key: "action",
            width:"8%",
            ellipsis:true,
            render:(text,record) => action(record)
        }
    ]

    // sonar & nexus & testhubo & xcode
    const authColumn = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"20%",
            ellipsis:true,
            render:text => name(text)
        },
        {
            title: "服务地址",
            dataIndex: "serverAddress",
            key: "serverAddress",
            width:"23%",
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
            key:["user","nickname"],
            width:"16%",
            ellipsis:true,
            render:(text,record) => user(text,record)
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
            render:(_,record) => action(record)
        }
    ]

    // 表格内容
    const columns = () =>{
        switch (requestParams?.type) {
            case 'gitee':
            case 'github':
            case 'gitlab':
                return authorizeColumn
            case 'gitpuk':
            case 'testhubo':
            case 'sonar' :
            case 'nexus' :
            case 'hadess' :
                return authColumn
            default:
                return allColumn
        }
    }

    return(
        <Row className="auth">
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "22", offset: "1"}}
                xxl={{ span: "20", offset: "2" }}
            >
                <div className="arbess-home-limited">
                    <BreadCrumb firstItem={"服务集成"} >
                        <ServerAddBtn
                            type={'gitee'}
                            visible={visible}
                            setVisible={setVisible}
                            formValue={formValue}
                            setFormValue={setFormValue}
                            findAuth={findAuth}
                        />
                    </BreadCrumb>
                    <div className="auth-select">
                        <SearchInput
                            placeholder="搜索名称、服务地址"
                            style={{ width: 190 }}
                            onPressEnter={onSearch}
                        />
                        <SearchSelect
                            placeholder="服务类型"
                            style={{width:150}}
                            onChange={changeServer}
                        >
                            {
                                [
                                    {id:'all', title: "全部"},
                                    {id:'gitee', title:"Gitee"},
                                    {id:'github', title:"Github"},
                                    {id:'gitlab', title:"Gitlab"},
                                    {id:'gitpuk', title:"GitPuk"},
                                    {id:'testhubo', title:"TestHubo"},
                                    {id:'sonar', title:"Sonar"},
                                    {id:'nexus', title:"Nexus"},
                                    {id:'hadess', title:"Hadess"},
                                ].map(item=>(
                                    <Select.Option value={item.id} key={item.id}>{item.title}</Select.Option>
                                ))
                            }
                        </SearchSelect>
                    </div>
                    <div className="auth-content">
                        <Table
                            columns={columns()}
                            dataSource={authServer?.dataList || []}
                            rowKey={record=>record.serverId}
                            pagination={false}
                            locale={{emptyText: <ListEmpty />}}
                        />
                        <Page
                            currentPage={requestParams.pageParam.currentPage}
                            changPage={changPage}
                            page={authServer}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Server