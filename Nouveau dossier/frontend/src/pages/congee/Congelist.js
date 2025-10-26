import Maintemplate from "../home/Maintemplate"
import CongeTable from "./CongeTable"



export const Congelist=()=>{
    return(
        <>
        <Maintemplate >
            {(getNotification)=>(
                <CongeTable/>
            )}
        </Maintemplate>
        </>
    )
}