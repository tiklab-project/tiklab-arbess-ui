import React from "react";
import {Drawer} from "antd";
import {CloseOutlined,DeleteOutlined} from "@ant-design/icons";
import SubIcon from "../../../config/view/components/formTitle/subIcon";
import Btn from "../../../common/btn/btn";
import "./formDetailsDrawer.scss";
import CodeGitOrGitlab from "../forms/codeGitOrGitlab";
import CodeGiteeOrGithub from "../forms/codeGiteeOrGithub";
import CodeSvn from "../forms/codeSvn";
import TestUnit from "../forms/testUnit";
import BuildMavenOrNode from "../forms/buildMavenOrNode";
import Deploy from "../forms/deploy";
import ScanSonarQuebe from "../forms/scanSonarQuebe";
import GoodsNexus from "../forms/goodsNexus";
import GoodsSsh from "../forms/goodsSsh";

const FormDetailsDrawer = props =>{

    const {taskFormDrawer,setTaskFormDrawer,dataItem,deletePart} = props

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
            onClose={()=>setTaskFormDrawer(false)}
            visible={taskFormDrawer}
            closable={false}
            maskStyle={{background:"transparent"}}
            contentWrapperStyle={{width:480,top:48,height:"calc(100% - 48px)"}}
            bodyStyle={{padding:0}}
        >
            <div className="wrapper">
                <div className="wrapper-head">
                    <div className="wrapper-head-title">
                        <SubIcon type={newStage}/>
                        <span className="deleted"
                              onClick={()=>deletePart(newStage)}
                        >
                            <DeleteOutlined/>
                        </span>
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