import React,{useState,useEffect} from "react";
import {message,Tooltip,Table,Space,Spin,Dropdown,Form,Input} from "antd";
import {
    PlayCircleOutlined,
    LoadingOutlined,
    LockOutlined,
    UnlockOutlined,
    MinusCircleOutlined,
    CloseCircleOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined
} from "@ant-design/icons";
import {observer} from "mobx-react";
import historyStore from "../../history/store/HistoryStore";
import pipelineStore from "../store/PipelineStore";
import ListEmpty from "../../../common/component/list/ListEmpty";
import Profile from "../../../common/component/profile/Profile";
import ListIcon from "../../../common/component/list/ListIcon";
import Page from "../../../common/component/page/Page";
import Modals from "../../../common/component/modal/Modal";
import {debounce} from "../../../common/utils/Client";
import pip_xingxing from "../../../assets/images/svg/pip_xingxing.svg";
import pip_xingxing_kong from "../../../assets/images/svg/pip_xingxing-kong.svg";
import pip_more from "../../../assets/images/svg/pie_more.svg";
import "./PipelineTable.scss";

/**
 * 流水线表格页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineTable = props =>{

    const {pipPage,pipelineListPage,changPage,changFresh,listType,setIsLoading}=props

    const {updateFollow,findPipelineCloneName,pipelineClone,
        importPipelineYaml,findUserPipeline
    } = pipelineStore
    const {execStart,execStop}=historyStore

    const [form] = Form.useForm();

    //所有流水线
    const [pipelineList,setPipelineList] = useState([])

    //克隆的对象
    const [pipelineObj,setPipelineObj] = useState(null)

    //克隆弹出框
    const [copyVisible,setCopyVisible] = useState(false)

    //克隆状态
    const [copyStatus,setCopyStatus] = useState(false)

    useEffect(()=>{
        if(copyVisible){
            // 获取所有流水线
            findUserPipeline().then(res=>{
                if(res.code===0){
                    setPipelineList(res.data || [])
                }
            })
        }
    },[copyVisible])

    /**
     * 收藏
     * @param record
     */
    const collectAction = record => {
        updateFollow({id:record.id}).then(res=>{
            if(record.collect===0){
                collectMessage(res,"收藏")
            }else {
                collectMessage(res,"取消")
            }
        })
    }

    /**
     * 收藏提示
     */
    const collectMessage = (res,info) =>{
        if(res.code===0){
            message.info(`${info}成功`)
            changFresh()
        }else {
            message.info(res.msg)
        }
    }

    /**
     * 运行或者终止
     */
    const work = debounce(record =>{
        setIsLoading(true)
        if(record.state === 1){
            execStart({
                pipelineId:record.id
            }).then(r=>{
                setIsLoading(false)
                if(r.code===0){
                    return goInstance({
                        id:record.id,
                        instanceId:r.data.instanceId
                    })
                }
            })
        } else {
            execStop(record.id).then(r=>{
                setIsLoading(false)
                if(r.code===0){
                    changFresh()
                }
            })
        }
    },1000)


    /**
     * 克隆
     */
    const toCopy = (record) => {
        findPipelineCloneName(record.id).then(res=>{
            setPipelineObj({
                id:record.id,
                name:res.data || record.name,
            })
            form.setFieldsValue({name:res.data || record.name})
            setCopyVisible(true)
        })
    }

    /**
     * 确定克隆
     */
    const onCopyOk = () => {
        form.validateFields().then(value=>{
            if(copyStatus) return;
            setCopyStatus(true)
            pipelineClone({
                pipelineId:pipelineObj.id,
                pipelineName:value.name
            }).then(res=>{
                if(res.code===0){
                    message.info("克隆成功")
                    onCancel()
                    changFresh()
                } else {
                    message.info("克隆失败")
                }
                setCopyStatus(false)
            })
        })
    }

    /**
     * 取消克隆
     */
    const onCancel = () =>{
        if(!copyStatus){
            form.resetFields()
            setCopyVisible(false)
            setPipelineObj(null)
        }
    }

    /**
     * 导出yaml文件
     */
    const toYaml = record => {
        importPipelineYaml(record.id).then(response=>{
            if(!response.code){
                // 生成二进制数据的blob URL
                const url = window.URL.createObjectURL(new Blob([response],{type: 'text/plain;charset=utf-8;content-type'}));
                // 创建a标签并设置download属性
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${record.name}.yaml`);
                // 点击触发下载
                document.body.appendChild(link);
                link.click();
                link.remove();
                // 释放内存
                window.URL.revokeObjectURL(url);
            }else {
                message.info(response.msg)
            }
        })
    }

    /**
     * 去历史构建详情
     * @param record
     * @returns {*}
     */
    const goInstance = record => props.history.push(`/pipeline/${record.id}/history/${record.instanceId}`)

    /**
     * 去概况页面
     */
    const goPipelineTask = (text,record) => props.history.push(`/pipeline/${record.id}/history`)

    const renIcon = buildStatus => {
        switch (buildStatus) {
            case "error" :
                return  <CloseCircleOutlined style={{color:"#FF0000"}}/>
            case "success" :
                return  <CheckCircleOutlined style={{color:"#0063FF"}}/>
            case "halt":
                return  <ExclamationCircleOutlined style={{color:"#222222"}}/>
            case "run":
                return  <Spin indicator={<LoadingOutlined style={{color:"#222222"}} spin />} />
            case "wait":
                return  <PlayCircleOutlined style={{color:"#222222"}}/>
        }
    }

    const columns = [
        {
            title: "流水线名称",
            dataIndex: "name",
            key: "name",
            width:"28%",
            ellipsis:true,
            render:(text,record)=>{
                return  <span className='pipelineTable-name' onClick={()=>goPipelineTask(text,record)}>
                            <ListIcon text={text} colors={record.color}/>
                            <span>{text}</span>
                        </span>
            }
        },
        {
            title: "最近构建信息",
            dataIndex: "lastBuildTime",
            key: "lastBuildTime",
            width:"28%",
            ellipsis:true,
            render:(text,record) =>{
                const {buildStatus,number} = record
                return (
                    <span>
                        { text || '无构建' }
                        { number &&
                            <span className='pipeline-number' onClick={() => goInstance(record)}># {number}
                                <span className='pipeline-number-desc'>{renIcon(buildStatus)}</span>
                            </span>
                        }
                    </span>
                )
            }
        },
        {
            title: "负责人",
            dataIndex: ["user","nickname"],
            key: "user",
            width:"17%",
            ellipsis: true,
            render:(text,record) => {
                return (
                    <Space>
                        <Profile userInfo={record.user}/>
                        { text || '--'}
                    </Space>
                )
            }
        },
        {
            title: "可见范围",
            dataIndex: "power",
            key: "power",
            width:"13%",
            ellipsis: true,
            render:text => {
                switch (text) {
                    case 1:
                        return  <Space>
                                    <UnlockOutlined />
                                    全局
                                </Space>
                    case 2:
                        return  <Space>
                                    <LockOutlined />
                                    私有
                                </Space>
                }
            }
        },
        {
            title: "操作",
            dataIndex: "action",
            key:"action",
            width:"14%",
            ellipsis:true,
            render:(text,record)=>{
                const {state,collect} = record
                return(
                    <Space size="middle">
                        <Tooltip title={state===3?"等待":"运行"} >
                            <span className="pipelineTable-action" onClick={()=>work(record)}>
                                { state === 1 && <PlayCircleOutlined className="actions-se"/> }
                                { state === 2 && <Spin indicator={<LoadingOutlined className="actions-se" spin />} /> }
                                { state === 3 && <MinusCircleOutlined className="actions-se"/> }
                            </span>
                        </Tooltip>
                        <Tooltip title="收藏">
                            <span className="pipelineTable-action" onClick={()=>collectAction(record)}>
                                <img src={collect === 0 ? pip_xingxing_kong : pip_xingxing} alt={"收藏"} width={20} height={20}/>
                            </span>
                        </Tooltip>
                        <Dropdown
                            overlay={
                                <div className="arbess-dropdown-more">
                                    <div className="dropdown-more-item" onClick={()=>toCopy(record)}>克隆</div>
                                    <div className="dropdown-more-item" onClick={()=>toYaml(record)}>导出YAML文件</div>
                                </div>
                            }
                            trigger={['click']}
                            placement={"bottomRight"}
                        >
                            <Tooltip title="更多">
                                <span className="pipelineTable-action">
                                    <img src={pip_more} width={18} alt={'更多'}/>
                                </span>
                            </Tooltip>
                        </Dropdown>
                    </Space>
                )
            }
        },
    ]

    return  (
        <div className="pipelineTable">
            <Table
                columns={columns}
                dataSource={pipelineListPage}
                rowKey={record=>record.id}
                pagination={false}
                locale={{emptyText: <ListEmpty />}}
            />
            <Page
                currentPage={pipPage.currentPage}
                changPage={changPage}
                page={pipPage}
            />
            <Modals
                title={`复制流水线`}
                visible={copyVisible}
                onOk={onCopyOk}
                onCancel={onCancel}
                width={500}
            >
                <Spin spinning={copyStatus} tip={"克隆中……"}>
                    <div className="pipelineTable-copy-modal-form">
                        <Form form={form} layout={"vertical"}>
                            <Form.Item
                                name='name'
                                label='名称'
                                rules={[
                                    {required:true,message:"名称不能为空"},
                                    {
                                        pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{0,30}$/,
                                        message: "流水线名称最长30位且不能包含非法字符，如&,%，&，#……等",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule,value) {
                                            let nameArray = []
                                            if(pipelineList){
                                                nameArray = pipelineList && pipelineList.map(item=>item.name)
                                            }
                                            if (nameArray.includes(value)) {
                                                return Promise.reject("名称已经存在");
                                            }
                                            return Promise.resolve()
                                        },
                                    }),
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>
            </Modals>
        </div>
    )
}

export default observer(PipelineTable)
