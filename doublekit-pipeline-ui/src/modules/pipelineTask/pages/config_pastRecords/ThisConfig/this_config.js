import React,{Component} from "react";

class This_config extends Component{
    render() {
        return(
            <div className='this-config'>
                <div className='task-pastRecord-config-left'>更改人</div>
                <div className='task-pastRecord-config-right '>admin</div>

                <div className='task-pastRecord-config-left '>更改时间</div>
                <div className='task-pastRecord-config-right '> 2022年1月11：41：42</div>

                <div className='task-pastRecord-config-left '>状态</div>
                <div className='task-pastRecord-config-right '>成功</div>

                <div className='task-pastRecord-config-deploy'>源码管理</div>
                <div className='task-pastRecord-config-res'> git@192.168.2.101:devops/doublekit-jtest.git</div>

                <div className='task-pastRecord-config-deploy'>构建</div>
                <div className='task-pastRecord-config-res'>clean install package</div>

                <div className='task-pastRecord-config-deploy'>部署</div>
                <div className='task-pastRecord-config-res'> D:\idea\doublekit</div>
            </div>
        )
    }
}
export default This_config