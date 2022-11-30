import React,{useEffect,useState} from "react";
import {Form,Checkbox} from "antd";
import {inject,observer} from "mobx-react";
import Btn from "../../../common/btn/btn";

const MesNotify = props =>{

    const {configStore,pipelineStore,configDataStore} = props

    const {pipelineId} = pipelineStore
    const {updateConfigure,setIsFindConfig,isFindConfig} = configStore
    const {formInitialValues} = configDataStore

    const [checkValue,setCheckValue] = useState([])

    useEffect(()=>{
        setCheckValue(formInitialValues && formInitialValues.typeList)
    },[pipelineId])

    // 数组是否一致
    const equalsIgnoreOrder = (a,b) =>{
        if(a && b){
            if(a.length !== b.length) return true
            const uniqueValues = new Set([...a, ...b])
            for (const v of uniqueValues){
                const aCount = a.filter(e=>e === v).length
                const bCount = b.filter(e=>e === v).length
                if(aCount !== bCount) return true
            }
            return false
        }
        return false
    }

    const changMesType = value => {
        setCheckValue(value)
    }

    const onOk = () =>{
        const params = {
            pipeline:{pipelineId},
            taskType:61,
            values: {typeList:checkValue},
            message:"update"
        }
        updateConfigure(params)
        formInitialValues.typeList = checkValue
    }

    const onCancel = () => {
        setIsFindConfig(!isFindConfig)
        setCheckValue(formInitialValues && formInitialValues.typeList)
    }

    return(
        <>
            <Form.Item label={"消息发送方式"} name={"typeList"}
                       rules={[{required:true, message:"请选择消息发送方式"}]}
            >
                <Checkbox.Group onChange={changMesType}>
                    <Checkbox value="site">站内信</Checkbox>
                    <Checkbox value="sms">短信通知</Checkbox>
                    <Checkbox value="wechat">企业微信</Checkbox>
                </Checkbox.Group>
            </Form.Item>
            {
                equalsIgnoreOrder(formInitialValues && formInitialValues.typeList,checkValue && checkValue) &&
                    <div style={{paddingLeft:130}}>
                        <Btn
                            title={"取消"}
                            isMar={true}
                            onClick={()=>onCancel()}
                        />
                        <Btn
                            title={"保存"}
                            type={"primary"}
                            onClick={()=>onOk()}
                        />
                    </div>
            }
        </>
    )
}

export default inject("pipelineStore","configStore","configDataStore")(observer(MesNotify))