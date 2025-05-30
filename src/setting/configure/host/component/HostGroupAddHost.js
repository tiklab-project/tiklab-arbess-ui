/**
 * @Description: 主机组添加编辑主机组件
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useEffect,useState} from "react";
import {Dropdown, Table} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import hostStore from "../store/HostStore";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import Button from "../../../../common/component/button/Button";
import Page from "../../../../common/component/page/Page";
import SearchInput from "../../../../common/component/search/SearchInput";

const HostGroupAddHost = (props) => {

    const {addHost,setAddHost} = props

    const {findAuthHostPage} = hostStore;

    //主机列表
    const [hostList,setHostList] = useState([]);
    //选中的主机
    const [yHostList,setYHostList] = useState([]);
    //选中的主机id
    const [selectedRowKeys,setSelectedRowKeys] = useState([]);
    //消息通知人员下拉框
    const [hostAddVisible,setHostAddVisible] = useState(false);
    const pageParam = {
        pageSize:5,
        currentPage:1
    };
    //获取主机请求数据
    const [hostParams,setHostParams] = useState({pageParam});
    //主机数据
    const [hostPage,setHostPage] = useState({totalPage:1,totalRecord:1});

    useEffect(()=>{
        // 获取主机
        findHost()
    },[hostParams])

    /**
     * 获取主机
     */
    const findHost = () =>{
        findAuthHostPage(hostParams).then(res=>{
            if(res.code===0){
                setHostList(res.data?.dataList || [])
                setHostPage({
                    currentPage: res.data.currentPage,
                    totalPage: res.data.totalPage,
                    totalRecord: res.data.totalRecord
                })
            }
        })
    }

    /**
     * 换页
     * @param page
     */
    const changUserPage = page => {
        setHostParams({
            ...hostParams,
            pageParam:{
                pageSize:5,
                currentPage:page
            }
        })
    }

    /**
     * 模糊·查询
     */
    const changFindHost = e => {
        setHostParams({
            pageParam,
            name:e.target.value,
        })
    }

    /**
     * 已选中的用户不可添加
     * @param record
     * @returns {*}
     */
    const disabledOpt = record =>{
        return addHost && addHost.some(item=>item.hostId===record.hostId)
    }

    /**
     * 手动选择/取消选择某行的回调
     * @param record
     */
    const onSelect = record => {
        onSelectRow(record)
    }

    /**
     * 点击行选中或取消
     * @param record
     */
    const onSelectRow = record => {
        if(!disabledOpt(record)){
            if (selectedRowKeys.indexOf(record.hostId) >= 0) {
                // 取消选中
                setYHostList(yHostList.filter(item=>item.hostId!==record.hostId))
                selectedRowKeys.splice(selectedRowKeys.indexOf(record.hostId), 1)
            } else {
                // 选中
                yHostList.push(record)
                selectedRowKeys.push(record.hostId)
            }
            setSelectedRowKeys([...selectedRowKeys])
        }
    }

    /**
     * 手动选择/取消选择所有行的回调
     * @param selected
     * @param selectedRows
     * @param changeRows
     */
    const onSelectAll = (selected,selectedRows,changeRows) => {
        const newArr = changeRows.map(item=>item && item.hostId).filter(Boolean)
        const newHost = changeRows.map(item=>({...item})).filter(Boolean)
        let row,host
        if(selected){
            row = Array.from(new Set([...selectedRowKeys,...newArr]))
            host = Array.from(new Set([...yHostList,...newHost]))
        } else {
            row = selectedRowKeys.filter(item=>!newArr.includes(item))
            host = yHostList.filter(item=>!newArr.includes(item.hostId))
        }
        setSelectedRowKeys(row)
        setYHostList(host)
    }

    /**
     * 表格可选择配置
     */
    const rowSelection = {
        onSelectAll:onSelectAll,
        onSelect:onSelect,
        // 禁止选择
        getCheckboxProps: (record) => ({
            disabled: disabledOpt(record),
        }),
        selectedRowKeys:selectedRowKeys,
    }

    const onOk = () => {
        setAddHost(addHost.concat(yHostList));
        setHostAddVisible(false);
        setYHostList([]);
        setSelectedRowKeys([]);
    }

    const removeHost = record => {
        setAddHost(addHost.filter(item=>item.hostId!==record.hostId))
    }

    const hostAddMenu = (
        <div className='host-group-add-drop'>
            <SearchInput
                placeholder={"搜索名称，IP地址"}
                onPressEnter={changFindHost}
            />
            <div className='host-group-host-table'>
                <Table
                    rowKey={(record) => record.hostId}
                    rowSelection={rowSelection}
                    onRow={record => ({
                        onClick: () => onSelectRow(record)
                    })}
                    columns={[
                        {
                            title:"名称",
                            dataIndex:"name",
                            key:"name",
                            width:100,
                            ellipsis:true,
                        },
                        {
                            title:"IP地址",
                            dataIndex:"ip",
                            key:"ip",
                            width:140,
                            ellipsis:true,
                        },
                    ]}
                    dataSource={hostList}
                    pagination={false}
                    locale={{emptyText: <ListEmpty/>}}
                />
                <Page
                    currentPage={hostParams.pageParam.currentPage}
                    changPage={changUserPage}
                    page={hostPage}
                />
            </div>
            <div className='host-group-host-add-btn'>
                <Button onClick={()=>setHostAddVisible(false)} title={"取消"} isMar={true}/>
                <Button onClick={onOk} title={"确定"} type={"primary"}/>
            </div>
        </div>
    )

    return (
        <div className="host-group-host-add">
            <div className="host-group-add-title" style={{rowGap:'0'}}>
                <div className='host-group-add-title-label'>
                    主机
                </div>
                <Dropdown
                    overlay={hostAddMenu}
                    placement={"bottomRight"}
                    visible={hostAddVisible}
                    trigger={['click']}
                    onVisibleChange={visible => setHostAddVisible(visible)}
                    getPopupContainer={e=>e.parentElement}
                    overlayStyle={{width:300}}
                >
                    <Button type={"link-nopadding"} title={"添加主机"}/>
                </Dropdown>
            </div>
            <div>
                <Table
                    rowKey={(record) => record.hostId}
                    columns={[
                        {
                            title:"名称",
                            dataIndex:"name",
                            key:"name",
                            width:"60%",
                            ellipsis:true,
                        },
                        {
                            title:"IP地址",
                            dataIndex: "ip",
                            key: "ip",
                            width:"30%",
                            ellipsis:true,
                        },
                        {
                            title:"操作",
                            dataIndex:"action",
                            key:"action",
                            width:"10%",
                            ellipsis:true,
                            render:(_,record)=>(
                                <DeleteOutlined onClick={()=>removeHost(record)}/>
                            )
                        }
                    ]}
                    dataSource={addHost}
                    pagination={false}
                    locale={{emptyText: <ListEmpty/>}}
                />
            </div>
        </div>
    )
}

export default HostGroupAddHost
