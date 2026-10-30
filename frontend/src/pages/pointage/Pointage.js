import Maintemplate from "../home/Maintemplate"
import  ListPointage  from "./ListPointage"

export const Pointage=()=>{
    return(
        <>
        <Maintemplate >
            {(getNotification)=>(
                <ListPointage/>
            )}
        </Maintemplate>
        </>
    )
}