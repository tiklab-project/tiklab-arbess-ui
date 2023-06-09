import React from "react";
import BreadcrumbContent from "../../../../common/breadcrumb/Breadcrumb";
import "./Disk.scss";

const Disk = (props) => {
    return (
        <div className='pipelineDisk mf-home-limited mf'>
            <BreadcrumbContent firstItem={"磁盘空间"}/>
            <div className='disk-content'>

            </div>
        </div>
    )
}

export default Disk
