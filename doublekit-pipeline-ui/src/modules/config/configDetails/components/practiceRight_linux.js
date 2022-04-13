import React, {Fragment,useState} from "react";
import {Button, Form, Input, Row, Select} from "antd";
import DeployAddModal from "../../common/component/deployAddModal";

const {Option}=Select
const { TextArea } = Input;

const PracticeRight_linux = props =>{

    const [visible, setVisible] = useState(false)

    return(
        <Fragment>
            <Form.Item name='linuxTargetAddress' label='请输入文件地址'>
                <Input  placeholder="请输入需要发送的文件模块名以及文件后缀名"/>
            </Form.Item>
            <Row>
                <Form.Item name='linuxPlace' label='请选择Ip地址'>
                    <Select style={{width:300}}>
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
            <Form.Item name='linuxAddress' label='部署位置'>
                <Input/>
            </Form.Item>
            <Form.Item name='linuxShell' label='shell命令'>
                <TextArea autoSize/>
            </Form.Item>
            <DeployAddModal
                visible={visible}
                setVisible={setVisible}
            />
        </Fragment>
    )
}

export default PracticeRight_linux

