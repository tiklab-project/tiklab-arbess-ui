import React,{useState,useEffect} from "react";
import {inject,observer} from "mobx-react";
import {Form,Select,Divider} from "antd";
import ServerAddBtn from "../../../setting/authServer/components/ServerAddBtn";
import AuthAddBtn from "../../../setting/auth/components/AuthAddBtn";
import HostAddBtn from "../../../setting/authHost/component/HostAddBtn";
import EmptyText from "../../../common/emptyText/EmptyText";

const FindAuth = props =>{

    const {pipelineStore,configStore,authStore,serverStore,hostStore}=props

    const {findAllAuth,authFresh} = authStore
    const {findAllAuthServerList,serverFresh} = serverStore
    const {findAllAuthHostList,hostFresh} = hostStore
    const {pipeline} = pipelineStore
    const {updateTaskConfig,dataItem} = configStore

    const [list,setList] = useState([])
    const [open,setOpen] = useState(false)
    const [bordered,setBordered] = useState(false)
    const [showArrow,setShowArrow] = useState(false)

    useEffect(()=>{
        dataItem.type && initList(dataItem.type)
    },[dataItem.type,authFresh,serverFresh,hostFresh])

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

    // 改变凭证
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

    const setItem = value => {
        list && list.map(item=>{
            if(setKey(item)===value){
                Object.assign(dataItem,{auth:item})
                return
            }
            return null
        })
    }

    const getList = res =>{
        if(res.code===0 && res.data){
            setList(res.data)
        }
    }

    // 获取焦点，获取下拉内容
    const onFocus = () => {
        setBordered(true)
    }

    //认证标题
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

    // 下拉框 id
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

    // 下拉框添加
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

    const selectValue = item =>{
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
                onFocus={onFocus}
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
                    return <Select.Option value={setKey(item)} key={index}>{selectValue(item)}</Select.Option>
                })}
            </Select>
        </Form.Item>
    )
}

export default inject("pipelineStore","configStore","authStore"
    ,"serverStore","hostStore")(observer(FindAuth))
