/**
 * @Description: 系统设置首页
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React, {useState,useEffect} from "react";
import {Row,Col} from "antd";
import countStore from "../store/CountStore";
import {applyJump,applySubscription,getUser} from "tiklab-core-ui";
import overviewStore from "../../../pipeline/overview/store/OverviewStore";
import vipLight from '../../../assets/images/vip-light.png';
import vipDark from '../../../assets/images/vip-dark.png';
import "./SettingHome.scss";
import moment from "moment";
import {
    ApartmentOutlined,
    UserOutlined,
    MessageOutlined,
    GroupOutlined,
    ScheduleOutlined,
    InsertRowBelowOutlined,
    VerifiedOutlined,
    ToolOutlined,
    AlertOutlined,
    CloudOutlined,
    HistoryOutlined,
    LaptopOutlined,
    DesktopOutlined,
} from "@ant-design/icons"

const SettingHome = props => {

    const {findCount,findHomesApplyProduct,findUseLicence} = countStore;
    const {findlogpage} = overviewStore;

    //系统设置统计数据
    const [count,setCount] = useState({});
    //当前版本
    const [licence,setLicence] = useState(null);
    //操作日志
    const [log,setLog] = useState(null);

    useEffect(()=>{
        //获取系统设置统计数据
        findCount().then(res=>{
            if(res.code===0){
                setCount(res.data)
            }
        })
        if(version==='cloud'){
            //获取日志
            findlogpage({
                pageParam: {pageSize: 1, currentPage: 1},
                userId:getUser().userId
            }).then(res=>{
                if(res.code===0){
                    setLog(res.data)
                }
            })
            //获取版本
            findHomesApplyProduct().then(res=>{
                if(res.code===0){
                    setLicence(res.data)
                }
            })
        } else {
            //获取版本
            findUseLicence().then(res=>{
                if(res.code===0){
                    setLicence(res.data)
                }
            })
        }
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
                return applyJump(`${authConfig.authServiceUrl}/#/${version==='cloud'?'enterprise':'setting'}/${path}`)
            }
        }
        props.history.push(`/setting/${path}`)
    }

    /**
     * 去授权
     * @returns {WindowProxy}
     */
    const goAuth = () => {
        if(version==='cloud'){
            return applyJump('https://work.cloud.tiklab.net/#/enterprise/auth/arbess')
        }
        props.history.push(`/setting/productAuth`)
    }

    const commonBox = (
        <>
            <div className='home-message-box'>
                <div className='home-title'>消息</div>
                <div className='home-message'>
                    <div className='home-message-item' onClick={()=>goPath('notice')}>
                        <div className='home-left'>
                            <div className='home-icon'><MessageOutlined/></div>
                            <div className='home-label'>消息通知方案</div>
                        </div>
                        <div className='home-info'>
                            {count?.noticeNumber || 0}
                        </div>
                    </div>
                    <div className='home-message-item' onClick={()=>goPath('send')}>
                        <div className='home-left'>
                            <div className='home-icon'><AlertOutlined /></div>
                            <div className='home-label'>消息发送方式</div>
                        </div>
                        <div className='home-info'>
                            {count?.sendTypeNumber || 0}
                        </div>
                    </div>
                </div>
            </div>
            <div className='home-config-box'>
                <div className='home-title'>流水线配置</div>
                <div className='home-config'>
                    <div className='home-config-item' onClick={()=>goPath('grouping')}>
                        <div className='home-left'>
                            <div className='home-icon'><InsertRowBelowOutlined /></div>
                            <div className='home-label'>分组</div>
                        </div>
                        <div className='home-info'>{count?.groupNumber || 0}</div>
                    </div>
                    <div className='home-config-item' onClick={()=>goPath('env')} >
                        <div className='home-left'>
                            <div className='home-icon'><CloudOutlined /></div>
                            <div className='home-label'>环境</div>
                        </div>
                        <div className='home-info'>{count?.envNumber || 0}</div>
                    </div>
                    <div className='home-config-item' onClick={()=>goPath('host')}>
                        <div className='home-left'>
                            <div className='home-icon'><DesktopOutlined /></div>
                            <div className='home-label'>主机</div>
                        </div>
                        <div className='home-info'>{count?.hostNumber || 0}</div>
                    </div>
                    <div className='home-config-item' onClick={()=>goPath('auth')}>
                        <div className='home-left'>
                            <div className='home-icon'><VerifiedOutlined /></div>
                            <div className='home-label'>认证</div>
                        </div>
                        <div className='home-info'>{count?.authNumber || 0}</div>
                    </div>
                    <div className='home-config-item' onClick={()=>goPath('tool')}>
                        <div className='home-left'>
                            <div className='home-icon'><ToolOutlined /></div>
                            <div className='home-label'>工具</div>
                        </div>
                        <div className='home-info'>{count?.scmNumber || 0}</div>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <Row className='setting-home'>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "20" , offset: "2"  }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "14", offset: "5" }}
            >
                <div className='arbess-home-limited'>
                    {
                        version==='cloud' ?
                            <>
                                <div className='home-licence-box'>
                                    <div className='home-licence'>
                                        <div className='home-licence-item'>
                                            <div className='home-licence-item-level'>
                                                <div className='licence-level-img'>
                                                    <img src={licence?.subScribe === false ? vipLight:vipDark} alt={''}/>
                                                </div>
                                                <div>
                                                    <div>
                                                        <span className='licence-level-info'>{licence?.subScribe === false ? '专业版' : '免费版'}</span>
                                                        {licence?.endTime &&
                                                            <span className='licence-level-issuedTime'>
                                                            {moment(licence.endTime).format('YYYY-MM-DD HH:mm:ss')}到期
                                                        </span>}
                                                    </div>
                                                    <div className='licence-level-applyAuth' onClick={goAuth}>
                                                        <span className='licence-level-applyAuth-title'>授权人数：</span>
                                                        <span className='licence-level-info'>
                                                            {licence?.authNum || 0 } / {licence?.subScribe === false ? licence?.userNum > 0 ? licence.userNum+'人' : "不限制" :"不限制" }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='home-licence-sub' onClick={()=>applySubscription('arbess')}>
                                            {licence?.subScribe === false ? '续订' : '订阅'}
                                        </div>
                                    </div>
                                </div>
                                <div className='home-chunk-box'>
                                    {commonBox}
                                    <div className='home-security-box'>
                                        <div className='home-title'>安全</div>
                                        <div className='home-security'>
                                            <div className='home-security-item' onClick={()=>goPath('backups')}>
                                                <div className='home-left'>
                                                    <div className='home-icon'><HistoryOutlined /></div>
                                                    <div className='home-label'>上次备份时间</div>
                                                </div>
                                                <div className='home-info'>{count?.lastBackupsTime && moment(count.lastBackupsTime).format('YYYY-MM-DD') || '无'}</div>
                                            </div>
                                            <div className='home-security-item' onClick={()=>goPath('myLog')}>
                                                <div className='home-left'>
                                                    <div className='home-icon'><LaptopOutlined /></div>
                                                    <div className='home-label'>操作日志</div>
                                                </div>
                                                <div className='home-info'>{log?.totalRecord || '0'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className='home-licence-box'>
                                    <div className='home-licence'>
                                        <div className='home-licence-item'>
                                            <div className='home-licence-item-level'>
                                                <div className='licence-level-img'>
                                                    <img src={count?.version===false ? vipLight:vipDark} alt={''}/>
                                                </div>
                                                <div>
                                                    <div>
                                                        <span className='licence-level-info'>{count?.version===false ? '企业版' : '社区版'}</span>
                                                        {licence?.issuedTime &&
                                                        <span className='licence-level-issuedTime'>
                                                            {moment(licence.issuedTime).format('YYYY-MM-DD HH:mm:ss')}到期
                                                        </span>}
                                                    </div>
                                                    <div className='licence-level-applyAuth' onClick={goAuth}>
                                                        <span className='licence-level-applyAuth-title'>授权人数：</span>
                                                        <span className='licence-level-info'>
                                                            {count?.applyAuthNumber || 0 } / {count?.version === false ? licence?.userNum > 0 ? licence.userNum+'人' : "不限制" :"不限制" }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='home-licence-sub' onClick={()=>applySubscription('arbess')}>
                                            {count?.version === false ? '续订' : '订阅'}
                                        </div>
                                    </div>
                                </div>
                                <div className='home-chunk-box'>
                                    <div className='home-user-box'>
                                        <div className='home-title'>用户与权限</div>
                                        <div className='home-user'>
                                            <div className='home-user-item' onClick={()=>goPath('user')}>
                                                <div className='home-left'>
                                                    <div className='home-icon'><UserOutlined/></div>
                                                    <div className='home-label'>用户</div>
                                                </div>
                                                <div className='home-info'>
                                                    {count?.userNumber || 0}
                                                </div>
                                            </div>
                                            <div className='home-user-item' onClick={()=>goPath('orga')}>
                                                <div className='home-left'>
                                                    <div className='home-icon'><ApartmentOutlined /></div>
                                                    <div className='home-label'>部门</div>
                                                </div>
                                                <div className='home-info'>
                                                    {count?.orgaNumber || 0}
                                                </div>
                                            </div>
                                            <div className='home-user-item' onClick={()=>goPath('userGroup')}>
                                                <div className='home-left'>
                                                    <div className='home-icon'><GroupOutlined /></div>
                                                    <div className='home-label'>用户组</div>
                                                </div>
                                                <div className='home-info'>
                                                    {count?.userGroupNumber || 0}
                                                </div>
                                            </div>
                                            <div className='home-user-item' onClick={()=>goPath('role')}>
                                                <div className='home-left'>
                                                    <div className='home-icon'><ScheduleOutlined /></div>
                                                    <div className='home-label'>权限</div>
                                                </div>
                                                <div className='home-info'>
                                                    {count?.roleNumber || 0}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {commonBox}
                                </div>
                            </>
                    }
                </div>
            </Col>
        </Row>
    )
};

export default SettingHome;
