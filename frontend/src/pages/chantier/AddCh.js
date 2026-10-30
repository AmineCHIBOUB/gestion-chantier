import Maintemplate from "../home/Maintemplate"
import AddChan from "./AddC"

export const AddChantier=()=>{
    return(
        <>
        <Maintemplate>
            {(getNotification)=>(
                <AddChan/>
            )}
        </Maintemplate>
        </>
    )
}