import React,{useState,useContext} from "react";
import {observer} from "mobx-react";
import {Form,Select,Divider} from "antd";
import SuffixStatus from "../forms/suffixStatus";
import AuthBtn from "./authBtn";
import authStore from "../../store/auth";
import TestContext from "../common/testContext";

const FindAuth = props =>{

    const {type}=props

    const context = useContext(TestContext)

    const {formInitialValues} = context.configDataStore
    const valueChange = context.valueChange

    const {findAllAuth,findAllAuthServerList,findAllAuthHostList} = authStore

    const [list,setList] = useState([])
    const [open,setOpen] = useState(false)
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
        setAuthId(e.key)
        valueChange(e.key,"authId",type,setIsLoading)
    }

    // 获取焦点，获取下拉内容
    const onFocus = type => {
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

    return(
        <div className="formView-inputs">
            <Form.Item
                label="凭证"
                name={name(type)}
            >
                <Select
                    onChange={(value,e)=>changeGitSelect(value,e)}
                    placeholder="凭证"
                    open={open}
                    onFocus={()=>onFocus(type)}
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
                                <AuthBtn type={type}/>
                            </div>
                        </>
                    )}
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

export default observer(FindAuth)