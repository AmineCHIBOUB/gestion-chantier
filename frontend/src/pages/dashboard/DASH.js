import Maintemplate from '../home/Maintemplate';
import Dashboard from "./dashboard";
const Dash = () => {

  return (
    <Maintemplate>
            {(getNotification)=>(
                <Dashboard getNotification={getNotification}/>
        )}
    </Maintemplate>
  );
};

export default Dash;