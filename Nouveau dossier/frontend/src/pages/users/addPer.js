import Maintemplate from "../home/Maintemplate"
import AddPerson from "./AddP"

export const AddPer=()=>{
    return(
        <>
        <Maintemplate>
            {(getNotification)=>(
                <AddPerson/>
            )}
        </Maintemplate>
        </>
    )
}