import React,{Component} from "react";
import {Button} from "antd";
import This_config from "./ThisConfig/this_config";
import Last_config from "./LastConfig/last_config";
import Filter_popUp from "./Filter_pop-up/Filter_pop-up";


class PastRecordsTask extends Component{
    state={
        visible:false
    }

    onclick = () =>{
        this.setState({
            visible:true,
        })
    }
    onCreate=values=>{
        console.log(values)
        this.setState({
            visible:false,
        })
    }
    render() {
        return(
             <div className='task-pastRecord'>
                <h1>更改记录</h1>
                <div className='task-pastRecord-btn'>
                    <Button type='primary' onClick={()=>this.props.history.push('/task/config')}>
                        返回
                    </Button>
                    <Button onClick={this.onclick}>
                        筛选
                    </Button>

                </div>
                <div className='task-pastRecord-h'>
                    <h2>本次构建</h2>
                    <h2>上次构建</h2>
                </div>
                <This_config/>
                <Last_config/>
                 <Filter_popUp
                     visible={this.state.visible}
                     onCreate={this.onCreate}
                 />
            </div>


        )
    }
}
export default PastRecordsTask