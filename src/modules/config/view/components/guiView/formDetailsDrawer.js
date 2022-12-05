import React from "react";
import {Drawer, Popconfirm} from "antd";
import {CloseOutlined,DeleteOutlined} from "@ant-design/icons";
import SubIcon from "../../../common/components/subIcon";
import Btn from "../../../../common/btn/btn";
import "./formDetailsDrawer.scss";
import CodeGitOrGitlab from "./forms/codeGitOrGitlab";
import CodeGiteeOrGithub from "./forms/codeGiteeOrGithub";
import CodeSvn from "./forms/codeSvn";
import TestUnit from "./forms/testUnit";
import BuildMavenOrNode from "./forms/buildMavenOrNode";
import Deploy from "./forms/deploy";
import ScanSonarQuebe from "./forms/scanSonarQuebe";
import GoodsNexus from "./forms/goodsNexus";
import GoodsSsh from "./forms/goodsSsh";

const FormDetailsDrawer = props =>{

    const {deleteConfig,taskFormDrawer,setTaskFormDrawer,dataItem} = props

    const deletePart = dataItem =>{
        deleteConfig(dataItem.configId)
        setTaskFormDrawer(false)
    }

    const renderForms = dataItem =>{
        switch (dataItem.type){
            case 1:
            case 4:
                return <CodeGitOrGitlab dataItem={dataItem}/>
            case 2:
            case 3:
                return <CodeGiteeOrGithub dataItem={dataItem}/>
            case 5:
                return <CodeSvn dataItem={dataItem}/>
            case 11:
                return <TestUnit dataItem={dataItem}/>
            case 21:
            case 22:
                return <BuildMavenOrNode dataItem={dataItem}/>
            case 31:
            case 32:
                return <Deploy dataItem={dataItem}/>
            case 41:
                return <ScanSonarQuebe dataItem={dataItem}/>
            case 51:
                return <GoodsNexus dataItem={dataItem}/>
            case 52:
                return <GoodsSsh dataItem={dataItem}/>
        }
    }

    return(
        <Drawer
            placement="right"
            visible={taskFormDrawer}
            onClose={()=>setTaskFormDrawer(false)}
            closable={false}
            maskStyle={{background:"transparent"}}
            contentWrapperStyle={{width:480,top:48,height:"calc(100% - 48px)"}}
            bodyStyle={{padding:0}}
        >
            <div className="wrapper">
                <div className="wrapper-head">
                    <div className="wrapper-head-title">
                        <SubIcon type={dataItem.type}/>
                        <Popconfirm
                            placement="topRight"
                            title="你确定删除吗"
                            onConfirm={()=>deletePart(dataItem)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <span className="deletePart">
                                <DeleteOutlined />
                            </span>
                        </Popconfirm>
                    </div>
                    <Btn
                        onClick={()=>setTaskFormDrawer(false)}
                        title={<CloseOutlined />}
                        type="text"
                    />
                </div>
                <div className="wrapper-body">
                    <div className="body">
                        <div className="body-taskForm">
                            <div className="taskForm-forms">
                                {renderForms(dataItem)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default FormDetailsDrawer