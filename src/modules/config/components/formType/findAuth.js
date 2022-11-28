import React,{useState} from "react";
import {inject,observer} from "mobx-react";
import {Form,Select,Divider} from "antd";
import ServerBtn from "../../../resources/server/components/serverBtn";
import AuthBtn from "../../../resources/auth/components/authBtn";
import HostBtn from "../../../resources/host/component/hostBtn";
import EmptyText from "../../../common/emptyText/emptyText";
import {x} from "../common/delData";

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
    const [showArrow,setShowArrow] = useState(false)

    // 存储authId
    const setAuthId = value =>{
        const zz = Math.floor(type/10)
        switch (zz) {
            case 0:
                return formInitialValues.gitAuthId = value
            case 3:
                return formInitialValues.deployAuthId = value
            case 4:
                return formInitialValues.scanAuthId = value
            case 5:
                return formInitialValues.goodsAuthId = value
        }
    }

    // 获取存储authId
    const isId = type =>{
        const zz = Math.floor(type/10)
        switch (zz) {
            case 0:
                return formInitialValues.gitAuthId
            case 3:
                return formInitialValues.deployAuthId
            case 4:
                return formInitialValues.scanAuthId
            case 5:
                return formInitialValues.goodsAuthId
        }
    }

    // 改变凭证
    const changeGitSelect = value =>{
        const params = {
            taskType:type,
            pipeline:{pipelineId},
            values:{authId:value},
            message:"update"
        }
        x(value,isId(type)) && updateConfigure(params).then(res=>{
            res.code===0 && setAuthId(value)
        })
        setBordered(false)
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
    const onFocus = () => {
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
        <Form.Item label={label(type)} name={name(type)}>
            <Select
                showSearch={bordered}
                placeholder={bordered ? label(type):"未选择"}
                bordered={bordered}
                showArrow={showArrow}
                onMouseEnter={()=>setShowArrow(true)}
                onMouseLeave={()=>setShowArrow(false)}
                onFocus={onFocus}
                onBlur={onBlur}
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
                {list && list.map((item,index)=>{
                    return <Select.Option value={setKey(item)} key={index}>{selectValue(item)}</Select.Option>
                })}
            </Select>
        </Form.Item>
    )
}

export default inject("pipelineStore","configStore","authStore"
    ,"configDataStore","serverStore","hostStore")(observer(FindAuth))