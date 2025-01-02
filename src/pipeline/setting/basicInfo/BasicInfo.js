import React,{useState} from "react";
import {Input, Spin,Row,Col} from "antd";
import {
    DeleteOutlined,
    DownOutlined,
    RightOutlined,
    EditOutlined
} from "@ant-design/icons";
import {PrivilegeProjectButton} from "tiklab-privilege-ui";
import {inject,observer} from "mobx-react";
import PipelineAddInfo from "../../pipeline/components/PipelineAddInfo";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import Modals from "../../../common/component/modal/Modal";
import Btn from "../../../common/component/btn/Btn";
import "./BasicInfo.scss";

/**
 * 流水线信息
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const BasicInfo = props =>{

    const {pipelineStore} = props

    const {deletePipeline,pipeline}=pipelineStore

    //树的展开与闭合
    const [expandedTree,setExpandedTree] = useState([])
    //删除加载状态
    const [isLoading,setIsLoading] = useState(false)
    //删除弹出框
    const [delVisible,setDelVisible] = useState(false)
    //删除文本框内容
    const [delValue,setDelValue] = useState("")
    //删除效验提示内容
    const [delError,setDelError] = useState(null)

    /**
     * 删除流水线
     */
    const delPipeline = () =>{
        if(isLoading){
            return;
        }
        if(delValue.trim()==="" || delValue!==pipeline.name){
            setDelError("流水线名称错误")
            return;
        }
        setIsLoading(true)
        deletePipeline(pipeline.id).then(()=>{
            onCancel()
            props.history.push("/pipeline")
        })
    }

    /**
     * 关闭删除流水线弹出框
     */
    const onCancel = () =>{
        if(!isLoading){
            setIsLoading(false)
            setDelVisible(false)
            setDelValue("")
            setDelError(null)
        }
    }

    const lis = [
        {
            key:1,
            title:"流水线信息",
            desc: "更新流水线信息",
            icon: <EditOutlined />,
            enCode:"pipeline_update",
            content: <div className="bottom-rename">
                        <PipelineAddInfo
                            {...props}
                            set={true}
                            setIsLoading={setIsLoading}
                            onClick={()=>setOpenOrClose(1)}
                        />
                    </div>
        },
        {
            key:2,
            title:"流水线删除",
            desc: "删除流水线",
            icon: <DeleteOutlined />,
            enCode:"pipeline_delete",
            content: <div className="bottom-delete">
                        <div style={{color:"#ff0000",paddingBottom:5,fontSize:13}}>
                            此操作无法恢复！请慎重操作！
                        </div>
                        <Btn
                            onClick={()=>setOpenOrClose(2)}
                            title={"取消"}
                            isMar={true}
                        />
                        <PrivilegeProjectButton code={"pipeline_delete"} domainId={pipeline && pipeline.id}>
                            <Btn
                                onClick={()=>setDelVisible(true)}
                                type={"dangerous"}
                                title={"删除"}
                            />
                        </PrivilegeProjectButton>
                    </div>
        }
    ]

    /**
     * 是否符合要求
     * @param key
     * @returns {boolean}
     */
    const isExpandedTree = key => {
        return expandedTree.some(item => item ===key)
    }

    /**
     * 展开和闭合
     * @param key
     */
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            // false--闭合
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            // ture--展开
            setExpandedTree(expandedTree.concat(key))
        }
    }

    const lisItem = item =>{
        return <div key={item.key} className="pipelineReDel-li">
            <div className={`pipelineReDel-li-top ${isExpandedTree(item.key) ?"pipelineReDel-li-select":""}`}
                onClick={()=>setOpenOrClose(item.key)}
            >
                <div className="pipelineReDel-li-icon">{item.icon}</div>
                <div className="pipelineReDel-li-center">
                    <div className="pipelineReDel-li-title">{item.title}</div>
                    {
                        !isExpandedTree(item.key) &&
                        <div className="pipelineReDel-li-desc">{item.desc}</div>
                    }
                </div>
                <div className="pipelineReDel-li-down">
                    { isExpandedTree(item.key)? <DownOutlined />:<RightOutlined /> }
                </div>
            </div>
            <div className={`${isExpandedTree(item.key)? "pipelineReDel-li-bottom":"pipelineReDel-li-none"}`}>
                { isExpandedTree(item.key) && item.content }
            </div>
        </div>
    }

    return(
        <Row className="pipelineReDel">
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "16", offset: "4" }}
                xxl={{ span: "14", offset: "5" }}
            >
                <div className="arbess-home-limited">
                    <div className="pipelineReDel-up">
                        <BreadCrumb firstItem={"流水线信息"}/>
                    </div>
                    <div className="pipelineReDel-content">
                        <div className="pipelineReDel-ul">
                            {
                                lis.map(item=> lisItem(item))
                            }
                        </div>
                    </div>
                </div>
                <Modals
                    visible={delVisible}
                    onCancel={onCancel}
                    onOk={delPipeline}
                    title={"删除流水线"}
                    okText={'确认删除'}
                    okType={'dangerous'}
                >
                    <Spin spinning={isLoading} tip="删除中...">
                        <div className="pipelineReDel-modal">
                            <div className="pipelineReDel-modal-warn">危险：流水线删除无法恢复！请慎重操作！</div>
                            <div className="pipelineReDel-modal-warn">
                                <div>该操作将永久删除流水线<span className="warn-pipeline"> {pipeline?.name} </span>的相关数据，包括（配置、历史、制品）等。</div>
                                <div className="warn-continue">为防止意外，确认继续操作请输入以下内容：</div>
                                <div className="warn-pipeline-title">{pipeline?.name}</div>
                            </div>
                            <div className="pipelineReDel-modal-input">
                                <Input
                                    className={`${delError?"inputs-error":""}`}
                                    placeholder="请输入提示内容以确认继续操作"
                                    onChange={e=>setDelValue(e.target.value)}
                                />
                            </div>
                            <div className="pipelineReDel-modal-error">
                                {delError}
                            </div>
                        </div>
                    </Spin>
                </Modals>
            </Col>
        </Row>
    )
}

export default inject("pipelineStore")(observer(BasicInfo))
