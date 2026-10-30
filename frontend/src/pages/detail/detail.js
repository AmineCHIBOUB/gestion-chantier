import { DetailPage } from "./DetailPage";
import Maintemplate from '../home/Maintemplate';
const GeolocationExample = () => {

  return (
    <Maintemplate>
            {(getNotification)=>(
                <DetailPage getNotification={getNotification}/>
        )}
    </Maintemplate>
  );
};

export default GeolocationExample;