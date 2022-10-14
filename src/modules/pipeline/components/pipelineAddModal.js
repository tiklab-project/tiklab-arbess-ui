import React,{useEffect,useRef,useState} from "react";
import {Form,Input,message,Modal,Select,Row,Col} from "antd";
import moment from "../../../common/moment/moment";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import PipelineAddModalRight from "./pipelineAddModalRight";
import PipelineAddModalLeft from "./pipelineAddModalLeft";

// 左侧锚点
const leftLis = [
    {
        id:1,
        title:"快速选择"
    },
    {
        id:2,
        title:"Java"
    },
    {
        id:3,
        title:"Node"
    },
]
// 右侧lis渲染
const rightLis = [
    {
        id:2,
        type:2,
        title:"Java",
        desc:"Linux",
        first:"构建",
        second:"部署",
    },
    {
        id:3,
        type:2,
        title:"Java",
        desc: "docker",
        first:"构建",
        second:"部署",
    },
    {
        id:4,
        type:2,
        title:"Java",
        desc: "Linux",
        zreo: "测试",
        first:"构建",
        second:"部署",
    },
    {
        id:5,
        type:2,
        title:"Java",
        desc: "docker",
        zreo: "测试",
        first:"构建",
        second:"部署",
    },
    {
        id:6,
        title:"Nodejs",
        desc: "Linux",
        first:"构建",
        second:"部署",
    },
    {
        id:7,
        type:3,
        title:"Nodejs",
        desc: "Linux",
        first:"构建",
        second:"部署",
    },
]

const PipelineAddModal = props =>{

    const {addPipelineVisible,setAddPipelineVisible,pipelineList,userId,createPipeline} = props
    const inputRef = useRef()
    const [form] = Form.useForm()
    const [templateType,setTemplateType] = useState(1)


    useEffect(()=>{
        if(addPipelineVisible){
            // 文本框聚焦
            inputRef.current.focus()
            // 表单清空
            form.resetFields()
        }
    },[addPipelineVisible])
    
    const onOk = value => {
        const params={
            user:{id:userId},
            pipelineName:value.pipelineName,
            pipelineType:1,
            pipelineCreateTime:moment.moment
        }
        createPipeline(params).then(res=>{
            if(res.code===0 && res.data){
                props.history.push(`/index/task/${res.data}/config`)
            }else{
                message.error({content:"添加失败", className:"message"})
            }
        })
    }

    const [type,setType] = useState(1)

    const changeAnchor = anchorName =>{
        const scrollTop=document.getElementById("pipelineAddModalRight")
        if (anchorName) {
            const anchorElement = document.getElementById(anchorName)
            if (anchorElement) {
                scrollTop.scrollTop = anchorElement.offsetTop
                setType(anchorName)
            }
        }
    }

    const onScroll = () =>{
        const scrollTop=document.getElementById("pipelineAddModalRight").scrollTop
        for(let x = 1;x <=3;x++){
            const iId = document.getElementById(x) //当前id
            const lastId = document.getElementById(x).previousSibling //上一个id
            const iTop =iId &&  iId.offsetTop
            const lastTop =lastId && lastId.offsetTop
            if(scrollTop > lastTop && scrollTop < iTop ){
                setType(x)
            }
        }
    }

    return(
        <Modal
            visible={addPipelineVisible}
            closable={false}
            onCancel={()=>setAddPipelineVisible(false)}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields()
                        onOk(values)
                    })
            }}
            okText="确认"
            cancelText="取消"
            width={800}
        >
            <div className="new">
                <ModalTitle
                    setVisible={setAddPipelineVisible}
                    title={"创建流水线"}
                />
                <Row>
                    <Col span={4}>
                        <PipelineAddModalLeft
                            lis={leftLis}
                            type={type}
                            changeAnchor={changeAnchor}
                        />
                    </Col>
                    <Col span={20}>
                        <PipelineAddModalRight
                            form={form}
                            inputRef={inputRef}
                            lis={rightLis}
                            onScroll={onScroll}
                            pipelineList={pipelineList}
                            templateType={templateType}
                            setTemplateType={setTemplateType}
                        />
                    </Col>


                </Row>
            </div>
        </Modal>
    )
}


export default PipelineAddModal
