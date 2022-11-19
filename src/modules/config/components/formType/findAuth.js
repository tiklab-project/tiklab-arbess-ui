import React,{useState} from "react";
import {inject,observer} from "mobx-react";
import {Form,Select,Divider} from "antd";
import SuffixStatus from "./suffixStatus";
import ServerBtn from "../../../resources/server/components/serverBtn";
import AuthBtn from "../../../resources/auth/components/authBtn";
import HostBtn from "../../../resources/host/component/hostBtn";

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
    const [isLoading,setIsLoading] = useState(1)


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
        setIsLoading(2)
        setAuthId(e.key)
        const params = {
            taskType:type,
            pipeline:{pipelineId},
            values:{authId:e.key},
            message:"update"
        }
        updateConfigure(params).then(res=>{
            if(res.code===0){
                setIsLoading(3)
            }else {
                setIsLoading(4)
            }
            setTimeout(()=>setIsLoading(1),1000)
        })
    }

    // 失去交代
    const onBlur = () => {
        setBordered(false)
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

    return(
        <div className="formView-inputs">
            <Form.Item
                name={name(type)}
                label={label(type)}
            >
                <Select
                    showSearch
                    onChange={(value,e)=>changeGitSelect(value,e)}
                    placeholder={label(type)}
                    open={open}
                    onFocus={()=>onFocus(type)}
                    onBlur={onBlur}
                    onDropdownVisibleChange={(visible)=>setOpen(visible)}
                    dropdownRender={menu=> (
                        <>
                            {menu}
                            <Divider style={{margin:"4px 0"}} />
                            <div
                                style={{padding:"4px 8px",cursor:"pointer"}}
                                onClick={() => {
                                    setOpen(false)
                                }}
                            >
                                {renderBtn(type)}
                            </div>
                        </>
                    )}
                    bordered={bordered}
                >
                    {
                        list && list.map(item=>{
                            return <Select.Option value={item.name} key={setKey(item)}>
                                {item.name}
                                {}
                            </Select.Option>
                        })
                    }
                </Select>
            </Form.Item>
            <div className="formView-inputs-suffix">
                <SuffixStatus isLoading={isLoading}/>
            </div>
        </div>
    )
}

export default inject("pipelineStore","configStore","authStore"
    ,"configDataStore","serverStore","hostStore")(observer(FindAuth))