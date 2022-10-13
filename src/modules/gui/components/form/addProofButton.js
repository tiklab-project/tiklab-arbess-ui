import React,{Fragment,useState,useContext} from "react";
import "./addProofModal"
import AddProofModal from "./addProofModal";
import {observer} from "mobx-react";
import {Button} from "antd";
import {getUser} from "tiklab-core-ui";
import proofStore from "../../store/proofStore";
import TestContext from "../common/testContext";

const AddProofButton = props =>{

    const {type} = props

    const context = useContext(TestContext)
    const {createProof} = proofStore
    const [visible,setVisible] = useState(false)
    const userId = getUser().userId

    const addProofVisible = () => {
        setVisible(true)
    }

    return (
        <Fragment>
            <div className="config-details-link">
                <Button onClick={()=>addProofVisible()}>
                    添加
                </Button>
            </div>
            <AddProofModal
                createProof={createProof}
                visible={visible}
                setVisible={setVisible}
                userId={userId}
                type={type}
                context={context}
            />
        </Fragment>
    )

}

export default observer(AddProofButton)