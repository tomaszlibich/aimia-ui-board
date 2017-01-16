import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import './pull-requests-list.css';

function handleClick(link) {
    window.open(link, '_blank').focus();
}

const PullRequestsList = (props) => {
    return (
        <List className="pull-requests-list">
            <Subheader>{props.subheader} ({props.requests.length})</Subheader>
            {props.requests.map((pr, index) => {
                const itemClassName = `pull-requests-list__item ${pr.statusLevel}`;

                return <div className={itemClassName} key={index}>
                    <ListItem primaryText={pr.title} secondaryText={`${pr.createdFromNow} by ${pr.author.display_name}`} onTouchTap={() => handleClick(pr.links.html.href)} />
                </div>;
            })}
        </List>
    );
};

export default PullRequestsList;
