import Maintemplate from "../home/Maintemplate"
import UpdatePerson from "./UpdateP"

export const UpdatePer=()=>{
    return(
        <>
        <Maintemplate>
            {(getNotification)=>(
                <UpdatePerson/>
            )}
        </Maintemplate>
        </>
    )
}