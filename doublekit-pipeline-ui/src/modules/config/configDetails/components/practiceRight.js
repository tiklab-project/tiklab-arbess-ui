import React ,{useState,useEffect} from "react";
import {Button, Form, Input} from "antd";
import PracticeRight_code from "./practiceRight_code";
import PracticeRight_test from "./practiceRight_test";
import PracticeRight_maven from "./practiceRight_maven";
import PracticeRight_node from "./practiceRight_node";
import PracticeRight_linux from "./practiceRight_linux";
import PracticeRight_docker from "./practiceRight_docker";
import {CloseOutlined,EditOutlined} from "@ant-design/icons";

const PracticeRight = props =>{

    const {data,codeData,setNewStageVisible,setCodeVisible,setChangeSortVisible,setDrawer,
    } = props

    const [step,setStep] = useState(true)

    const changeConfigSorts = () => {
        setChangeSortVisible(true)
    }

    const changeStep = (group) =>{
        console.log(group)
        setStep(true)
    }

    const displayInput = (group,index) =>{
        setStep(false)
    }

    const deletePart = (group,index) =>{

    }

    const inputContent = group =>{
        if(group){
            switch (group.desc){
                case '单元测试':
                    return <PracticeRight_test/>
                case 'maven':
                    return <PracticeRight_maven/>
                case 'node':
                    return <PracticeRight_node/>
                case 'linux':
                    return <PracticeRight_linux/>
                case 'docker':
                    return <PracticeRight_docker/>
            }
        }
    }

    const newStage = () =>{

        console.log('data',data)

        return  data && data.map((group,index)=>{
                    return(
                        <div className='config-details-wrapper' key={index}>
                            <div
                                className='config-details-Headline'
                            >
                                {
                                    step ?    <div style={{display:"inline"}}>{group.step}</div>
                                        :    <Input
                                                 style={{width:100}}
                                             />
                                }
                                &nbsp; &nbsp;
                                <span onClick={()=>displayInput(group,index)}>
                                    <EditOutlined />
                                </span>
                            </div>
                            <div className='config-details-newStage'>
                                <div className='desc'>
                                    <div className='desc-head'>{group.desc}</div>
                                    <div
                                        id='del'
                                        className='desc-delete'
                                        onClick={()=>deletePart(group,index)}
                                    >
                                        <CloseOutlined />
                                    </div>
                                </div>
                                <div className='desc-input'>
                                    {
                                        inputContent(group)
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
    }

    const b = ( ) => {
        setNewStageVisible(true)
        setDrawer('large')
    }

    return(
        <div className='config-details-right'>
            <div className='config-details-right-all'>
                <div style={{textAlign:'right'}}>
                    <Button onClick={changeConfigSorts}>更改配置顺序</Button>
                </div>
                <div>
                    <Form  layout='vertical'>
                        <PracticeRight_code
                            codeData={codeData}
                            setCodeVisible={setCodeVisible}
                        />
                        { newStage()}
                    </Form>
                </div>

                <div className='config-details-tail'>
                    <div className='config-details-Headline'>新阶段</div>
                    <div className='config-details-handle' onClick={b}>新任务</div>
                </div>

            </div>
        </div>
    )
}

export default PracticeRight