import React from 'react'


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
                <div style="width: 25px; height: 25px; line-height: 25px; border-radius: 32px; text-align: center; color: #fff;">
                    ${title}
                </div>
                <div style="flex:1;margin: 0 15px">
                    <div>
                        ${userName} 创建了流水线
                    </div>
                    <div style="display:flex; align-items:center;height: 40px">
                        <div style="width: 20px; height: 20px; margin-right: 10px;border-radius: 5px">
                            <img src="${img}" alt="" style="width: 100%; height:100%"/>
                        </div>
                        <div>
                            ${pipelineName}
                        </div>
                    </div>
                </div>
                <div style="font-size: 13px">${createTime}</div>
            </div>
        case '流水线删除':
            return <div style="display: flex;justify-content: flex-start; align-items:center">
                <div style="width: 25px; height: 25px; line-height: 25px; border-radius: 32px; text-align: center; color: #fff;">
                    ${title}
                </div>
                <div style="flex:1;margin: 0 15px">
                    <div>
                        ${userName} 删除了流水线
                    </div>
                    <div style="display:flex; align-items:center;height: 40px">
                        <div style="width: 20px; height: 20px; margin-right: 10px;border-radius: 5px">
                            <img src="${img}" alt="" style="width: 100%; height:100%"/>
                        </div>
                        <div>
                            ${pipelineName}
                        </div>
                    </div>
                </div>
                <div style="font-size: 13px">${createTime}</div>
            </div>
        case '流水线运行':
            return <div style="display: flex;justify-content: flex-start; align-items:center">
                <div style="width: 25px; height: 25px; line-height: 25px; border-radius: 32px; text-align: center; color: #fff;">
                    ${title}
                </div>
                <div style="flex:1;margin: 0 15px">
                    <div>
                        ${userName} 运行流水线
                    </div>
                    <div style="display:flex; align-items:center;height: 40px">
                        <div style="width: 20px; height: 20px; margin-right: 10px;border-radius: 5px">
                            <img src="${img}" alt="" style="width: 100%; height:100%"/>
                        </div>
                        <div>
                            ${pipelineName}-->${message}
                        </div>
                    </div>
                </div>
                <div style="font-size: 13px">${createTime}</div>
            </div>
        case '流水线更新':
            return <div style="display: flex;justify-content: flex-start; align-items:center">
                <div style="width: 25px; height: 25px; line-height: 25px; border-radius: 32px; text-align: center; color: #fff;">
                    ${title}
                </div>
                <div style="flex:1;margin: 0 15px">
                    <div>
                        ${userName} 更新流水线
                    </div>
                    <div style="display:flex; align-items:center;height: 40px">
                        <div style="width: 20px; height: 20px; margin-right: 10px;border-radius: 5px">
                            <img src="${img}" alt="" style="width: 100%; height:100%"/>
                        </div>
                        <div>
                            ${pipelineName}-->${message}
                        </div>
                    </div>
                </div>
                <div style="font-size: 13px">${createTime}</div>
            </div>
    }
}
