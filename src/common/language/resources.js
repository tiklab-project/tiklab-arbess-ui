import { eam_cn} from 'doublekit-eam-ui';
import {  privilege_cn } from 'doublekit-privilege-ui';
import { message_cn } from 'doublekit-message-ui';
import { orga_cn } from 'doublekit-user-ui';
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
