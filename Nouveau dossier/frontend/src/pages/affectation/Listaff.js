import Maintemplate from "../home/Maintemplate"
import  Listaffectation  from "./Listaffectation"

export const Listaff=()=>{
    return(
        <>
        <Maintemplate >
            {(getNotification)=>(
                <Listaffectation/>
            )}
        </Maintemplate>
        </>
    )
}