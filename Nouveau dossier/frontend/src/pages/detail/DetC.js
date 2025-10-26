
import Maintemplate from '../home/Maintemplate';
import { DetailPageCh } from "./DetailCh";
const Detc = () => {

  return (
    <Maintemplate>
            {(getNotification)=>(
                <DetailPageCh getNotification={getNotification}/>
        )}
    </Maintemplate>
  );
};

export default Detc;