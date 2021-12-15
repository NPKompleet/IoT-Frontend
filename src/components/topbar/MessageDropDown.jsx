import React from 'react'
import { useTranslation } from 'react-i18next';

const MessageItem = props => {
    const {message, title} = props;
    return (
        <a className="dropdown-item d-flex align-items-center" href="#">
            <div className="dropdown-list-image mr-3">
                <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt=""/>
                <div className="status-indicator bg-success"></div>
            </div>
            <div className="font-weight-bold">
                <div className="text-truncate">{message}</div>
                <div className="small text-gray-500">{title}</div>
            </div>
        </a>
    )
}


const MessageDropDown = () => {
    const { t, } = useTranslation();
    return (
        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
            <h6 className="dropdown-header">
                {t("message_center")}
            </h6>
            <MessageItem 
                title={"Jae Chun · 1d"} 
                message={"I have the photos that you ordered last month, how would you like them sent to you?"}/>
            <MessageItem 
                title={"Morgan Alvarez · 2d"} 
                message={"Last month's report looks great, I am very happy with the progress so far, keep up the good work!"}/>
            
            <a className="dropdown-item text-center small text-gray-500" href="#">{t("read_more_messages")}</a>
        </div>
    )
}

export default MessageDropDown
