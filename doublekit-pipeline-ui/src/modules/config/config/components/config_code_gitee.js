import React, {Fragment, useState} from "react";
import {Button, Form, Row, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import SourceCode_GiteeModal from "../../common/component/SourceCode_GIteeModal";

const {Option} =Select

const Config_code_gitee = props =>{

    const [branch,setBranch]=useState(true)
    const [visible,setVisible]=useState(false)
    const [readOnly,setReadOnly] =useState(false)
    const [proofUsername,setProofUsername] =useState('')

    return(
        <Fragment>
            <Row>
                <Form.Item
                    name='giteeCodeName'
                    label="git地址"
                >
                    <Select
                        style={{ width: 300 }}
                    >
                        <Option >
                            无
                        </Option>
                    </Select>
                </Form.Item>
                <Button className='config-details-link' type="link" onClick={()=>setVisible(true)}>
                    <PlusOutlined />
                    新增代码库
                </Button>
            </Row>
            <Form.Item name="giteeBranch" label="分支">
                <Select
                    style={{ width: 300 }}
                >
                    <Option >
                       无
                    </Option>
                </Select>
            </Form.Item>

            <SourceCode_GiteeModal
                visible={visible}
                setVisible={setVisible}
                proofUsername={proofUsername}
            />
        </Fragment>
    )
}

export default Config_code_gitee