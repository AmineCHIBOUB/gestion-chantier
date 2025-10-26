import Maintemplate from "../home/Maintemplate"
import UpdateChantier from "./UpdateC"

export const Updatechan=()=>{
    return(
        <>
        <Maintemplate>
            {(getNotification)=>(
                <UpdateChantier getNotification={getNotification}/>
            )}
        </Maintemplate>
        </>
    )
}