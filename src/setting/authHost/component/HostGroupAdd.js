import React,{useEffect,useState} from "react";
import {Form, Input} from "antd";
import {Validation} from "../../../common/utils/Client";
import Modals from "../../../common/component/modal/Modal";
import HostGroupAddHost from "./HostGroupAddHost";
import hostGroupStore from "../store/HostGroupStore";

const HostGroupAdd = (props) => {

    const {visible,setVisible,formValue,findAuth} = props;

    const {createAuthHostGroup,updateAuthHostGroup} = hostGroupStore;

    const [form] = Form.useForm();

    // 选中的主机
    const [addHost,setAddHost] = useState([]);

    useEffect(()=>{
        if(formValue){
            form.setFieldsValue(formValue);
            setAddHost(formValue?.detailsList.map(item=>({...item.authHost})))
        }else {
            setAddHost([])
        }
    },[visible])

    const onOk = () => {
        form.validateFields().then((values) => {
            const params = {
                ...values,
                details:"",
                detailsList:addHost && addHost.map(item=>({authHost:{hostId:item.hostId}}))
            }
            if(formValue){
                updateAuthHostGroup({
                    ...params,
                    groupId:formValue.groupId
                }).then(res=>{
                    if(res.code===0){
                        findAuth()
                    }
                })
            }else {
                createAuthHostGroup(params).then(res=>{
                    if(res.code===0){
                        findAuth()
                    }
                })
            }
            onCancel()
        })
    }

    const onCancel = () => {
        setVisible(false);
        form.resetFields();
    }

    return (
        <Modals
            visible={visible}
            onCancel={onCancel}
            onOk={onOk}
            width={600}
            title={formValue?"修改":"添加"}
        >
            <div className="resources-modal">
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item
                        label={"名称"}
                        name={"groupName"}
                        rules={[{required:true,message:`名称不能空`},Validation("名称")]}
                    >
                        <Input/>
                    </Form.Item>
                    <HostGroupAddHost
                        addHost={addHost}
                        setAddHost={setAddHost}
                    />
                </Form>
            </div>
        </Modals>
    )
}

export default HostGroupAdd
