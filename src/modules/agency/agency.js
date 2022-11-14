import React,{useEffect} from "react";
import {inject,observer} from "mobx-react";
import BreadcrumbContent from "../common/breadcrumb/breadcrumb";
import AgencyContent from "../home/components/agency";

const Agency = props =>{

    const {homePageStore} = props

    const {findtodopage,taskList} = homePageStore

    useEffect(()=>{
        findtodopage()
    },[])

    const goBack = () => props.history.push("/index/home")

    return(
        <div className="agency">
            <div className="agency-content home-limited">
                <BreadcrumbContent
                    firstItem={"代办任务"}
                    goBack={goBack}
                />
                <AgencyContent
                    {...props}
                    taskList={taskList}
                />
            </div>
        </div>
    )
}

export default inject("homePageStore")(observer(Agency))