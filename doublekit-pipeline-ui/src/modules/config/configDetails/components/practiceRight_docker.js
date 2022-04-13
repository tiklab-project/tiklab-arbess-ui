import React, {Fragment, useState} from "react";
import {Button, Form, Input, Row, Select} from "antd";
import DeployAddModal from "../../common/component/deployAddModal";

const {Option}=Select

const PracticeRight_docker = props =>{

    const [visible, setVisible] = useState(false)

    const validate = (rule,value) =>{
        if (!value) {
            return Promise.resolve();
        } else if (value< 3000) {
            return Promise.reject("最小3000");
        } else if (value > 30000) {
            return Promise.reject("最大30000");
        } else if (!/^\d+$|^\d+[.]?\d+$/.test(value)) {
            return Promise.reject("只能输入数字");
        } else {
            return Promise.resolve(); //验证通过
        }
    }

    return(
        <Fragment>
            <Form.Item name='dockerTargetAddress' label='请输入文件地址'>
                <Input/>
            </Form.Item>
            <Row>
                <Form.Item name='dockerPlace' label='请选择Ip地址'>
                    <Select style={{ width: 300 }}>
                        <Option >
                            无
                        </Option>

                    </Select>
                </Form.Item>
                <Button
                    onClick={()=>setVisible(true)}
                    className='config-details-link'
                >
                    添加
                </Button>
            </Row>
            <Form.Item
                name='dockerBootPort'
                label='启动端口'
                style={{ display: 'inline-block'}}
                rules={[
                    {
                        validator: validate,
                    },
                ]}
            >
                <Input style={{width:200}}/>
            </Form.Item>
            <Form.Item
                name='dockerMappingPort'
                label='映射端口'
                style={{ display: 'inline-block',  margin: '1px 3px' }}
                rules={[
                    {
                        validator: validate,
                    },
                ]}
            >
                <Input style={{width:200}}/>
            </Form.Item>
            <Form.Item name='dockerAddress' label='部署位置'>
                <Input/>
            </Form.Item>

            <DeployAddModal
                visible={visible}
                setVisible={setVisible}
            />
        </Fragment>
    )
}

export default PracticeRight_docker