import React, { Component } from 'react';
import './content.css';

import PullRequestsTile from './tiles/pull-requests/pull-requests';

class Content extends Component {
    render() {
        return (
          <div className="row content">
                <div className="col-xs">

                    <PullRequestsTile />

                </div>
            </div>
        );
    }
}

export default Content;
