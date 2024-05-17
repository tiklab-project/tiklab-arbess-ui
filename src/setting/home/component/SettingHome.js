import React, {useState,useEffect} from "react";
import {Row,Col} from "antd";
import countStore from "../store/CountStore";
import "./SettingHome.scss";
import {applyJump} from "thoughtware-core-ui";

const SettingHome = props => {

    const {findCount} = countStore;

    const [count,setCount] = useState({})

    useEffect(()=>{
        findCount().then(res=>{
            if(res.code===0){
                setCount(res.data)
            }
        })
    },[])

    /**
     * 路由跳转
     */
    const li = ['orga','user','userGroup','dir'];
    const goPath = path => {
        const authConfig = JSON.parse(localStorage.getItem("authConfig"))
        if(!authConfig.authType){
            const isAuth = li.some(item => item===path)
            if(isAuth){
                return applyJump(`${authConfig.authServiceUrl}/#/setting/${path}`)
            }
        }
        props.history.push(`/setting/${path}`)
    }

    return (
        <Row className='setting-home'>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "21", offset: "1" }}
                xxl={{ span: "20", offset: "2" }}
            >
                <div className='mf-home-limited'>
                    <div className='setting-home-chunk'>
                        <div className='home-title'>用户与权限</div>
                        <div className='home-chunk'>
                            {
                                version==='ce' &&
                                <>
                                    <div className='home-chunk-item' onClick={()=>goPath('orga')}>
                                        <div className='label-one'>部门</div>
                                        <div className='info-one'>
                                            {count?.orgaNumber || 0}
                                        </div>
                                    </div>
                                    <div className='home-chunk-item' onClick={()=>goPath('user')}>
                                        <div className='label-one'>用户</div>
                                        <div className='info-one'>
                                            {count?.userNumber || 0}
                                        </div>
                                    </div>
                                    <div className='home-chunk-item' onClick={()=>goPath('userGroup')}>
                                        <div className='label-one'>用户组</div>
                                        <div className='info-one'>
                                            {count?.userGroupNumber || 0}
                                        </div>
                                    </div>
                                    <div className='home-chunk-item' onClick={()=>goPath('dir')}>
                                        <div className='label-one'>用户目录</div>
                                        <div className='info-one'>
                                            {count?.userDirNumber || 0}
                                        </div>
                                    </div>
                                </>
                            }
                            <div className='home-chunk-item' onClick={()=>goPath('role')}>
                                <div className='label-one'>权限</div>
                                <div className='info-one'>
                                    {count?.roleNumber || 0}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='setting-home-chunk'>
                        <div className='home-title'>消息</div>
                        <div className='home-chunk'>
                            <div className='home-chunk-item' onClick={()=>goPath('notice')}>
                                <div className='label-one'>消息通知方案</div>
                                <div className='info-one'>
                                    {count?.noticeNumber || 0}
                                </div>
                            </div>
                            <div className='home-chunk-item' onClick={()=>goPath('send')}>
                                <div className='label-one'>消息发送方式</div>
                                <div className='info-one'>
                                    {count?.sendTypeNumber || 0}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='setting-home-chunk'>
                        <div className='home-title'>流水线配置</div>
                        <div className='home-chunk'>
                            <div className='home-chunk-item' >
                                <div className='home-chunk-label'>基本配置</div>
                                <div className='home-chunk-info home-chunk-wrap' onClick={()=>goPath('grouping')}>
                                    <div className='home-chunk-wrap-inline'>
                                        <div className='home-chunk-desc'>分组</div>
                                        <div className='home-chunk-length'>{count?.groupNumber || 0}</div>
                                    </div>
                                    <div className='home-chunk-wrap-inline'>
                                        <div className='home-chunk-desc'>环境</div>
                                        <div className='home-chunk-length'>{count?.envNumber || 0}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='home-chunk-item' >
                                <div className='home-chunk-label'>主机配置</div>
                                <div className='home-chunk-info home-chunk-wrap' onClick={()=>goPath('hostGroup')}>
                                    <div className='home-chunk-wrap-inline' >
                                        <div className='home-chunk-desc'>主机组</div>
                                        <div className='home-chunk-length'>{count?.hostGroupNumber || 0}</div>
                                    </div>
                                    <div className='home-chunk-wrap-inline'>
                                        <div className='home-chunk-desc'>主机</div>
                                        <div className='home-chunk-length'>{count?.hostNumber || 0}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='home-chunk-item'>
                                <div className='home-chunk-label'>认证配置</div>
                                <div className='home-chunk-info home-chunk-wrap' onClick={()=>goPath('auth')}>
                                    <div className='home-chunk-wrap-inline'>
                                        <div className='home-chunk-desc'>认证</div>
                                        <div className='home-chunk-length'>{count?.authNumber || 0}</div>
                                    </div>
                                    <div className='home-chunk-wrap-inline'>
                                        <div className='home-chunk-desc'>工具</div>
                                        <div className='home-chunk-length'>{count?.scmNumber || 0}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='home-chunk-item' onClick={()=>goPath('server')}>
                                <div className='home-chunk-label'>服务集成</div>
                                <div className='home-chunk-info'>
                                    <div className='home-chunk-desc'>服务集成</div>
                                    <div className='home-chunk-length'>{count?.serverNumber || 0}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        version==='ce' &&
                        <div className='setting-home-chunk'>
                            <div className='home-title'>应用与安全</div>
                            <div className='home-chunk'>
                                <div className='home-chunk-item' onClick={()=>goPath('backups')}>
                                    <div className='home-chunk-label'>备份与恢复</div>
                                    <div className='home-chunk-info'>
                                        <div className='home-chunk-desc'>上次备份时间</div>
                                        <div className='home-chunk-length'>{count?.lastBackupsTime || '无'}</div>
                                    </div>
                                </div>
                                <div className='home-chunk-item' onClick={()=>goPath('version')}>
                                    <div className='home-chunk-label'>版本与许可证</div>
                                    <div className='home-chunk-info'>
                                        <div className='home-chunk-desc'>版本类型</div>
                                        <div className='home-chunk-length'>{count?.version ? '社区版' : '企业版'}</div>
                                    </div>
                                </div>
                                <div className='home-chunk-item' onClick={()=>goPath('productAuth')}>
                                    <div className='home-chunk-label'>应用访问权限</div>
                                    <div className='home-chunk-info'>
                                        <div className='home-chunk-desc'>已授权</div>
                                        <div className='home-chunk-length'>{count?.applyAuthNumber || 0}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Col>
        </Row>
    )
};

export default SettingHome;
