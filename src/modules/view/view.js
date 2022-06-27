import React,{useEffect,useRef} from "react";
import { Form, Input,Checkbox,Modal} from "antd";

const View = props =>{

    const {visible,setVisible} = props
    const inputRef = useRef();
    const [form] = Form.useForm()

    useEffect(()=>{
        if(visible){
            inputRef.current.focus()
        }
    },[])

    const onOk = () =>{
        form.validateFields().then((values) => {
            setVisible(false)
        })
    }

    return(
        <Modal
            visible={visible}
            closable={false}
            okText="确认"
            cancelText="取消"
            onCancel={()=>setVisible(false)}
            onOk={onOk}
        >
            <Form id='form' name='basic' ref={inputRef}  form={form} autoComplete='off' layout="vertical">
                <Form.Item
                    label='视图名称'
                    name='pipelineName'
                    rules={[
                        {required:true, message:''},
                    ]}
                >
                    <Input style={{width:400}} ref={inputRef}/>
                </Form.Item>
                <Form.Item
                    label='添加视图项目'
                    name='11'
                >
                    <Checkbox.Group>
                        <Checkbox value="a">item 1</Checkbox>
                        <Checkbox value="b">item 2</Checkbox>
                        <Checkbox value="c">item 3</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default View