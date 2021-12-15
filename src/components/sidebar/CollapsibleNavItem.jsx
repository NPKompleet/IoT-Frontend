import React from 'react'

const SubItems = (props) => {
    const items = new Map(props.items);
    const subItems = [];

    items.forEach((link, item) => {
        subItems.push(<a className="collapse-item" href={link} key={link}>{item}</a>);
    });
    return(
        <>{subItems}</>
    );
}

const CollapsibleNavItem = (props) => {
    const {id, icon, text, subtext, items} = props;
    return (
        <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target={`#${id}`} aria-expanded="true" aria-controls={id}>
            <i className={`fas fa-fw ${icon}`}></i>
            <span>{text}</span>
            </a>
            <div id={id} className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">{subtext}</h6>
                <SubItems items={items}/>
            </div>
            </div>
        </li>
    )
}

export default CollapsibleNavItem
