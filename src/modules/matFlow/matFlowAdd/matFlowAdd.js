import React,{useState,useEffect,useRef} from "react";
import {getUser} from "tiklab-core-ui";
import {Form,Button,message,Input} from "antd";
import {observer,inject} from "mobx-react";
import "./matFlowAdd.scss";
import moment from "../../../common/moment/moment";

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

const MatFlowAdd = props => {

    const {matFlowStore}=props
    const {createMatFlow,matFlowList,findAllMatFlowStatus}=matFlowStore

    const inputRef = useRef()
    const [liStatus,setLiStatus] = useState(1)
    const userId = getUser().userId

    useEffect(()=>{
        inputRef.current.focus()
        findAllMatFlowStatus(userId)
    },[])

    //点击类型选择
    const liStatusData = index => {
        setLiStatus(index)
    }

    const handSubmit = value => {
        const params={
            user:{id:userId},
            matflowName:value.matFlowName,
            matflowType:1,
            matflowCreateTime:moment.moment
        }
        createMatFlow(params).then(res=>{
            if(res.code===0 && res.data){
                props.history.push(`/index/config/${value.matFlowName}`)
            }else{
                message.error({content:"添加失败", className:"message"})
            }
        })
    }
    
    const renderLis = lis => {
        return lis.map((item,index) => {
            return (
                <div key={item.id}
                     onClick={()=>liStatusData(index+1)}
                     className={liStatus === index+1 ? "choose-item choose-active":"choose-item"}
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
                </div>
            )
        })
    }

    return(
        <div className="new">
            <div className="new-lump">
                <div className="new-lump-form">
                    <Form id="form" name="basic" onFinish={handSubmit} autoComplete="off">
                        <Form.Item
                            label="流水线名称"
                            name="matFlowName"
                            rules={[
                                {required:true,message:""},
                                {
                                    pattern: /^[\s\u4e00-\u9fa5a-zA-Z0-9_-]{0,}$/,
                                    message: "流水线名称不能包含非法字符，如&,%，&，#……等",
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value) {
                                            return Promise.reject("请输入名称")
                                        }
                                        let nameArray = []
                                        if(matFlowList){
                                            nameArray = matFlowList && matFlowList.map(item=>item.matFlowName);
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
                </div>
                <div  className="new-lump-type">
                    <div className="new-lump-type-choose">
                        {renderLis(lis)}
                    </div>
                </div>
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

export default inject("matFlowStore")(observer(MatFlowAdd))