import Maintemplate from "../home/Maintemplate"
import HabiliteInterface from "./HabiliteInterface"
export const Habilite=()=>{
    return(
        <>
        <Maintemplate >
            {(getNotification)=>(
                <HabiliteInterface/>
            )}
        </Maintemplate>
        </>
    )
}