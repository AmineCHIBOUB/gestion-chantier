import Maintemplate from "../home/Maintemplate"
import  TableAffectation  from "./TableAffectation"
import UpdateAffectaion from "./UpdateAffectaion"

export const UpdateAf=()=>{
    return(
        <>
        <Maintemplate >
            {(getNotification)=>(
                <UpdateAffectaion/>
            )}
        </Maintemplate>
        </>
    )
}