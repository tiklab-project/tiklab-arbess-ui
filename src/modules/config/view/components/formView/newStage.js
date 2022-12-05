import React,{useState} from "react";
import {DeleteOutlined,ExclamationCircleOutlined,SwapOutlined} from "@ant-design/icons";
import {Popconfirm} from "antd";
import Switch from "./switch";
import ChangeSortsModal from "./changeSortsModal";
import HlineIcon from "../../../common/components/hlineIcon";
import CodeGitOrGitlab from "./forms/codeGitOrGitlab";
import CodeGiteeOrGithub from "./forms/codeGiteeOrGithub";
import CodeSvn from "./forms/codeSvn";
import TestUnit from "./forms/testUnit";
import BuildMavenOrNode from "./forms/buildMavenOrNode";
import Deploy from "./forms/deploy";
import ScanSonarQuebe from "./forms/scanSonarQuebe";
import GoodsNexus from "./forms/goodsNexus";
import GoodsSsh from "./forms/goodsSsh";

const NewStage = props =>{

    const {data,deleteConfig,pipelineId,validType,updateOrderConfig} = props

    const [changeSortVisible,setChangeSortVisible] = useState(false)

    const delType = item => {
        deleteConfig(item.configId)
    }

    const renderValidType = configId => {
        return validType && validType.map((item,index)=>{
            return  item==configId && <ExclamationCircleOutlined key={index} style={{fontSize:16,color:"#ff0000"}}/>
        })
    }

    const isChange = type =>{
        if(type < 10 || data && data.length < 2){
            return false
        }
        if(data && data.length === 2){
            return !data.some(item => item.type < 10);
        }
        return true
    }

    
    const renderForms = item => {
        switch (item.type){
            case 1:
            case 4:
                return <CodeGitOrGitlab dataItem={item}/>
            case 2:
            case 3:
                return <CodeGiteeOrGithub dataItem={item}/>
            case 5:
                return <CodeSvn dataItem={item}/>
            case 11:
                return <TestUnit dataItem={item}/>
            case 21:
            case 22:
                return <BuildMavenOrNode dataItem={item}/>
            case 31:
            case 32:
                return <Deploy dataItem={item}/>
            case 41:
                return <ScanSonarQuebe dataItem={item}/>
            case 51:
                return <GoodsNexus dataItem={item}/>
            case 52:
                return <GoodsSsh dataItem={item}/>
        }
    }
    

    const newStage = (item,index) =>{
        return <div className="formView-wrapper" key={item.configId} id={`formView_${index}`}>
            <div className="formView-wrapper-Headline">
                <div className="headline-left">
                    <HlineIcon type={item.type}/>
                    {renderValidType(item.configId)}
                </div>
                <div className="headline-right">
                    {
                        isChange(item.type) &&
                        <span className="headline-changSort" onClick={()=>setChangeSortVisible(true)}>
                            <SwapOutlined />更改顺序
                        </span>
                    }
                    <Popconfirm
                        placement="topRight"
                        title="你确定删除吗"
                        onConfirm={()=>delType(item)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <span className="headline-delete">
                            <DeleteOutlined />删除
                        </span>
                    </Popconfirm>
                </div>
            </div>
            <Switch dataItem={item}/>
            <div className="formView-wrapper-forms">
                {renderForms(item)}
            </div>
        </div>
    }

    return  (
        <>
            {data && data.map((item,index)=>{
                return newStage(item,index+1)
            })}

            <ChangeSortsModal
                changeSortVisible={changeSortVisible}
                setChangeSortVisible={setChangeSortVisible}
                data={data}
                pipelineId={pipelineId}
                updateOrderConfig={updateOrderConfig}
            />
        </>
    )
}

export default NewStage