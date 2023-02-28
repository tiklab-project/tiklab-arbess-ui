import React,{useState,useEffect} from "react";
import {inject,observer} from "mobx-react";
import {Form,Select,Divider} from "antd";
import ServerAddBtn from "../../../setting/authServer/components/ServerAddBtn";
import AuthAddBtn from "../../../setting/auth/components/AuthAddBtn";
import HostAddBtn from "../../../setting/authHost/component/HostAddBtn";
import EmptyText from "../../../common/emptyText/EmptyText";

/**
 * form下拉框
 * 认证，授权，凭证……
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const FindAuth = props =>{

    const {pipelineStore,configStore,authStore,serverStore,hostStore}=props

    const {findAllAuth,authFresh} = authStore
    const {findAllAuthServerList,serverFresh} = serverStore
    const {findAllAuthHostList,hostFresh} = hostStore
    const {pipeline} = pipelineStore
    const {updateTaskConfig,dataItem} = configStore

    const [list,setList] = useState([])  //下拉框列表
    const [open,setOpen] = useState(false)  //下拉框visible
    const [bordered,setBordered] = useState(false) //下拉框边框
    const [showArrow,setShowArrow] = useState(false)  //

    useEffect(()=>{
        // 初始化下拉框list
        dataItem.type && initList(dataItem.type)
    },[dataItem.type,authFresh,serverFresh,hostFresh])

    /**
     * 获取下拉框list
     * @param dataItemType
     */
    const initList = dataItemType =>{
        switch (dataItemType) {
            case 1:
            case 4:
            case 5:
                findAllAuth().then(res=>{getList(res)})
                break
            case 2:
            case 3:
            case 41:
            case 51:
                findAllAuthServerList(dataItem.type).then(res=>{getList(res)})
                break
            case 31:
            case 32:
            case 52:
                findAllAuthHostList(0).then(res=>{getList(res)})
        }
    }

    /**
     * 设置下拉框List,setList
     * @param res
     */
    const getList = res =>{
        if(res.code===0 && res.data){
            setList(res.data)
        }
    }

    /**
     * 改变凭证
     * @param value
     */
    const changeGitSelect = value =>{
        const params = {
            pipeline:{id:pipeline.id},
            values:{authId:value},
            taskType:dataItem.type,
            configId: dataItem.configId
        }
        updateTaskConfig(params)
        setItem(value)
        setBordered(false)
    }

    /**
     * dataItem添加对象
     * @param value
     */
    const setItem = value => {
        list && list.map(item=>{
            if(setKey(item)===value){
                Object.assign(dataItem,{auth:item})
                return
            }
            return null
        })
    }

    /**
     * 认证标题
     * @param type
     * @returns {string}
     */
    const label = type => {
        switch (type) {
            case 1:
            case 5:
            case 4:
                return "凭证"
            case 3:
            case 2:
                return "授权信息"
            case 41:
            case 51:
                return "服务地址"
            case 31:
            case 32:
            case 52:
                return "主机地址"
        }
    }

    /**
     * 下拉框 id
     * @param item
     * @returns {id}
     */
    const setKey = item =>{
        switch (dataItem.type) {
            case 1:
            case 4:
            case 5:
                return item.authId
            case 3:
            case 2:
            case 41:
            case 51:
                return item.serverId
            case 31:
            case 32:
            case 52:
                return item.hostId
        }
    }

    /**
     * 下拉框按钮
     * @param type
     * @returns {JSX.Element}
     */
    const renderBtn = type =>{
        switch (type) {
            case 1:
            case 4:
            case 5:
                return <AuthAddBtn isConfig={true}/>
            case 2:
            case 3:
            case 41:
            case 51:
                return <ServerAddBtn isConfig={true} type={type}/>
            case 31:
            case 32:
            case 52:
                return <HostAddBtn isConfig={true} type={type}/>
        }
    }

    /**
     * 下拉框label
     * @param item
     * @returns {string}
     */
    const selectLabel = item =>{
        switch (dataItem.type) {
            case 1:
            case 4:
            case 5:
                return item.name+"("+(item.authType === 1?item.username:"私钥")+")"
            case 2:
            case 3:
                return item.name+"("+(item.authType === 1?item.message:"私钥")+")"
            case 41:
            case 51:
                return item.name+"("+(item.authType === 1?item.username:"私钥")+")"
            case 31:
            case 32:
            case 52:
               return item.name+"("+item.ip+")"
        }
    }

    return(
        <Form.Item label={label(dataItem.type)} name={dataItem.configId+"_authName"}>
            <Select
                // bordered={bordered}
                showSearch={bordered}
                placeholder={bordered ? label(dataItem.type):"未选择"}
                className={`${bordered?'':'input-hover'}`}
                showArrow={showArrow}
                onMouseEnter={()=>setShowArrow(true)}
                onMouseLeave={()=>setShowArrow(false)}
                onFocus={()=>setBordered(true)}
                onBlur={()=>setBordered(false)}
                onChange={changeGitSelect}
                notFoundContent={<EmptyText/>}
                open={open}
                onDropdownVisibleChange={(visible)=>setOpen(visible)}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                dropdownRender={menu=> (
                    <>
                        {menu}
                        <Divider style={{margin:"4px 0"}} />
                        <div style={{cursor:"pointer"}} onClick={()=>setOpen(false)}>
                            {renderBtn(dataItem.type)}
                        </div>
                    </>
                )}
            >
                {list && list.map((item,index)=>{
                    return <Select.Option value={setKey(item)} key={index}>{selectLabel(item)}</Select.Option>
                })}
            </Select>
        </Form.Item>
    )
}

export default inject("pipelineStore","configStore","authStore"
    ,"serverStore","hostStore")(observer(FindAuth))
