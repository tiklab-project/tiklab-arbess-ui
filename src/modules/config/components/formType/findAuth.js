import React,{useState} from "react";
import {inject,observer} from "mobx-react";
import {Form,Select,Divider} from "antd";
import SuffixStatus from "./suffixStatus";
import ServerBtn from "../../../resources/server/components/serverBtn";
import AuthBtn from "../../../resources/auth/components/authBtn";

const FindAuth = props =>{

    const {type,pipelineStore,configStore,authStore,configDataStore,serverStore}=props

    const {findAllAuth} = authStore
    const {findAllAuthServerList} = serverStore
    const {pipelineId} = pipelineStore
    const {updateConfigure} = configStore
    const {formInitialValues} = configDataStore

    const [list,setList] = useState([])
    const [open,setOpen] = useState(false)
    const [bordered,setBordered] = useState(false)
    const [isLoading,setIsLoading] = useState(1)

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

        }
    }

    // 下拉框自定义内容
    const selectDropdownRender = (menu,type) => {
        return <div
                    style={{padding:"4px 8px",cursor:"pointer"}}
                    onClick={() => {
                        setOpen(false)
                    }}
                >
                    {renderBtn(type)}
                </div>
    }

    // 存储authId
    const setAuthId = key =>{
        if(type>0 && type<10){
            formInitialValues.gitAuthId = key
        }else if(type>30 && type<40){
            formInitialValues.deployAuthId = key
        }else if(type>40 && type<50){
            formInitialValues.scanAuthId = key
        }else if(type>50 && type<60){
            formInitialValues.goodsAuthId = key
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

    // 获取下拉内容
    const onFocus = type => {
        setBordered(true)
        switch (type) {
            case 1:
            case 4:
            case 5:
                findAllAuth().then(res=>{getList(res)})
                break
            case 3:
            case 2:
            case 41:
            case 51:
                findAllAuthServerList(type).then(res=>{getList(res)})
        }
    }

    const getList = res =>{
        if(res.code===0 && res.data){
            setList(res.data)
        }
    }
    
    const onBlur = () => {
        setBordered(false)
    }

    // 区分字段
    const name = type => {
        if(type>0 && type<10){
            return "gitAuthName"
        }else if(type>30 && type<40){
            return "deployAuthName"
        }else if(type>40 && type<50){
            return "scanAuthName"
        }else if(type>50 && type<60){
            return "goodsAuthName"
        }
    }

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
        }
    }

    const style1 = {
        width:400
    }

    return(
        <div className="formView-inputs">
            <Form.Item
                label="凭证"
                name={name(type)}
            >
                <Select
                    style={type === 2 || type === 3 ? null:style1}
                    onChange={(value,e)=>changeGitSelect(value,e)}
                    placeholder="凭证"
                    open={open}
                    onFocus={()=>onFocus(type)}
                    onBlur={onBlur}
                    onDropdownVisibleChange={(visible)=>setOpen(visible)}
                    dropdownRender={menu=> (
                        <>
                            {menu}
                            <Divider style={{margin:"4px 0"}} />
                            {selectDropdownRender(menu,type)}
                        </>
                    )}
                    bordered={bordered}
                >
                    {
                        list && list.map(item=>{
                            return <Select.Option value={item.name} key={setKey(item)}>
                                {item.name}
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
    ,"configDataStore","serverStore")(observer(FindAuth))