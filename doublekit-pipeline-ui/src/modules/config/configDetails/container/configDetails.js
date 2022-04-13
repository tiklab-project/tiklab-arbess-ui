import React ,{useState,useEffect } from "react";
import './configDetails.scss'
import PracticeRight from "../components/practiceRight";
import OptModal from "../modal/optModal";
import AddCodeModal from "../modal/addCodeModal";
import ChangeConfigSorts_drawer from "../components/changeConfigSorts_drawer";

const ConfigDetails = () =>{

    const [newStageVisible, setNewStageVisible] = useState(false)
    const [codeVisible, setCodeVisible] = useState(false)
    const [changeSortVisible, setChangeSortVisible] = useState(false)
    const [data, setData] = useState([])
    const [codeData, setCodeData] = useState('' )
    const [drawerType,setDrawer] = useState('large')

    useEffect(()=>{
        return () =>localStorage.removeItem('data')
    },[])

    return(
        <div className='config-details task '>
            <div className='config-details-content'>
                <PracticeRight
                    data={data}
                    codeData={codeData}
                    setNewStageVisible={setNewStageVisible}
                    setCodeVisible={setCodeVisible}
                    setChangeSortVisible={setChangeSortVisible}
                    setDrawer={setDrawer}
                />
            </div>

            <OptModal
                drawerType={drawerType}
                data={data}
                setData={setData}
                newStageVisible={newStageVisible}
                setNewStageVisible={setNewStageVisible}
            />

            <AddCodeModal
                codeData={codeData}
                codeVisible={codeVisible}
                setCodeVisible={setCodeVisible}
                setCodeData={setCodeData}
            />

            <ChangeConfigSorts_drawer
                changeSortVisible={changeSortVisible}
                setChangeSortVisible={setChangeSortVisible}
                data={data}
                setData={setData}
            />

        </div>
    )
}

export default ConfigDetails