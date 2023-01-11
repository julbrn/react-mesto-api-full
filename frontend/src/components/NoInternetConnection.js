import {useState, useEffect} from 'react';
import Popup from "./Popup";

const NoInternetConnection = ({isOpen, children}) => {
    const [isOnline, setOnline] = useState(true);

    useEffect(()=>{
        setOnline(navigator.onLine)
    },[])

    // event listeners to update the state
    window.addEventListener('online', () => {
        setOnline(true)
    });

    window.addEventListener('offline', () => {
        setOnline(false)
    });

    if(isOnline){
        return(
            children
        )
    } else {
        return(<Popup popupModifier="edit-profile"
        containerModifier="edit-profile"
        isOpen={isOpen}
        ><h1 className={"popup__title"}>Соединение с интернетом отсутствует :(</h1></Popup>)
    }
}

export default NoInternetConnection;