import React from 'react';
import './GaugeChart.scss';

/**
 * 图标 -- 运行统计
 * @param props
 * @returns {Element}
 * @constructor
 */
const GaugeChart = props =>{

    const {runResult} = props

    return (
        <div className='gauge-statistics'>
            {
                ['allNumber','successNumber','errorNumber','execTime','successRate'].map(key=>{
                    let rotateStyle = {"transform": 'rotate(0deg)'};
                    if (!runResult?.[key]) {
                        rotateStyle = {"transform": 'rotate(180deg)'};
                    } else if (key === 'successNumber' || key === 'errorNumber') {
                        if (!runResult?.allNumber || runResult.allNumber === 0) {
                            rotateStyle = {"transform": 'rotate(180deg)'};
                        } else {
                            const data = (runResult?.[key] / runResult?.allNumber) * 180 - 180;
                            rotateStyle = {"transform": `rotate(${data}deg)`};
                        }
                    }
                    return (
                        <div className='statistics-result' key={key}>
                            <div className='statistics-result-title'>
                                {
                                    key === 'allNumber' && '运行次数' ||
                                    key === 'successNumber' && '成功数' ||
                                    key === 'errorNumber' && '失败数' ||
                                    key === 'execTime' && '平均时长' ||
                                    key === 'successRate' && '成功率'
                                }
                            </div>
                            <div className="statistics-result-box">
                                <div className="statistics-result-top">
                                    <div className="statistics-result-process" style={{...rotateStyle}}></div>
                                    <div className={`statistics-result-data statistics-result-text-${key}`} title={runResult?.[key]}>
                                        {runResult?.[key]||'0'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default GaugeChart
