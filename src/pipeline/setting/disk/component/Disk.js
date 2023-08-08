import React from "react";
import Breadcrumb from "../../../../common/breadcrumb/Breadcrumb";
import "./Disk.scss";

/**
 * 磁盘空间管理
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Disk = (props) => {
    return (
        <div className='pipelineDisk mf-home-limited mf'>
            <Breadcrumb firstItem={"磁盘空间"}/>
            <div className='disk-content'>

            </div>
        </div>
    )
}

export default Disk
