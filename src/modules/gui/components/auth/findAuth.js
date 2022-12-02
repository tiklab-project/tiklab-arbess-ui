import React,{useState,useContext} from "react";
import {observer} from "mobx-react";
import {Form,Select,Divider} from "antd";
import AuthBtn from "./authBtn";
import authStore from "../../store/auth";
import TestContext from "../common/testContext";
import EmptyText from "../../../common/emptyText/emptyText";
import {x} from "../common/delData";

const FindAuth = props =>{

    const {dataItem}=props

    const context = useContext(TestContext)

    const {formInitialValues} = context.configDataStore
    const valueChange = context.valueChange

    const {findAllAuth,findAllAuthServerList,findAllAuthHostList} = authStore

    const [list,setList] = useState([])
    const [open,setOpen] = useState(false)
    const [bordered,setBordered] = useState(false)

     // 存储authId
     const setAuthId = value =>{
        return formInitialValues[dataItem.configId+"_authId"] = value
    }

    // 获取存储authId
    const isId = () =>{
        return formInitialValues[dataItem.configId+"_authId"]
    }

    // 改变凭证
    const changeGitSelect = value =>{
        x(value,isId()) && valueChange(value,"authId",type)
        setAuthId(value)
        setBordered(false)
    }

    // 获取焦点，获取下拉内容
    const onFocus = () => {
        setBordered(true)
        switch (dataItem.type) {
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

    // 失去焦点
    const onBlur = () => {
        setBordered(false)
    }

    const getList = res =>{
        if(res.code===0 && res.data){
            setList(res.data)
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

    const selectValue = item =>{
        switch (type) {
            case 1:
            case 4:
            case 5:
                return item.name+"("+(item.authType === 1?item.username:"私钥")+")"
            case 2:
            case 3:
                return item.name+"("+item.message+")"
            case 41:
            case 51:
                return item.name+"("+item.username+")"
            case 31:
            case 32:
            case 52:
                return item.name+"("+item.ip+")"
        }
    }

    return(
        <Form.Item label={label(type)} name={dataItem.configId+"_auth"}>
            <Select
                showSearch
                placeholder={bordered ? label(type):"未选择"}
                onChange={changeGitSelect}
                onFocus={onFocus}
                onBlur={onBlur}
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
                        <div
                            style={{cursor:"pointer"}}
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
                    list && list.map((item,index)=>{
                        return <Select.Option value={setKey(item)}  key={index}>
                            {selectValue(item)}
                        </Select.Option>
                    })
                }
            </Select>
        </Form.Item>
    )
}

export default observer(FindAuth)