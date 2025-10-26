import Maintemplate from "../home/Maintemplate"
import  AffectationCrud  from "./AffectationCrud"

export const Affectation=()=>{
    return(
        <>
        <Maintemplate >
            {(getNotification)=>(
                <AffectationCrud/>
            )}
        </Maintemplate>
        </>
    )
}