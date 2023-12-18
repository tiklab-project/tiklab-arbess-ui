import React from "react";
import {withRouter} from "react-router-dom";
import ListEmpty from "./ListEmpty";
import Profile from "../profile/Profile";
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

    // 渲染动态列表
    const renderLis = (item) => {
        const {actionType,action,user,createTime,data} = item
        const dataObj = data && JSON.parse(data)
        return (
            <div key={item.id} className="dynamic-item" onClick={()=>goDynaLink(item)}>
                <div className="dynamic-item-data">
                    <Profile
                        userInfo={user}
                    />
                    <div className='item-data-info'>
                        <div className='item-data-info-name'>{user?.nickname || user?.name} {actionType?.name}</div>
                        <div className='item-data-info-desc'>
                            <div className='desc-action'> {action}</div>
                            {
                                dataObj?.message &&
                                <div className='desc-message'>{dataObj.message}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="dynamic-item-time">{createTime}</div>
            </div>
        )
    }

    return (
        <div className="dynamic-center">
            {
                dynamicList && dynamicList.length>0 ?
                dynamicList.map(item=>renderLis(item))
                :
                <ListEmpty title={"暂无动态"}/>
            }
        </div>
    )
}

export default withRouter(DynamicList)
