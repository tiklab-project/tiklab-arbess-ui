import React,{useState,useEffect,useRef} from "react";
import "./pipelineAdd.scss";
import moment from "../../../common/moment/moment";
import {getUser} from "doublekit-core-ui";
import {Form,Input,Button,message} from "antd";
import {observer,inject} from "mobx-react";

const lis= [
    {
        id: "0",
        title: "流水线",
        desc: "精心地组织一个可以长期运行在多个节点上的任务。适用于构建流水线（更加正式地应当称为工作流），增加或者组织难以采用自由风格的任务类型。"
    },
    {
        id: "1",
        title: "构建一个maven项目",
        desc: "构建一个maven项目。"
    }
]

const PipelineAdd = props => {

    const {pipelineStore}=props
    const {createPipeline,pipelineList,findAllPipelineStatus}=pipelineStore

    const inputRef = useRef()
    const [liStatus,setLiStatus] = useState(0)
    const userId = getUser().userId

    //获取所有pipelinList，然后对pipelineName进行校验
    useEffect(()=>{
        findAllPipelineStatus(userId)
    },[])

    useEffect(()=>{
        inputRef.current.focus()
    },[])

    //点击类型选择
    const liStatusData = index => {
        setLiStatus(index)
    }

    const handSubmit = value => {
        const params={
            user:{id:userId},
            pipelineName:value.pipelineName,
            pipelineType:1,
            pipelineCreateTime:moment.moment
        }
        createPipeline(params).then(res=>{
            if(res.code === 0 && res.data){
                localStorage.setItem("pipelineId",res.data)
                localStorage.setItem("pipelineName",value.pipelineName)
                props.history.push(`/index/config/${value.pipelineName}`)
            }else{
                message.error({content:"添加失败", className:"message"})
            }
        })
    }

    return(
        <div className="new">
            <Form id="form" name="basic" onFinish={handSubmit} autoComplete="off">
                <Form.Item
                    label="流水线名称"
                    name="pipelineName"
                    rules={[
                        {required:true, message:""},
                        {
                            pattern: /^[\s\u4e00-\u9fa5a-z0-9_-]{0,}$/,
                            message: "流水线名称不能包含非法字符，如&,%，&，#……等",
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value) {
                                    return Promise.reject("请输入名称")
                                }
                                let nameArray = []
                                if(pipelineList){
                                    nameArray = pipelineList && pipelineList.map(item=>item.pipelineName);
                                }
                                if (nameArray.includes(value)) {
                                    return Promise.reject("名称已经存在");
                                }
                                return Promise.resolve()
                            },
                        }),
                    ]}
                >
                    <Input style={{width:400}} ref={inputRef}/>
                </Form.Item>
            </Form>
            <div  className="new-type">
                <ul className="new-type-choose">
                    {
                        lis.map((item,index) => {
                            return (
                                <li key={item.id}
                                    onClick={()=> liStatusData(index) }
                                    className={ liStatus === index ? "choose-item choose-active":"choose-item"}
                                >
                                    <div className="choose-item-icon">
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref="#icon-lishijishi"/>
                                        </svg>
                                    </div>
                                    <div className="choose-item-options">
                                        <label>{item.title}</label>
                                        <div>{item.desc}</div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="new-btn">
                <span className="new-btn-span">
                    <Button htmlType="submit" form="form" type="primary" >
                        添加
                    </Button>
                </span>
            </div>
        </div>
    )
}

export default inject("pipelineStore")(observer(PipelineAdd))