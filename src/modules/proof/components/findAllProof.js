import React,{useState} from "react";
import {getUser} from "tiklab-core-ui";
import {inject,observer} from "mobx-react";
import {Form,Select,Divider} from "antd";
import AddProofButton from "./addProofButton";

const {Option} = Select

const FindAllProof = props =>{

    const {proofStore,type,pipelineStore,configDataStore}=props

    const {findPipelineProof,proofList} = proofStore
    const {pipelineId} = pipelineStore
    const {setGitProofId,setDeployProofId} = configDataStore

    const [open, setOpen] = useState(false)

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
    }


    const style1 = {
        width:420
    }

    const style2 = {
        width:373
    }

    return(
        <Form.Item
            label="凭证"
            name={type < 6 ? "gitProofName" : "deployProofName"}
            rules={type === 2 || type === 3 ? [{required:true, message:"请选择凭证"}] : null}
        >
            <Select
                    style={type === 2 || type === 3 ? style2:style1}
                    onClick={clickFindAllGit}
                    onChange={(value,e)=>changeGitSelect(value,e)}
                    placeholder="请选择凭证"
                    open={open}
                    onDropdownVisibleChange={(visible) => setOpen(visible)}
                    dropdownRender={menu=> (
                        <>
                            {menu}
                            {selectDropdownRender(menu,type)}
                        </>
                    )}
                    bordered={false}
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
    )
}

export default inject("proofStore","pipelineStore","configDataStore")(observer(FindAllProof))