import React,{useState,useEffect} from "react";
import {Button,Form,Input,Popconfirm,message} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import EnviModal from "./enviModal";
import "./envi.scss";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import ConfigName from "../../../config/common/component/configCommon/configName";

/*
    环境配置
 */
const Envi = props =>{

    const {settingStore} = props

    const {findAllMatFlowPath,deleteMatFlowPath,updateMatFlowPath} = settingStore

    const [visible,setVisible] = useState(false)
    const [enviData,setEnviData] = useState([])

    // 初始化
    useEffect(()=>{
        findAllMatFlowPath().then(res=>{
            if(res.code===0 && res.data){
                setEnviData(res.data)
            }
        })
    },[])

    // 删除配置
    const deletePart = item => {
        deleteMatFlowPath(item.pathId).then(res=>{
            if(res.code===0){
                for(let i=0 ;i<enviData.length;i++){
                    if(enviData[i].pathType===item.pathType){
                        enviData.splice(i,1)
                    }
                    setEnviData([...enviData])
                }
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    // 保存以及更新
    const onFinish = (values,item)=> {
        const params = {
            pathId:item.pathId,
            pathType:item.pathType,
            pathName:values.pathName,
            pathAddress:values.pathAddress,
        }
        updateMatFlowPath(params).then(res=>{
            if(res.code===0){
                message.success({content:"保存成功",className:"message"})
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    
    const pathTitle = pathType => {
        switch (pathType) {
            case 1:  return "Git"
            case 5:  return "SVN"
            case 21: return "node"
            case 22: return "maven"
        }
    }

    const renderEnviData = enviData => {
        return enviData && enviData.map(item=>{
            return(
                <div key={item.pathType} className="envi-item">
                    <div className="envi-item-Headline">
                        <div className="envi-item-title">
                            {pathTitle(item.pathType)}
                        </div>
                        <div className="envi-item-delete">
                            <Popconfirm
                                title="当前项数据会被清空"
                                onConfirm={()=>deletePart(item)}
                                okText="确定"
                                cancelText="取消"
                            >
                                <CloseOutlined/>
                            </Popconfirm>
                        </div>
                    </div>
                    <Form autoComplete="off"
                          onFinish={values=>onFinish(values,item)}
                          initialValues={{...item}}
                    >
                        <Form.Item label="名称" name="pathName"
                                   rules={[{required:true,message:`请输入${pathTitle(item.pathType)}名称`}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="地址" name="pathAddress"
                                   rules={[{required:true,message:`请输入${pathTitle(item.pathType)}地址`}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item style={{textAlign:"right"}}>
                            <Button htmlType="submit">
                                保存
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )
        })
    }
    
    return <div className="envi">
        <BreadcrumbContent firstItem={"环境配置"} />
        <div className="envi-content">
            <Button onClick={()=>setVisible(true)}>添加配置</Button>

            {renderEnviData(enviData)}

            <EnviModal
                visible={visible}
                setVisible={setVisible}
                enviData={enviData}
                setEnviData={setEnviData}
                pathTitle={pathTitle}
            />
        </div>
    </div>
}

export default inject("settingStore")(observer(Envi))