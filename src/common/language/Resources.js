import {eam_cn} from "thoughtware-eam-ui/es/utils";
import {user_cn} from "thoughtware-user-ui/es/utils";
import {message_cn} from "thoughtware-message-ui/es/utils";
import {privilege_cn} from "thoughtware-privilege-ui/es/utils";
import oplog_cn from "thoughtware-security-ui/es/utils/language";
import pluginManage_cn from "thoughtware-plugin-manager-ui/es/utils/language";
import zhCnTrans from "./cn.json";
import enCnTrans from "./en.json";

const resources= {
    zh:{
        translation:{
            ...user_cn,
            ...eam_cn,
            ...message_cn,
            ...oplog_cn,
            ...pluginManage_cn,
            ...privilege_cn,
            ...zhCnTrans,
        },
    },
    en:{
        translation:{
            ...enCnTrans
        }
    },

}

export default resources
