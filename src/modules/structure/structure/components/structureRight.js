import React, {Fragment, useState} from "react";
import {Card,Spin} from 'antd'

import Structure_right_logDrawer from './Structure_right_logDrawer'
import StructureRight_execute from "./structureRight_execute";

const StructureRight = props =>{

    const {logList,rightData,rightExecute,details} = props

    
    const [visible,setVisible] = useState(false)
    const [drawer,setDrawer] = useState('')
    const [taskAlias,setTaskAlias] = useState('')

    const log = item => {
        console.log(item)
        // setDrawer(item.runLog)
        // setTaskAlias(item.taskAlias)
        // setVisible(true)
    }


    return(
        <div className='structure-content-right'>
            <div className='structure-content-right-mid'>
                {
                    details === 0 ?
                        <Fragment>
                            {
                                rightExecute.length === 0 ? ''
                                    :
                                    <StructureRight_execute
                                        rightExecute={rightExecute}
                                        logList={logList}
                                    />
                            }
                        </Fragment>
                        :
                        <Fragment>
                            {
                                rightData && rightData.map((item,index)=>{
                                    return(
                                        <Card className='structure-content-right-mid-cart' key={index}>
                                            <div className='cart-top'>
                                                {item.taskAlias} --
                                                <span style={{paddingLeft:5}}>hh</span>
                                            </div>
                                            <div className='cart-center'>
                                                <div className='cart-center-item'>
                                                    <div>状态</div>
                                                    <div>时间:</div>
                                                </div>
                                            </div>
                                            <div className='cart-bottom' >
                                        <span
                                            className='cart-bottom-span'
                                            onClick={()=>log(item)}
                                        >
                                            日志
                                        </span>
                                            </div>
                                        </Card>
                                    )
                                })
                            }

                        </Fragment>
                }

            </div>
            <Structure_right_logDrawer
                visible={visible}
                setVisible={setVisible}
                drawer={drawer}
                taskAlias={taskAlias}
            />
        </div>
    )
}

export default StructureRight