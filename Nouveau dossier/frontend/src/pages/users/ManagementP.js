import Maintemplate from "../home/Maintemplate"
import { CrudP } from "./CrudP"

export const ManagementP=()=>{
    return(
        <>
        <Maintemplate >
            {(getNotification)=>(
                <CrudP/>
            )}
        </Maintemplate>
        </>
    )
}