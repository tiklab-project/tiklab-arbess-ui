import React from "react";
import {PRIVILEGE_SYSTEM_STORE,FeatureList,PrivilegeProjectButton} from "doublekit-privilege-ui";
import {inject, observer} from "mobx-react";

const SecurePowerDomain = props =>{
    // return (
    //     <PrivilegeProjectButton code={'WorkDelete'} disabled={"hidden"} domainId={projectId}>
    //         <div className="work-botton botton-background delete"
    //              onClick={deleteWork}
    //         >
    //             <svg className="icon" aria-hidden="true">
    //                 <use xlinkHref="#iconshanchu2"></use>
    //             </svg>
    //         </div>
    //     </PrivilegeProjectButton>
    // )
    return <FeatureList {...props}/>
}

export default inject(PRIVILEGE_SYSTEM_STORE)(observer(SecurePowerDomain))