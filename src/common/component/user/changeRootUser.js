/**
 * @Description: 更换负责人
 * @Author: gaomengyuan
 * @Date: 2025/3/20
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/20
 */
import React,{useEffect,useState} from "react";
import Modals from "../modal/Modal";
import pipelineStore from "../../../pipeline/pipeline/store/PipelineStore";
import SearchInput from "../search/SearchInput";
import {message, Table} from "antd";
import ListEmpty from "../list/ListEmpty";
import Page from "../page/Page";
import './ChangeRootUser.scss';
import Button from "../button/Button";

const pageSize = 5;

const ChangeRootUser = (props) => {

    const {domainId,visible,setVisible,onRefresh} = props;

    const {findUserPage,findAllList,updatePipelineRootUser} = pipelineStore;

    //用户信息
    const [user,setUser] = useState({});
    const pageParam = {
        pageSize,
        currentPage:1
    };
    //用户请求数据
    const [requestParam,setRequestParam] = useState({pageParam});
    //用户目录
    const [userDirs, setUserDir] = useState([]);
    //选中的用户
    const [selectUser,setSelectUser] = useState(null);

    useEffect(() => {
        if(visible){
            findAllList().then(res => {
                if (res.code===0) {
                    setUserDir(res.data)
                }
            })
        }
    }, [visible]);

    useEffect(() => {
        if(visible){
            findUser()
        }
    }, [visible,requestParam]);

    /**
     * 获取所有用户
     */
    const findUser = () => {
        findUserPage(requestParam).then(res=>{
            if(res.code===0){
                setUser(res.data)
            }
        })
    }

    /**
     * 模糊查询用户
     * @param e
     */
    const changFindUser = e =>{
        setRequestParam({
            pageParam,
            nickname:e.target.value
        })
    }

    /**
     * 换页查询用户
     * @param page
     */
    const changUserPage = page =>{
        setRequestParam({
            ...requestParam,
            pageParam:{
                pageSize,
                currentPage:page
            }
        })
    }

    /**
     * 确定
     */
    const onOk = () => {
        if(selectUser?.length > 0 ){
            updatePipelineRootUser({
                userId:selectUser[0],
                domainId:domainId,
                businessType:0
            }).then(res=>{
                if(res.code===0){
                    if(typeof onRefresh === 'function'){
                        onRefresh()
                    }
                    message.success('更换成功')
                    setVisible(false);
                    setSelectUser(null);
                } else {
                    message.error(res.msg);
                }
            })
            return
        }
        message.info('请选择更换的流水线负责人！');
    }

    /**
     * 关闭弹出框提示
     */
    const onCancel = () => {
        message.info('请更换流水线负责人！');
    }

    const columns = [
        {
            title:"姓名",
            dataIndex:"nickname",
            key:"nickname",
            width:"22%",
            ellipsis:true
        },
        {
            title: "用户名",
            dataIndex: 'name',
            key: 'name',
            width: "21%",
            ellipsis:true,
            render:text=> text || '--'
        },
        {
            title: "手机号",
            dataIndex: 'phone',
            key: 'phone',
            width: "21%",
            ellipsis:true,
            render:text=> text || '--'
        },
        {
            title: "邮箱",
            dataIndex: 'email',
            key: 'email',
            width: "21%",
            ellipsis:true,
            render:text=> text || '--'
        },
        {
            title: "用户目录",
            dataIndex: 'dirId',
            key: 'dirId',
            width: "15%",
            ellipsis:true,
            render:text=>{
                const dir = userDirs.find(item=>item.id === text)
                return dir ? dir.name : '--'
            }
        },
    ]

    return (
        <Modals
            visible={visible}
            title={'当前流水线负责人被删除，请更换流水线负责人'}
            width={700}
            onCancel={onCancel}
            footer={<Button onClick={onOk} title={"确定"} type={"primary"}/>}
        >
            <SearchInput
                placeholder={"搜索姓名"}
                onPressEnter={changFindUser}
                style={{width:200}}
            />
            <div className='change-root-user-table'>
                <Table
                    rowKey={record=> record.id}
                    rowSelection={{
                        type: 'radio',
                        onChange: (selectedRowKeys, selectedRows) => {
                            setSelectUser(selectedRowKeys)
                        },
                        selectedRowKeys:selectUser,
                    }}
                    onRow={record => ({
                        onClick: () => setSelectUser([record.id])
                    })}
                    columns={columns}
                    dataSource={user?.dataList || []}
                    pagination={false}
                    locale={{emptyText: <ListEmpty/>}}
                />
                <Page
                    currentPage={user?.currentPage}
                    changPage={changUserPage}
                    page={user}
                />
            </div>
        </Modals>
    )
}

export default ChangeRootUser;
