import React ,{useState} from "react";
import {Form,  Radio, Space} from "antd";
// import ConfigDeploy_docker from "./configDeploy_docker";
// import ConfigDeploy_linux from "./configDeploy_linux";
import DeployAddModal from "../../common/component/deployAddModal";

const ConfigDeploy = props =>{

    const {
        createProof,findOneDeployProof,findAllDeployProof,allDeployProofList
    }=props

    const [visible,setVisible]=useState(false)
    const [deployRadio,setDeployRadio]=useState(0)
    const handlerRadio = e =>{
        setDeployRadio(e.target.value)
    }

    return(
        <div className='anchor-content' id='d'>
            <h1>部署</h1>
            <Form.Item name='deployType'>
                <Radio.Group  onChange={handlerRadio} value={deployRadio}>
                    <Space>
                        <Radio value={0}>无</Radio>
                        <Radio value={2} >linux</Radio>
                        <Radio value={3} >docker</Radio>
                    </Space>
                </Radio.Group>
            </Form.Item>
            {/*{*/}
            {/*    deployRadio===2 ?*/}
            {/*        // <ConfigDeploy_linux*/}
            {/*        //     findOneDeployProof={findOneDeployProof}*/}
            {/*        //     findAllDeployProof={findAllDeployProof}*/}
            {/*        //     allDeployProofList={allDeployProofList}*/}
            {/*        //     setVisible={setVisible}*/}
            {/*        // />*/}
            {/*        :null*/}
            {/*}*/}
            {/*{*/}
            {/*    deployRadio===3 ?*/}
            {/*        // <ConfigDeploy_docker*/}
            {/*        //     setVisible={setVisible}*/}
            {/*        //     findOneDeployProof={findOneDeployProof}*/}
            {/*        //     findAllDeployProof={findAllDeployProof}*/}
            {/*        //     allDeployProofList={allDeployProofList}*/}
            {/*        // />*/}
            {/*        :null*/}
            {/*}*/}
            <DeployAddModal
                visible={visible}
                setVisible={setVisible}
                createProof={createProof}
            />
        </div>
    )
}

export default ConfigDeploy