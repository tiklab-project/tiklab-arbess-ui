import React,{useState} from "react";
import {inject,observer} from "mobx-react";
import {Form,Select,Divider} from "antd";
import IdentifyAddBtn from "../../../system/identify/componets/identifyAddBtn";
import AddProofButton from "../../../proof/components/addProofButton";
import SuffixStatus from "./suffixStatus";

const {Option} = Select

const FindAllProof = props =>{

    const {proofStore,type,pipelineStore,configStore,identifyStore,configDataStore}=props

    const {findPipelineProof,proofList} = proofStore
    const {pipelineId} = pipelineStore
    const {updateConfigure} = configStore
    const {findAllAuth} = identifyStore
    const {formInitialValues} = configDataStore

    const [scanProofList,setScanProofList] = useState(false)
    const [open,setOpen] = useState(false)
    const [bordered,setBordered] = useState(false)
    const [isLoading,setIsLoading] = useState(1)

    const selectDropdownRender = (menu,type) => {
        if( type===2 || type===3 ){
            return null
        }else {
            return <div
                        style={{padding:"4px 8px",cursor:"pointer"}}
                        onClick={() => {
                            setOpen(false)
                        }}
                    >
                {
                    type===41 ?
                        <IdentifyAddBtn isBtn={"none"}/>
                        :
                        <AddProofButton type={type} isBtn={"none"}/>
                }
            </div>
        }
    }


    const setProofId = key =>{
        if(type>0 && type<10){
            formInitialValues.gitProofId = key
        }else if(type>30 && type<40){
            formInitialValues.deployProofId = key
        }else {
            formInitialValues.scanProofId = key
        }
    }

    const changeGitSelect = (value,e) =>{
        setProofId(e.key)
        const params = {
            taskType:type,
            pipeline:{pipelineId},
            values:{proof:{proofId:e.key}},
            message:"update"
        }
        if(type===41) {
            params.values={PipelineAuth:{authId:e.key}}
        }
        updateConfigure(params).then(res=>{
            res.code===0 && setIsLoading(3)
        })
        setTimeout(()=>setIsLoading(1),1000)
    }

    const onFocus = () => {
        if(type===41){
            findAllAuth().then(res=>{
                if(res.code===0){
                    setScanProofList(res.data)
                }
            })
        }else {
            let proofScope
            if(type === 2 || type === 3 ){
                proofScope = type
            }else if(type > 6){
                proofScope = 5
            }else {
                proofScope = 1
            }
            const params ={
                pipelineId:pipelineId,
                type:proofScope,
            }
            findPipelineProof(params)
        }
        setIsLoading(2)
        setBordered(true)
    }
    
    const onBlur = () => {
        setIsLoading(1)
        setBordered(false)
    }

    const style1 = {
        width:420
    }

    const style2 = {
        width:373
    }

    const name = type => {
        if(type>0 && type<10){
            return "gitProofName"
        }else if(type>30 && type<40){
            return "deployProofName"
        }else {
            return "scanProofName"
        }
    }

    const renderList = type => {
        switch (type) {
            case 41:return scanProofList && scanProofList.map(item=>{
                return(
                    <Option key={item.authId} value={item.name}>
                        {item.name}
                    </Option>
                )
            })
            default:
                return proofList && proofList.map(item=>{
                    return(
                        <Option key={item.proofId} value={item.proofName+ "(" + item.proofType + ")"}>
                            { item.proofName+ "(" + item.proofType + ")"}
                        </Option>
                    )
                })
        }
    }

    return(
        <div className="formView-inputs">
            <Form.Item
                label="凭证"
                name={name(type)}
            >
                <Select
                    style={type === 2 || type === 3 ? style2:style1}
                    onChange={(value,e)=>changeGitSelect(value,e)}
                    placeholder="请选择凭证"
                    open={open}
                    onFocus={onFocus}
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
                    { renderList(type) }
                </Select>
            </Form.Item>
            <div className="formView-inputs-suffix">
                <SuffixStatus isLoading={isLoading}/>
            </div>
        </div>
    )
}

export default inject("proofStore","pipelineStore","configStore","identifyStore","configDataStore")(observer(FindAllProof))