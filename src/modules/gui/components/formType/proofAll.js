import React,{useState,useContext} from "react";
import {getUser} from "tiklab-core-ui";
import {observer} from "mobx-react";
import {Form,Select,Divider} from "antd";
import TestContext from "../common/testContext";
import proofStore from "../../store/proofStore";
import {PlusOutlined} from "@ant-design/icons";
import ProofAddModal from "./proofAddModal";
import SuffixStatus from "./suffixStatus";

const {Option} = Select

const ProofAll = props =>{

    const {type}=props

    const context = useContext(TestContext)

    const {createProof,findPipelineProof,pipelineProofList} = proofStore
    const {pipelineId} = context.pipelineStore
    const valueChange = context.valueChange
    const userId = getUser().userId

    const [visible,setVisible] = useState(false)
    const [open, setOpen] = useState(false)
    const [isLoading,setIsLoading] = useState(1)

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
        if(type === 2||type===3){
            return null
        }else {
            return <>
                <Divider style={{ margin: '4px 0' }} />
                <div
                    style={{ padding:"4px 8px",cursor: "pointer"}}
                    onClick={() => {
                        setOpen(false)
                    }}
                >
                    <div onClick={()=>setVisible(true)}>
                        <PlusOutlined />&nbsp;&nbsp;添加
                    </div>
                    <ProofAddModal
                        createProof={createProof}
                        visible={visible}
                        setVisible={setVisible}
                        userId={userId}
                        type={type}
                        context={context}
                    />
                </div>
            </>
        }
    }

    const changeGitSelect = (value,e) =>{
        valueChange(e.key,"proofId",type,setIsLoading)
    }

    const onBlur = () => {
        setIsLoading(1)
    }

    const style1 = {
        width:300
    }

    const style2 = {
        width:270
    }

    return(
        <div className="guiView-inputs">
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
                    onBlur={onBlur}
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
            <div className="guiView-inputs-suffix">
                {<SuffixStatus isLoading={isLoading}/>}
            </div>
        </div>
    )
}

export default observer(ProofAll)