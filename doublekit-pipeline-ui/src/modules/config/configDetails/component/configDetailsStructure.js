import React,{useCallback} from "react";
import {Input, Form, Radio, Space} from "antd";

const { TextArea } = Input;

const ConfigDetailsStructure = props =>{

    const {structureRadio,setStructureRadio} = props

    // const handlerRadio = useCallback(
    //     e => (
    //         setStructureRadio(e.target.value)
    //     ),
    //     [structureRadio]
    // )

    const handlerRadio= e =>{
        setStructureRadio(e.target.value)
    }

    return(
        <div className=' anchor-content' id='c'>
            <h2>构建</h2>
            <Form.Item name='structureType'>
                <Radio.Group  onChange={handlerRadio} value={structureRadio}>
                    <Space>
                        <Radio value={0}>无</Radio>
                        <Radio value={2}>maven</Radio>
                        <Radio value={3}>node</Radio>
                    </Space>
                </Radio.Group>
            </Form.Item>
            {
                structureRadio===2 ?
                    <>
                        <Form.Item name="mavenAddress" label="文件地址">
                            <Input />
                        </Form.Item>
                        <Form.Item name="mavenOrder" label="执行命令">
                            <TextArea  autoSize/>
                        </Form.Item>
                    </>:null
            }
            {
                structureRadio===3 ?
                    <>
                        <Form.Item name="nodeAddress" label="文件地址">
                            <Input />
                        </Form.Item>
                        <Form.Item name="nodeOrder" label="执行命令">
                            <TextArea  autoSize/>
                        </Form.Item>
                    </>:null
            }
        </div>
    )
}

export default ConfigDetailsStructure