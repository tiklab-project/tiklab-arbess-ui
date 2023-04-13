import React from 'react'

/**
 * 日志模板
 * @param type
 * @returns {JSX.Element}
 * @constructor
 */
const Template_log = ({type}) =>{
    switch (type) {
        case '配置创建':
            return <div style="display: flex;justify-content: flex-start; align-items:center">
                <div style="width: 20px; height: 20px;">
                    <img src="${img}" alt="" style="width: 100%; height:100%"/>
                </div>
                <div style="flex:1;margin: 0 15px">
                    <div style="padding-bottom:5px;font-size:13px;font-weight:bold">
                        ${title}
                    </div>
                    <div>
                        <span style="color: #5d70ea">${user}</span>
                        <span>添加了</span>
                        <span style="color: #5d70ea">${pipelineName}</span>的${message}
                    </div>
                </div>
            </div>
        case '配置删除':
            return  <div style="display: flex;justify-content: flex-start; align-items:center">
                <div style="width: 20px; height: 20px;">
                    <img src="${img}" alt="" style="width: 100%; height:100%"/>
                </div>
                <div style="flex:1;margin: 0 15px">
                    <div style="padding-bottom:5px;font-size:13px;font-weight:bold">
                        ${title}
                    </div>
                    <div>
                        <span style="color: #5d70ea">${user}</span>
                        <span>删除了</span>
                        <span style="color: #5d70ea">${pipelineName}</span>的${message}
                    </div>
                </div>
            </div>
        case '流水线创建':
            return <div style="display: flex;justify-content: flex-start; align-items:center">
                <div style="width: 20px; height: 20px;">
                    <img src="${img}" alt="" style="width: 100%; height:100%"/>
                </div>
                <div style="flex:1;margin: 0 15px">
                    <div style="padding-bottom:5px;font-size:13px;font-weight:bold">
                        ${title}
                    </div>
                    <div>
                        <span style="color: #5d70ea">${userName}</span>
                        <span>创建了流水线</span>
                        <span style="color: #5d70ea">${pipelineName}</span>
                    </div>
                </div>
            </div>
        case '流水线删除':
            return <div style="display: flex;justify-content: flex-start; align-items:center">
                <div style="width: 20px; height: 20px;">
                    <img src="${img}" alt="" style="width: 100%; height:100%"/>
                </div>
                <div style="flex:1;margin: 0 15px">
                    <div style="padding-bottom:5px;font-size:13px;font-weight:bold">
                        ${title}
                    </div>
                    <div>
                        <span style="color: #5d70ea">${userName}</span>
                        <span>删除了流水线</span>
                        <span style="color: #5d70ea">${pipelineName}</span>
                    </div>
                </div>
            </div>
        case '流水线运行':
            return <div style="display: flex;justify-content: flex-start; align-items:center;">
                <div style="width: 20px; height: 20px;">
                    <img src="${img}" alt="" style="width: 100%; height:100%"/>
                </div>
                <div style="flex:1;margin: 0 15px">
                    <div style="padding-bottom:5px;font-size:13px;font-weight:bold">
                        ${title}
                    </div>
                    <div>
                        流水线<span style="color: #5d70ea">${pipelineName}</span>${message}
                    </div>
                </div>
            </div>
        case '流水线更新':
            return <div style="display: flex;justify-content: flex-start; align-items:center;">
                <div style="width: 20px; height: 20px;">
                    <img src="${img}" alt="" style="width: 100%; height:100%"/>
                </div>
                <div style="flex-grow:1;margin: 0 15px">
                    <div style="padding-bottom:5px;font-size:13px;font-weight:bold">
                        ${title}
                    </div>
                    <div>
                        <span  style="color: #5d70ea">${userName}</span>
                        <span>更新了流水线 ${message}</span>
                    </div>
                </div>
            </div>
    }
}
