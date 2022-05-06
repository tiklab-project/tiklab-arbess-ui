import React from "react";
import { Button } from "antd";
import './config_changeView.scss'

const Config_changeView = props =>{

    const {view,setView} = props

    return (
        <div className='config_changeView'>
            <div className='changeView'>
                <div>
                    <Button
                        form='form'
                        htmlType='submit'
                    >
                        保存
                    </Button>
                    <Button type='primary'>保存并运行</Button>
                </div>
                <div
                    onClick={()=>setView(0)}
                    className={view ===0 ? 'view view-link' : 'view' }
                >
                    视图1
                </div>
                <div
                    onClick={()=>setView(1)}
                    className={view ===1 ? 'view view-link' : 'view' }
                >
                    视图2
                </div>
            </div>
        </div>
    )
}

export default Config_changeView