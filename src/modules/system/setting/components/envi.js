import React,{useState,useEffect} from "react";
import {Button,Form,Input,Popconfirm,message} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import EnviModal from "./enviModal";
import "./envi.scss";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";

/*
    系统环境配置
 */
const Envi = props =>{

    const {settingStore} = props

    const {findAllMatFlowScm,deleteMatFlowScm,updateMatFlowScm} = settingStore

    const [visible,setVisible] = useState(false)
    const [enviData,setEnviData] = useState([])

    // 初始化
    useEffect(()=>{
        findAllMatFlowScm().then(res=>{
            if(res.code===0 && res.data){
                setEnviData(res.data)
            }
        })
    },[])

    // 删除配置
    const deletePart = item => {
        deleteMatFlowScm(item.scmId).then(res=>{
            if(res.code===0){
                for(let i=0 ;i<enviData.length;i++){
                    if(enviData[i].scmType===item.scmType){
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
            scmId:item.scmId,
            scmType:item.scmType,
            scmName:values.scmName,
            scmAddress:values.scmAddress,
        }
        updateMatFlowScm(params).then(res=>{
            if(res.code===0){
                message.success({content:"保存成功",className:"message"})
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    const scmTitle = ScmType => {
        switch (ScmType) {
            case 1:  return "Git"
            case 5:  return "SVN"
            case 21: return "maven"
            case 22: return "node"
        }
    }

    // 渲染环境配置
    const renderEnviData = enviData => {
        return enviData && enviData.map(item=>{
            return  <div key={item.scmType} className="envi-item">
                        <div className="envi-item-Headline">
                            <div className="envi-item-title">
                                {scmTitle(item.scmType)}
                            </div>
                            <div className="envi-item-delete">
                                <Popconfirm
                                    title="当前项数据会被清空"
                                    onConfirm={()=>deletePart(item)}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Button type="text"><CloseOutlined/></Button>
                                </Popconfirm>
                            </div>
                        </div>
                        <Form autoComplete="off"
                              onFinish={values=>onFinish(values,item)}
                              initialValues={{...item}}
                        >
                            <Form.Item label="名称" name="scmName"
                                       rules={[{required:true,message:`请输入${scmTitle(item.scmType)}名称`}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item label="地址" name="scmAddress"
                                       rules={[{required:true,message:`请输入${scmTitle(item.scmType)}地址`}]}
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
                scmTitle={scmTitle}
            />
        </div>
    </div>
}

export default inject("settingStore")(observer(Envi))