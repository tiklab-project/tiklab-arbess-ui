import React from "react";
import {withRouter} from "react-router-dom";
import ListEmpty from "./ListEmpty";
import Profile from "../profile/Profile";
import moment from "moment/moment";
import "./DynamicList.scss";

/**
 * 动态列表
 */
const DynamicList = props =>{

    const {dynamicList} = props

    // 动态路由跳转
    const goDynaLink = item =>{
        if(item.link){
            props.history.push(item.link.split("#")[1])
        }
    }

    const renderLis = (item,index) => {
        const {loggingList,time} = item;
        return (
            <div key={index} className='dynamic-item'>
                <div className='dynamic-item-time'>
                    <span>{time}</span>
                </div>
                {
                    loggingList && loggingList.map(logItem=>{
                        const {actionType,action,user,createTime,data,id} = logItem
                        const dataObj = data && JSON.parse(data)
                        return (
                            <div key={id} className='dynamic-item-log mf-user-avatar' >
                                <div className='dynamic-item-log-time'>
                                    {moment(createTime).format("HH:mm")}
                                </div>
                                <Profile userInfo={user}/>
                                <div className='dynamic-item-log-info'>
                                    <div className='dynamic-item-log-info-name' onClick={()=>goDynaLink(logItem)}>
                                        {user?.nickname || user?.name}{actionType?.name}
                                    </div>
                                    <div className='dynamic-item-log-desc'>
                                        <div className='log-desc-action'> {action}</div>
                                        {
                                            dataObj?.message &&
                                            <div className='log-desc-message' title={dataObj.message}>
                                                {dataObj.message}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className="mf-dynamic-center">
            {
                dynamicList && dynamicList.length>0 ?
                    dynamicList.map((item,index)=>renderLis(item,index))
                    :
                    <ListEmpty title={"暂无动态"}/>
            }
        </div>
    )
}

export default withRouter(DynamicList)
