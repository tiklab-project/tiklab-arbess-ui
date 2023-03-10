import {eam_cn} from "tiklab-eam-ui/es/utils";
import {user_cn} from "tiklab-user-ui/es/utils";
import {message_cn} from "tiklab-message-ui/es/utils";
import todoTask_cn from "tiklab-todotask-ui/es/utils/language";
import oplog_cn from "tiklab-security-ui/es/utils/language";
import pluginManage_cn from "tiklab-plugin-manager-ui/es/utils/language";
import zhCnTrans from "./cn.json";
import enCnTrans from "./en.json";

const resources= {
    zh:{
        translation:{
            ...user_cn,
            ...eam_cn,
            ...message_cn,
            ...todoTask_cn,
            ...oplog_cn,
            ...pluginManage_cn,
            ...zhCnTrans,
        },
    },
    en:{
        translation:{
            ...enCnTrans
        }
        // translation:{...orga_en,...privilege_en, ...message_en},
    },

}

export default resources
