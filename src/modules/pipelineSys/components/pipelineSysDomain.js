import React from "react";
import {PRIVILEGE_SYSTEM_STORE, PrivilegeProjectButton, ProjectFeatureList} from "doublekit-privilege-ui";
import {inject, observer} from "mobx-react";

const PipelineSysDomain = props =>{
    const pipelineId = localStorage.getItem('pipelineId')
    // return (
    //     <PrivilegeProjectButton code={'WorkDelete'} domainId={pipelineId}>
    //         <div className="work-botton botton-background delete"
    //              // onClick={deleteWork}
    //         >
    //             {/*<ProjectFeatureList {...props}/>*/}
    //             {/*<svg className="icon" aria-hidden="true">*/}
    //             {/*    <use xlinkHref="#iconshanchu2"></use>*/}
    //             {/*</svg>*/}
    //         </div>
    //     </PrivilegeProjectButton>
    // )
    return <ProjectFeatureList {...props}/>
}

export default inject(PRIVILEGE_SYSTEM_STORE)(observer(PipelineSysDomain))