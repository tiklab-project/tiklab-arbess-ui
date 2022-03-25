import React,{Component} from 'react'
import { Radio,  Form, Space } from "antd";
import ConfigDetailsSourceCode_Git from "./configDetailsSourceCode_Git";
import ConfigDetailsSourceCode_Gitee from "./configDetailsSourceCode_Gitee"

class ConfigDetailsSourceCode extends Component{

    constructor(props) {
        super(props)
        this.state = {
            sourceRadio:this.props.sourceRadio,
            visible:false,
        }
    }

    //componentDidUpdate    会在1秒中后发生修改操作
    //shouldComponentUpdate     在组件被更新之前执行
    shouldComponentUpdate(nextProps, nextState, nextContext){
        if (nextProps.sourceRadio !== this.props.sourceRadio) {
            this.setState({sourceRadio:nextProps.sourceRadio})
            return true
        }
        return nextState.sourceRadio !== this.state.sourceRadio;
    }

    handlerRadio = e =>{
        this.setState({sourceRadio:e.target.value})
    }

    render() {

        const {sourceRadio}=this.state

        return(
            <div className='anchor-content' id='a'>
                <h2>源码管理</h2>
                <Form.Item name='codeType'>
                    <Radio.Group  onChange={this.handlerRadio} value={sourceRadio}>
                        <Space>
                            <Radio value={0}>无</Radio>
                            <Radio value={2} >通用Git</Radio>
                            <Radio value={3} >Gitee</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>

                {
                    sourceRadio===2 ?
                        <ConfigDetailsSourceCode_Git/>
                        :null
                }
                {
                    sourceRadio===3 ?
                        <ConfigDetailsSourceCode_Gitee
                            form={this.props.form}/>
                        :null
                }
            </div>
        )
    }
}

export default ConfigDetailsSourceCode