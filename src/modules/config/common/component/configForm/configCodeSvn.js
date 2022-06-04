import React,{Fragment} from "react";
import {Button, Form, Input, Row, Select} from "antd";

const ConfigCodeSvn = props =>{

    return(
        <Fragment>
            <Form.Item
                name='codeName'
                label="svn地址"
                rules={[
                    {
                        required:true,
                        message:'请输入git地址'
                    },
                    {
                        pattern: /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/,
                        message:'请输入正确的git地址'
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Row>
                <Form.Item name='gitProofName' label="凭证">
                    <Select
                        style={{ width: 300 }}
                    >

                    </Select>
                </Form.Item>
                <Button className='config-details-link'>
                    添加
                </Button>
            </Row>

            <div className='config-details-gitTest'>
                <Button>测试连接</Button>
            </div>

        </Fragment>
    )
}

export default ConfigCodeSvn