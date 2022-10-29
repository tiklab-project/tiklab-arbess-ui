import React,{useState} from "react";
import {getUser} from "tiklab-core-ui";
import {inject,observer} from "mobx-react";
import {Form,Select,Divider} from "antd";
import AddProofButton from "../../../proof/components/addProofButton";
import SuffixStatus from "./suffixStatus";

const {Option} = Select

const FindAllProof = props =>{

    const {proofStore,type,pipelineStore,configDataStore,configStore}=props

    const {findPipelineProof,proofList} = proofStore
    const {pipelineId} = pipelineStore
    const {setGitProofId,setDeployProofId} = configDataStore
    const {updateConfigure} = configStore

    const [open,setOpen] = useState(false)
    const [bordered,setBordered] = useState(false)
    const [isLoading,setIsLoading] = useState(1)

    const userId = getUser().userId

    const clickFindAllGit = () =>{
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
            userId:userId
        }
        findPipelineProof(params)
        setIsLoading(2)
    }

    const selectDropdownRender = (menu,type) => {
        if(type===2||type===3){
            return null
        }else {
            return <>
                <Divider style={{ margin: '4px 0' }} />
                <div
                    style={{ padding:"4px 8px",cursor: "pointer"}}
                    onClick={() => {
                        setOpen(false)
                    }}                            >
                    <AddProofButton type={type} isBtn={"none"}/>
                </div>
            </>
        }
    }

    const changeGitSelect = (value,e) =>{
        if(type < 6){
            setGitProofId(e.key)
        }else {
            setDeployProofId(e.key)
        }
        const params = {
            taskType:type,
            pipeline:{pipelineId},
            values:{proof:{proofId:e.key}},
            message:"update"
        }
        updateConfigure(params).then(res=>{
            res.code===0 && setIsLoading(3)
        })
        setTimeout(()=>setIsLoading(1),1000)
    }

    const onFocus = () => {
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

    return(
        <div className="formView-inputs">
            <Form.Item
                label="凭证"
                name={type < 6 ? "gitProofName" : "deployProofName"}
            >
                <Select
                    style={type === 2 || type === 3 ? style2:style1}
                    onClick={clickFindAllGit}
                    onChange={(value,e)=>changeGitSelect(value,e)}
                    placeholder="请选择凭证"
                    open={open}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onDropdownVisibleChange={(visible) => setOpen(visible)}
                    dropdownRender={menu=> (
                        <>
                            {menu}
                            {selectDropdownRender(menu,type)}
                        </>
                    )}
                    bordered={bordered}
                >
                    {
                        proofList && proofList.map(item=>{
                            return(
                                <Option key={item.proofId} value={item.proofName+ "(" + item.proofType + ")"}>
                                    { item.proofName+ "(" + item.proofType + ")"}
                                </Option>
                            )
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

export default inject("proofStore","pipelineStore","configDataStore","configStore")(observer(FindAllProof))