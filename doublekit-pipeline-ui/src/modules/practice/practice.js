import React ,{useState,useEffect } from "react";
import './practice.scss'
import PracticeRight from "./components/practiceRight";
import OptDrawer from "./drawer/optDrawer";
import OptModal from "./modal/optModal";
import AddCodeModal from "./modal/addCodeModal";
import ChangeConfigSorts_drawer from "./components/changeConfigSorts_drawer";

const Practice = () =>{

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

            {/*<OptDrawer*/}
            {/*    // aa={aa}*/}
            {/*    drawerType={drawerType}*/}
            {/*    data={data}*/}
            {/*    setData={setData}*/}
            {/*    newStageVisible={newStageVisible}*/}
            {/*    setNewStageVisible={setNewStageVisible}*/}
            {/*/>*/}
        </div>
    )
}

export default Practice