import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { setLanguage, setRequestInterval } from '../../redux/ducks/general_settings';
import { languageOptions } from '../../i18next';
import useLocalStorage from '../../hooks/use-local-storage';

const GeneralSettings = () => {
    const { t, i18n } = useTranslation();
    const intervals = ['30 Seconds', '1 Minute', '5 Minutes'];
    const languages = languageOptions;

    const selectedLanguage =  useSelector(state => state.generalSettings.language);
    const [languageValue, setLanguageValue] = useLocalStorage("language", selectedLanguage)
    const requestInterval =  useSelector(state => state.generalSettings.requestInterval);
    const dispatch = useDispatch();

    const changeIntervalHandler = (event) => {
        dispatch(setRequestInterval(event.target.value));
    }

    const changeLanguageHandler = (event) => {
        setLanguageValue(event.target.value);
        dispatch(setLanguage(event.target.value));
        i18n.changeLanguage(event.target.value);
    }

    return (
        <div>
            <div className="settingsGrid">
                <label className="font-weight-bold" htmlFor="reqInterval">{t("request_interval")}:</label>
                <select name="reqInterval" id="reqInterval" value={requestInterval} onChange={(e) => changeIntervalHandler(e)}>
                    {intervals.map((interval, index) => {
                        return <option value={intervals[index]} key={index}>{interval}</option>
                    })}
                </select>

                <label className="font-weight-bold" htmlFor="language">{t("language")}:</label>
                <select name="language" id="language" value={languageValue} onChange={(e) => changeLanguageHandler(e)}>
                    {languages.map((language, index) => {
                        return <option value={languages[index]} key={index}>{language}</option>
                    })}
                </select>
            </div>
        </div>
    )
}

export default GeneralSettings
