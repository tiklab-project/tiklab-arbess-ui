/*
    开始构建
 */

import React,{Component} from 'react'
import {Button, Modal} from "antd";
import SourceCode from "./sourceCode";
import Structure from "./structure";
import Action from "./action";

class ConfigTask extends Component{
    state={
        isModalVisible:false
    }
    showModal=()=>{
        this.setState({
            isModalVisible:true
        })
    }
    handleOk=()=>{
        this.props.history.push('/task/post')
        this.setState({
            isModalVisible:false
        })
    }
    handleCancel=()=>{
        this.setState({
            isModalVisible:false
        })
    }
    //锚点链接
    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if(anchorElement){
                anchorElement.scrollIntoView({block: 'start', behavior: 'smooth'});
            }
        }
    }
    render() {
        return(
            <div className='task-config'>
                <div  className='task-config-top'>
                    <div className='task-config-top-btn'>
                        <Button onClick={this.showModal}>过往记录</Button>
                        <Modal
                            title="是否离开"
                            visible={this.state.isModalVisible}
                            closable={false}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            okText='保存'
                            cancelText='取消'
                        >
                           你所做的更改可能未保存
                        </Modal>
                    </div>
                    <div className='task-config-top-a'>
                        <a  onClick={()=>this.scrollToAnchor('sourceCode')}>源码管理</a>
                        <a  onClick={()=>this.scrollToAnchor('structure')}>构建</a>
                        <a  onClick={()=>this.scrollToAnchor('action')}>构建后管理</a>
                    </div>
                </div>
                <div className='task-config-bottom'>
                    <div className='task-config-bottom-sourceCode'>
                        <h1 id='sourceCode'>源码管理</h1>
                        <SourceCode/>
                    </div>
                    <div className='task-config-bottom-structure'>
                        <h1 id='structure'>构建</h1>
                        <Structure/>
                    </div>
                    <div className='task-config-bottom-action'>
                        <h1 id='action'>构建后管理</h1>
                        <Action/>
                    </div>
                    <div className='task-config-bottom-btn'>
                        <Button onClick={()=>this.props.history.push('/task/work')}>保存</Button>
                        <Button onClick={()=>this.props.history.push('/task/work')}>取消</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default ConfigTask