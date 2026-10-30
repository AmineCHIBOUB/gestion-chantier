import Maintemplate from "../home/Maintemplate"
import DemandeConge from "./DemandeConge"


export const Conge=()=>{
    return(
        <>
        <Maintemplate >
            {(getNotification)=>(
                <DemandeConge/>
            )}
        </Maintemplate>
        </>
    )
}