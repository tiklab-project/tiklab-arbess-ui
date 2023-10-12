import React,{useEffect,useState} from "react";
import {Popconfirm, Select, Input, Form} from "antd";
import {
    DeleteOutlined,
    PlusCircleOutlined,
    CaretDownOutlined,
    CaretRightOutlined
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Btn from "../../../../../common/component/btn/Btn";
import ListEmpty from "../../../../../common/component/list/ListEmpty";
import {Validation} from "../../../../../common/utils/Client";
import "./Condition.scss";

/**
 * task的条件
 */
const Condition = props =>{

    const {dataItem,condStore} = props

    const {createCond,findTaskCond,updateCond,deleteCond} = condStore;

    const [formCond] = Form.useForm();
    // 条件数据
    const [condData,setCondData] = useState([]);
    // 下拉图标显示
    const [showArrow,setShowArrow] = useState(false);
    // 条件修改对象
    const [condObj,setCondObj] = useState(null)

    useEffect(()=>{
        // 初始化条件
        findCond()
    },[dataItem.taskId])

    useEffect(()=>{
        if(condObj){
            formCond.setFieldsValue(condObj)
        }
    },[condObj])

    /**
     * 获取条件
     */
    const findCond = () => {
        findTaskCond(dataItem.taskId).then(res=>{
            if(res.code===0){
                setCondData(res.data || [])
            }
        })
    }

    /**
     * 添加条件
     */
    const addCondition = () => {
        setCondObj({
            cond:"add",
        })
    }

    /**
     * 编辑条件
     */
    const editInput = item => {
        setCondObj({
            cond:"edit",
            condId:item.condId,
            condKey:item.condKey,
            condValue:item.condValue,
            condType:item.condType,
        })
    }

    /**
     * 删除条件
     */
    const reduceInput = (e,item) =>{
        e.stopPropagation();
        deleteCond(item.condId).then(res=>{
            if(res.code===0){
                findCond()
            }
        })
    }

    const onCancel = () =>{
        setCondObj(null)
    }

    /**
     * 更新条件
     */
    const onOk = item => {
        formCond.validateFields().then(value => {
            const {condType,condValue,condKey} = value
            if(item && item.condType===condType && item.condKey===condKey && item.condValue===condValue){
                onCancel()
                return;
            }
            update({
                ...value
            }).then()
        })
    }

    const update = async value =>{
        let Res;
        if(condObj.cond==='add'){
            Res = await createCond({
                ...value,
                taskId:dataItem.taskId,
            })
        } else {
            Res = await updateCond({
                ...value,
                condId:condObj.condId,
            })
        }
        if(Res.code===0){
            findCond()
            onCancel()
        }

    }

    const inputHtml = item =>(
        <Form
            form={formCond}
            layout={"vertical"}
            autoComplete={'off'}
            initialValues={{condType:"eq"}}
        >
            <Form.Item
                label={'名称'}
                name={'condKey'}
                rules={[
                    {required:true,message:'条件名不能为空'},
                    Validation("变量名"),
                    ({ getFieldValue }) => ({
                        validator(rule,value) {
                            let nameArray = []
                            if(item){
                                nameArray = condData && condData.map(list=>list.condKey).filter(list=>list!==item.condKey)
                            } else {
                                nameArray = condData && condData.map(list=>list.condKey)
                            }
                            if (nameArray.includes(value)) {
                                return Promise.reject("条件名已经存在");
                            }
                            return Promise.resolve()
                        },
                    }),
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label={'类别'}
                name={'condType'}
                rules={[{required:true,message:'条件类别不能为空'}]}
            >
                <Select
                    showArrow={showArrow}
                    onMouseEnter={()=>setShowArrow(true)}
                    onMouseLeave={()=>setShowArrow(false)}
                >
                    <Select.Option value={"eq"}>等于</Select.Option>
                    <Select.Option value={"neq"}>不等于</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label={'值'}
                name={'condValue'}
                rules={[{required:true,message:'条件值不能为空'}]}
            >
                <Input/>
            </Form.Item>
            <div className="inputs-condition-btn">
                <Btn onClick={()=>onCancel()} title={"取消"} isMar={true}/>
                <Btn onClick={()=>onOk(item)} title={"保存"} type={"primary"}/>
            </div>
        </Form>
    )

    const renderCondData = (item,index) =>{
        return(
            <div className="pose-condition-inputs" key={index}>
                <div className="inputs-condition"
                     onClick={()=>condObj?.condId === item.condId ? onCancel() : editInput(item)}
                >
                    <div className="inputs-condition-icon">
                        {
                            condObj?.condId === item.condId ?
                                <CaretDownOutlined />
                                :
                                <CaretRightOutlined />
                        }
                    </div>
                    <div className="inputs-condition-condKey">{item && item.condKey}</div>
                    <div className="inputs-condition-opt">
                        <span data-title-bottom="删除" onClick={e=>e.stopPropagation()}>
                            <Popconfirm
                                placement="bottomRight"
                                title={"你确定删除吗"}
                                okText="确定"
                                cancelText="取消"
                                onConfirm={e=>reduceInput(e,item)}
                            >
                                <DeleteOutlined />
                             </Popconfirm>
                        </span>
                    </div>
                </div>
                {
                    condObj?.condId === item.condId &&
                    <div className="inputs-condition-html">
                        { inputHtml(item) }
                    </div>
                }
            </div>
        )
    }

    return(
        <div className="pose-condition">
            <div className="pose-condition-up">
                <div>
                    <span style={{paddingRight:5}}>条件</span>
                    <span style={{fontSize:13}}>({condData && condData.length?condData.length:0}个)</span>
                </div>
                <Btn
                    title={"添加条件"}
                    type={"link-nopadding"}
                    icon={<PlusCircleOutlined/>}
                    onClick={()=>addCondition()}
                />
            </div>
            <div className="pose-condition-content">
                {condObj?.cond==='add' && inputHtml()}
                {
                    condData && condData.length > 0 ?
                    condData.map((item,index)=>renderCondData(item,index))
                    :
                    <ListEmpty title={"暂无条件"}/>
                }
            </div>
        </div>
    )
}

export default inject("condStore")(observer(Condition))
