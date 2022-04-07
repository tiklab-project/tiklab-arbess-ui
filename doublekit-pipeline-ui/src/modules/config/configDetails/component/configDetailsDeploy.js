import React from "react";
import { Form, Space, Radio} from "antd";
import {withRouter} from "react-router-dom";
import ConfigDetailsDeploy_docker from "./configDetailsDeploy_docker";
import ConfigDetailsDeploy_linux from "./configDetailsDeploy_linux";

const ConfigDetailsDeploy = props =>{

    const {deployRadio,setDeployRadio} = props

    const handlerRadio = e =>{
        setDeployRadio(e.target.value)
    }

    return(
        <div className='anchor-content' id='d'>
            <h2>部署</h2>
            <Form.Item name='deployType'>
                <Radio.Group  onChange={handlerRadio} value={deployRadio}>
                    <Space>
                        <Radio value={0}>无</Radio>
                        <Radio value={2} >linux</Radio>
                        <Radio value={3} >docker</Radio>
                    </Space>
                </Radio.Group>
            </Form.Item>
            {
                deployRadio===2 ?
                    <ConfigDetailsDeploy_linux/>
                    :null
            }
            {
                deployRadio===3 ?
                    <ConfigDetailsDeploy_docker/>
                    :null
            }
        </div>
    )
}

export default withRouter(ConfigDetailsDeploy)