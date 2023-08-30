import React,{useEffect,useState} from "react";
import {Popconfirm, Select, Space} from "antd";
import {
    DeleteOutlined,
    PlusCircleOutlined,
    CaretDownOutlined,
    CaretRightOutlined
} from "@ant-design/icons";
import {Input} from "antd";
import condStore from "../store/ConditionStore";
import Btn from "../../../../../common/btn/Btn";
import EmptyText from "../../../../../common/emptyText/EmptyText";
import "./Condition.scss";

/**
 * task的条件
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Condition = props =>{

    const {dataItem} = props

    const {createCond,findAllTaskCond,updateCond,deleteCond} = condStore

    const [condData,setCondData] = useState([]);

    const [showArrow,setShowArrow] = useState(false);

    const [condObj,setCondObj] = useState({})

    useEffect(()=>{
        // 初始化条件
        findCond()
    },[dataItem.taskId])

    const findCond = () => {
        // 初始化条件
        findAllTaskCond(dataItem.taskId).then(res=>{
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
            condKey: "COND_NAME",
            condValue: "${COND_VALUE}",
            condType:1
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

    /**
     * 更新值
     * @param e
     * @param type
     */
    const changeCond = (e,type) => {
        setCondObj({
            ...condObj,
            [type]:type==='condType'? e:e.target.value
        })
    }

    const onCancel = () =>{
        setCondObj({})
    }

    /**
     * 更新条件
     */
    const onOk = item => {
        const {condType,condValue,condKey} = condObj
        if(condValue.trim()==='' || condKey.trim()==='' ){
            return
        }
        if(item && item.condType===condType && item.condKey===condKey && item.condValue===condValue){
            onCancel()
            return;
        }
        update({
            condType,
            condValue,
            condKey,
        })
    }

    const update = value =>{
        if(condObj.cond==='add'){
            createCond({
                taskId:dataItem.taskId,
                ...value
            }).then(res=>{
                if(res.code===0){
                    findCond()
                    onCancel()
                }
            })
            return
        }
        updateCond({
            condId:condObj.condId,
            ...value
        }).then(res=>{
            if(res.code===0){
                findCond()
                onCancel()
            }
        })
    }

    const inputHtml = item =>(
        <>
            <div className="inputs-condition-key">
                <div className="inputs-condition-title">名称</div>
                <Input
                    placeholder={"名称"}
                    defaultValue={condObj && condObj.condKey}
                    onChange={e=>changeCond(e,'condKey')}
                />
                {
                    condObj?.condKey.trim()==="" && <div className="inputs-error">条件名称不能为空</div>
                }
            </div>
            <div className="inputs-condition-type">
                <div className="inputs-condition-title">类别</div>
                <Select
                    showArrow={showArrow}
                    onMouseEnter={()=>setShowArrow(true)}
                    onMouseLeave={()=>setShowArrow(false)}
                    defaultValue={condObj.condType}
                    style={{width:"100%"}}
                    onChange={e=>changeCond(e,'condType')}
                >
                    <Select.Option value={1}>等于</Select.Option>
                    <Select.Option value={2}>不等于</Select.Option>
                </Select>
            </div>
            <div className="inputs-condition-value">
                <div className="inputs-condition-title">值</div>
                <Input
                    placeholder={"值"}
                    defaultValue={condObj && condObj.condValue}
                    onChange={e=>changeCond(e,'condValue')}
                />
                {
                    condObj?.condValue.trim()==="" && <div className="inputs-error">条件值不能为空</div>
                }
            </div>
            <div className="inputs-condition-btn">
                <Btn onClick={()=>onCancel()} title={"取消"} isMar={true}/>
                <Btn onClick={()=>onOk(item)} title={"保存"} type={"primary"}/>
            </div>
        </>
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
                    <EmptyText title={"暂无条件"}/>
                }
            </div>
        </div>
    )
}

export default Condition
