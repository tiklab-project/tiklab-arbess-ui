import React, {Fragment,useState} from "react";
import {Button, Form, Input, Row, Select} from "antd";
import SourceCode_GitModal from "../../config/common/component/sourceCode_GitModal";

const {Option} = Select

const PracticeRight_code_git = props =>{

    const [visible,setVisible]=useState(false)

    return(
        <Fragment>
            <Form.Item
                name='gitCodeName'
                label="git地址"
                rules={[
                    {
                        pattern: /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/,
                        message:'请输入正确的git地址'
                    }
                ]}
            >
                <Input  />
            </Form.Item>
            <Form.Item
                name="gitBranch"
                label="分支"
            >
                <Input  style={{ width: 300 }} placeholder="请输入分支，默认是master"/>
            </Form.Item>
            <Row>
                <Form.Item name='gitProofName'>
                    <Select
                        style={{ width: 300 }}
                    >
                        <Option>
                            无
                        </Option>
                    </Select>
                </Form.Item>
                &nbsp; &nbsp;
                <Button onClick={()=> setVisible(true)}>
                    添加
                </Button>
            </Row>

            <SourceCode_GitModal
                visible={visible}
                setVisible={setVisible}
            />
        </Fragment>
    )
}

export default PracticeRight_code_git