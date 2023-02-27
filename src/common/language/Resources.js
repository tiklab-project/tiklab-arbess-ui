import {eam_cn} from "tiklab-eam-ui/es/_utils";
import {privilege_cn} from "tiklab-privilege-ui/es/_utils";
import {orga_cn} from "tiklab-user-ui/es/_utils";
import {message_cn} from "tiklab-message-ui/es/_utils";
import todoTask_cn from "tiklab-todotask-ui/es/_utils/language";
import oplog_cn from "tiklab-oplog-ui/es/_utils/language";
import zhCnTrans from "./cn.json";
import enCnTrans from "./en.json"

const resources= {
    zh:{
        translation:{
            ...orga_cn,
            ...eam_cn,
            ...privilege_cn,
            ...message_cn,
            ...todoTask_cn,
            ...oplog_cn,
            ...zhCnTrans,
        },
    },
    en:{
        translation:{...enCnTrans}
        // translation:{...orga_en,...privilege_en, ...message_en},
    },

}

export default resources
