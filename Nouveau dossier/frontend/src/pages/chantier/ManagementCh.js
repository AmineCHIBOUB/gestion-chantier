import Maintemplate from "../home/Maintemplate"
import { CrudCh } from "./CrudCh"
export const ManagementCh=()=>{
    return(
        <>
        <Maintemplate>
            {(getNotification)=>(
                <CrudCh/>
            )}
        </Maintemplate>
        </>
    )
}