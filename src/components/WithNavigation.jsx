import { useNavigate } from "react-router-dom";

function WithNavigation(Component){
    return props => <Component {...props} navigate={useNavigate()}/>
}

export default WithNavigation