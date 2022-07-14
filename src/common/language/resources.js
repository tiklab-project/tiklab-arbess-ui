import {eam_cn} from "doublekit-eam-ui";
import {message_cn} from "doublekit-message-ui";
import {privilege_cn} from "doublekit-privilege-ui/es/_utils";
import {orga_cn} from "doublekit-user-ui/es/_utils";
import zhCnTrans from "./cn/translation.json";

const resources= {
    zh:{
        translation:{...zhCnTrans,...orga_cn,...eam_cn,...privilege_cn,...message_cn},
    },
    en:{
        // translation:{...orga_en,...privilege_en, ...message_en},
    },

}

export default resources
