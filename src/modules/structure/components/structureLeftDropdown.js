import React ,{useState} from "react";
import { Select  } from 'antd';

const { Option } = Select;

const StructureLeftDropdown = props =>{

    const {findLikeHistory,setLeftData,setModeData,index,setIndex,setRightData,findHistoryLog} = props
    const pipelineId = localStorage.getItem('pipelineId')
    const [state,setState] = useState(0)
    const [enforcer,setEnforcer] = useState(null)
    const [mode,setMode] = useState(0)

    let params = null
    const change = () =>{
        findLikeHistory(params).then(res=>{
            const data = res.data
            console.log(res)
            if(data.length !== 0){
                setModeData(res.data && res.data[0])
                findHistoryLog(res.data && res.data[0].historyId).then(response=>{
                    setLeftData([...data])
                    if(index!==0){
                        setRightData([...response.data])
                        setIndex(1)
                    }
                })
            } else {
                setLeftData([])
                if(index!==0){
                    setRightData([])
                    setIndex(1)
                }
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    const changeState = (value,e) =>{
        setState(e.key)
        params = {
            pipelineId:pipelineId,
            state:e.key,
            name:enforcer,
            type:mode,
        }
        change()
    }

    const changeEnforcer = (value,e) =>{
        if(value==='全部'){
            value=null
        }
        setEnforcer(value)
        params = {
            pipelineId:pipelineId,
            state:state,
            name:value,
            type:mode,
        }
        change()
    }

    const changeMode = (value,e) =>{
        setMode(e.key)
        params = {
            pipelineId:pipelineId,
            state:state,
            name:enforcer,
            type:e.key,
        }
        change()
    }

    //状态
    const stateList = [
        {   type:0,
            tpl:'全部',
        },
        {
            type:1,
            tpl:'失败',
        },
        {
            type:20,
            tpl:'停止',
        },
        {
            type:30,
            tpl:'成功',
        },
    ]
    //执行人
    const enforcerList = [
        {   type:0,
            tpl:'全部',
        },
        {
            type:1,
            tpl:'admin',
        },
    ]
    //执行方式
    const modeList = [
        {   type:0,
            tpl:'全部',
        },
        {
            type:1,
            tpl:'手动',
        },
        {
            type:2,
            tpl:'自动',
        },
    ]

    return(
        <div className='structure-content-left-dropdown'>
            <div className='dropdown'>
                <Select  style={{width:110,marginRight:10}} defaultValue='状态'
                         onChange={(value,e)=>changeState(value,e)}
                >
                    {
                        stateList.map(item=>{
                            return <Option key={ item.type } value= {item.tpl}>{item.tpl}</Option>
                        })
                    }
                </Select>
                <Select  style={{width:110,marginRight:10}}  defaultValue='执行人'
                         onChange={(value,e)=>changeEnforcer(value,e)}
                >
                    {
                        enforcerList.map(item=>{
                            return <Option key={ item.type } value= {item.tpl}>{item.tpl}</Option>
                        })
                    }
                </Select>
                <Select  style={{width:110,marginRight:10}}  defaultValue='执行方式'
                         onChange={(value,e)=>changeMode(value,e)}
                >
                    {
                        modeList.map(item=>{
                            return <Option key={ item.type } value= {item.tpl}>{item.tpl}</Option>
                        })
                    }
                </Select>
            </div>
        </div>
    )
}

export default StructureLeftDropdown