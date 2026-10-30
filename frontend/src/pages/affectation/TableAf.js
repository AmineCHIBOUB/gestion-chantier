import Maintemplate from "../home/Maintemplate"
import  TableAffectation  from "./TableAffectation"

export const TableAf=()=>{
    return(
        <>
        <Maintemplate >
            {(getNotification)=>(
                <TableAffectation/>
            )}
        </Maintemplate>
        </>
    )
}