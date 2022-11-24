import React,{useState} from "react";
import {inject,observer} from "mobx-react";
import {Form,Select,Divider} from "antd";
import ServerBtn from "../../../resources/server/components/serverBtn";
import AuthBtn from "../../../resources/auth/components/authBtn";
import HostBtn from "../../../resources/host/component/hostBtn";
import EmptyText from "../../../common/emptyText/emptyText";

const FindAuth = props =>{

    const {type,pipelineStore,configStore,authStore,configDataStore,serverStore,hostStore}=props

    const {findAllAuth} = authStore
    const {findAllAuthServerList} = serverStore
    const {findAllAuthHostList} = hostStore
    const {pipelineId} = pipelineStore
    const {updateConfigure} = configStore
    const {formInitialValues} = configDataStore

    const [list,setList] = useState([])
    const [open,setOpen] = useState(false)
    const [bordered,setBordered] = useState(false)

    // 存储authId
    const setAuthId = key =>{
        const zz = Math.floor(type/10)
        switch (zz) {
            case 0:
                return formInitialValues.gitAuthId = key
            case 3:
                return formInitialValues.deployAuthId = key
            case 4:
                return formInitialValues.scanAuthId = key
            case 5:
                return formInitialValues.goodsAuthId = key
        }
    }

    // 改变凭证
    const changeGitSelect = (value,e) =>{
        setAuthId(e.key)
        const params = {
            taskType:type,
            pipeline:{pipelineId},
            values:{authId:e.key},
            message:"update"
        }
        updateConfigure(params)
    }

    // 失去交代
    const onBlur = () => {
        setBordered(false)
    }

    const getList = res =>{
        if(res.code===0 && res.data){
            setList(res.data)
        }
    }

    // 区分字段
    const name = type => {
        const zz = Math.floor(type/10)
        switch (zz) {
            case 0:
                return "gitAuthName"
            case 3:
                return "deployAuthName"
            case 4:
                return "scanAuthName"
            case 5:
                return "goodsAuthName"
        }
    }

    // 获取焦点，获取下拉内容
    const onFocus = type => {
        setBordered(true)
        switch (type) {
            case 1:
            case 4:
            case 5:
                findAllAuth().then(res=>{getList(res)})
                break
            case 2:
            case 3:
            case 41:
            case 51:
                findAllAuthServerList(type).then(res=>{getList(res)})
                break
            case 31:
            case 32:
            case 52:
                findAllAuthHostList(0).then(res=>{getList(res)})
        }
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
        switch (type) {
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
                return <AuthBtn isConfig={true}/>
            case 2:
            case 3:
            case 41:
            case 51:
                return <ServerBtn isConfig={true} type={type}/>
            case 31:
            case 32:
            case 52:
                return <HostBtn isConfig={true} type={type}/>
        }
    }

    const selectValue = item =>{
        switch (type) {
            case 1:
            case 4:
            case 5:
                return item.name+"("+(item.authType === 1?item.username:"私钥")+")"
            case 2:
            case 3:
            case 41:
            case 51:
                return item.name+"("+item.message+")"
            case 31:
            case 32:
            case 52:
               return item.name+"("+item.ip+")"
        }
    }

    return(
        <Form.Item
            name={name(type)}
            label={label(type)}
        >
            <Select
                showSearch
                placeholder={label(type)}
                open={open}
                bordered={bordered}
                onFocus={()=>onFocus(type)}
                onBlur={onBlur}
                onChange={(value,e)=>changeGitSelect(value,e)}
                notFoundContent={<EmptyText/>}
                onDropdownVisibleChange={(visible)=>setOpen(visible)}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                dropdownRender={menu=> (
                    <>
                        {menu}
                        <Divider style={{margin:"4px 0"}} />
                        <div
                            style={{cursor:"pointer"}}
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            {renderBtn(type)}
                        </div>
                    </>
                )}
            >
                {list && list.map(item=>{
                    return <Select.Option value={setKey(item)} key={setKey(item)}>{selectValue(item)}</Select.Option>
                })}
            </Select>
        </Form.Item>
    )
}

export default inject("pipelineStore","configStore","authStore"
    ,"configDataStore","serverStore","hostStore")(observer(FindAuth))