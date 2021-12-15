import React, { useRef } from 'react'
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

/**
 * This component represents the Home page of the application. 
 * It contains a form for submitting the url to the building that 
 * should be displayed in the {@link DashboardPage}. 
 * This link is sent using the <em>useHistory</em> hook provided by React-Router.
 * 
 * @category Pages
 * @component
 */
const HomePage = () => {
    const { t, } = useTranslation();
    const history = useHistory();
    const inputRef = useRef(null);

    const onSubmit = (event) => {
        event.preventDefault();
        history.push({
            pathname: '/dashboard',
            state: { url: inputRef.current.value }
        });
    }
    return (
        <div className="container">
            <div className="w-75 mt-5 mx-auto">
                <h1 className="text-center">{t("home_welcome")}</h1>
                <form className="d-block form-inline mr-auto ml-md-3 m-auto navbar-search" 
                    onSubmit={onSubmit}>
                    <div className="input-group mt-5">
                    <input ref={inputRef} name={'url'} className="form-control bg-light small" placeholder={`${t("home_url_placeholder")}...`} aria-label="Search" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                        <i className="fas fa-sign-in-alt"></i>
                        </button>
                    </div>
                    </div>
                </form>
          </div>  
        </div>
    )
}

export default HomePage
