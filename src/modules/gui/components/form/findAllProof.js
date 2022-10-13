import React,{useContext,useState} from "react";
import proofStore from "../../store/proofStore";
import TestContext from "../common/testContext";
import {getUser} from "tiklab-core-ui";
import {Form,Select,Divider} from "antd";
import {observer} from "mobx-react";
import AddProofButton from "./addProofButton";

const {Option} = Select

const FindAllProof = props =>{

    const {type,configDataStore}=props

    const context = useContext<Object>(TestContext)
    const {findpipelineProof,pipelineProofList} = proofStore
    const {setGitProofId,setDeployProofId} = configDataStore
    const pipelineId = context.pipelineId

    const [open,setOpen] = useState(false)

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
        findpipelineProof(params)
    }

    const selectDropdownRender = (menu,type) => {
        if(type===2||type===3){
            return null
        }else {
            return <>
                <Divider style={{ margin: '4px 0' }} />
                <div
                    style={{ padding:"4px 8px",cursor: "pointer",textAlign:"right" }}
                    onClick={() => {
                        setOpen(false)
                    }}
                >
                    <AddProofButton type={type}/>
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

    return(
        <Form.Item
            label="凭证"
            name={type+"proofName"}
            rules={type === 2 || type === 3 ? [{required:true, message:"请选择凭证"}] : null}
        >
            <Select style={{ width: 300 }}
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
            >
                {
                    pipelineProofList && pipelineProofList.map(item=>{
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

export default observer(FindAllProof)