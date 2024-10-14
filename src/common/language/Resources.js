import {eam_cn} from "tiklab-eam-ui/es/utils";
import {user_cn} from "tiklab-user-ui/es/utils";
import {message_cn} from "tiklab-message-ui/es/utils";
import {privilege_cn} from "tiklab-privilege-ui/es/utils";
import oplog_cn from "tiklab-security-ui/es/utils/language";
import zhCnTrans from "./cn.json";
import enCnTrans from "./en.json";

const resources= {
    zh:{
        translation:{
            ...user_cn,
            ...eam_cn,
            ...message_cn,
            ...oplog_cn,
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
