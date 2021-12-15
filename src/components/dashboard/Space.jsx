import React from 'react';
import PropTypes from 'prop-types';
import ThingTile from './ThingTile';
import { useTranslation } from 'react-i18next';

/**
 * This component represents any of the rooms called <em>Space</em> of the Smart Building.
 * It contains the {@link ThingTile} component which holds each of the sensors and time series.
 *
 * @category Dashboard
 *
 * @component
 *
 */
const Space = ({ elements, spaceIndex }) => {
    const { t, } = useTranslation();

    if (elements === undefined) {
        return (
            <div className="minitabcontent bg-light flex-fill text-gray-900 p-0 m-0">
                <h3 className="m-auto p-4">{t("empty_space_message")}...</h3>
            </div>
        );
    }

    return (
        <div className="minitabcontent bg-light flex-fill text-gray-900 p-0 m-0">
            <div className="grid-container">
                <div className="grid-sensor">
                    {elements.map((element, index) => {
                        const tileIndex = parseInt(spaceIndex + "" + index)
                        return <ThingTile key={tileIndex} url={element["@id"]} tileIndex={tileIndex} />;
                    })}
                </div>
            </div>
        </div>
    );
};

Space.propTypes = {
    /**
     * An array of JSON objects representing Elements that can be used to display the Things in the room.
     */
    elements: PropTypes.array.isRequired
};

export default Space
