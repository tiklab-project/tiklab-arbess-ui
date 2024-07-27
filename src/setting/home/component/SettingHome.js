import React, {useState,useEffect} from "react";
import {Row,Col} from "antd";
import countStore from "../store/CountStore";
import {applyJump} from "thoughtware-core-ui";
import "./SettingHome.scss";

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
                return applyJump(`${authConfig.authServiceUrl}/#/user/${path}`)
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
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "16", offset: "4" }}
            >
                <div className='mf-home-limited'>
                    {
                        version==='cloud' ? null
                            // <div className='home-role-box'>
                            //     <div className='home-title'>权限</div>
                            //     <div className='home-role'>
                            //         <div className='home-role-item' onClick={()=>goPath('role')}>
                            //             <div className='home-label'>权限</div>
                            //             <div className='home-info'>
                            //                 {count?.roleNumber || 0}
                            //             </div>
                            //         </div>
                            //     </div>
                            // </div>
                            :
                            <div className='home-user-box'>
                                <div className='home-title'>用户与权限</div>
                                <div className='home-user'>
                                    <div className='home-user-item' onClick={()=>goPath('orga')}>
                                        <div className='home-label'>部门</div>
                                        <div className='home-info'>
                                            {count?.orgaNumber || 0}
                                        </div>
                                    </div>
                                    <div className='home-user-item' onClick={()=>goPath('user')}>
                                        <div className='home-label'>用户</div>
                                        <div className='home-info'>
                                            {count?.userNumber || 0}
                                        </div>
                                    </div>
                                    <div className='home-user-item' onClick={()=>goPath('userGroup')}>
                                        <div className='home-label'>用户组</div>
                                        <div className='home-info'>
                                            {count?.userGroupNumber || 0}
                                        </div>
                                    </div>
                                    <div className='home-user-item' onClick={()=>goPath('role')}>
                                        <div className='home-label'>权限</div>
                                        <div className='home-info'>
                                            {count?.roleNumber || 0}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                    <div className='home-message-box'>
                        <div className='home-title'>消息</div>
                        <div className='home-message'>
                            <div className='home-message-item' onClick={()=>goPath('notice')}>
                                <div className='home-label'>消息通知方案</div>
                                <div className='home-info'>
                                    {count?.noticeNumber || 0}
                                </div>
                            </div>
                            <div className='home-message-item' onClick={()=>goPath('send')}>
                                <div className='home-label'>消息发送方式</div>
                                <div className='home-info'>
                                    {count?.sendTypeNumber || 0}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='home-config-box'>
                        <div className='home-title'>流水线配置</div>
                        <div className='home-config'>
                            <div className='home-config-item'>
                                <div className='home-config-item-label'>基本配置</div>
                                <div className='home-config-item-level' onClick={()=>goPath('grouping')}>
                                    <div className='config-level-item'>
                                        <div className='config-level-item-label'>分组</div>
                                        <div className='config-level-item-info'>{count?.groupNumber || 0}</div>
                                    </div>
                                    <div className='config-level-item'>
                                        <div className='config-level-item-label'>环境</div>
                                        <div className='config-level-item-info'>{count?.envNumber || 0}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='home-config-item' >
                                <div className='home-config-item-label'>
                                    主机配置
                                </div>
                                <div className='home-config-item-level' onClick={()=>goPath('hostGroup')}>
                                    <div className='config-level-item' >
                                        <div className='config-level-item-label'>主机组</div>
                                        <div className='config-level-item-info'>{count?.hostGroupNumber || 0}</div>
                                    </div>
                                    <div className='config-level-item'>
                                        <div className='config-level-item-label'>主机</div>
                                        <div className='config-level-item-info'>{count?.hostNumber || 0}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='home-config-item'>
                                <div className='home-config-item-label'>认证配置</div>
                                <div className='home-config-item-level' onClick={()=>goPath('auth')}>
                                    <div className='config-level-item'>
                                        <div className='config-level-item-label'>认证</div>
                                        <div className='config-level-item-info'>{count?.authNumber || 0}</div>
                                    </div>
                                    <div className='config-level-item'>
                                        <div className='config-level-item-label'>工具</div>
                                        <div className='config-level-item-info'>{count?.scmNumber || 0}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='home-config-item' onClick={()=>goPath('server')}>
                                <div className='home-config-item-label'>服务集成</div>
                                <div className='home-config-item-level'>
                                    <div className='config-level-item-label'>服务集成</div>
                                    <div className='config-level-item-info'>{count?.serverNumber || 0}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        version !== 'cloud' &&
                        <div className='home-licence-box'>
                            <div className='home-title'>应用</div>
                            <div className='home-licence'>
                                <div className='home-licence-item' onClick={()=>goPath('version')}>
                                    <div className='home-licence-item-label'>版本与许可证</div>
                                    <div className='home-licence-item-level'>
                                        <div className='licence-level-label'>版本类型</div>
                                        <div className='licence-level-info'>{count?.version ? '社区版' : '企业版'}</div>
                                    </div>
                                </div>
                                <div className='home-licence-item' onClick={()=>goPath('productAuth')}>
                                    <div className='home-licence-item-label'>应用访问权限</div>
                                    <div className='home-licence-item-level'>
                                        <div className='licence-level-label'>已授权</div>
                                        <div className='licence-level-info'>{count?.applyAuthNumber || 0}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {/*<div className='home-security-box'>*/}
                    {/*    <div className='home-title'>安全</div>*/}
                    {/*    <div className='home-security'>*/}
                    {/*        <div className='home-security-item' onClick={()=>goPath('backups')}>*/}
                    {/*            <div className='home-security-item-label'>备份与恢复</div>*/}
                    {/*            <div className='home-security-item-level'>*/}
                    {/*                <div className='security-level-label'>上次备份时间</div>*/}
                    {/*                <div className='security-level-info' title={count?.lastBackupsTime}>{count?.lastBackupsTime || '--'}</div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </Col>
        </Row>
    )
};

export default SettingHome;
