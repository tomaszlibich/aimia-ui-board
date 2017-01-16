import React, { Component } from 'react';
import moment from 'moment';
import Ajax from '../../../../services/ajax';
import Poller from '../../../../services/poller';
import CONSTANTS from '../../../../constants';

import PullRequestsList from './pull-requests-list';

import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';

class PullRequests extends Component {
    constructor() {
        super();
        this.state = {
            pullRequests: [],
            adminPullRequests: []
        };
    }

    componentDidMount() {
        const params = window.location.href.split('#')[1];

        if (!params) {
            this.redirectToAuth();
        } else {
            this.initializeDataFetch(params.split('&')[0].replace('access_token=', ''));
        }
    }

    initializeDataFetch(token) {
        this.requests = {
            'pullRequests': this.createRequest('pullRequests', CONSTANTS.BITBUCKET_API_PULL_REQUESTS, token),
            'adminPullRequests': this.createRequest('adminPullRequests', CONSTANTS.BITBUCKET_API_ADMIN_PULL_REQUESTS, token)
        };

        Ajax.get(this.requests.pullRequests).then(this.requests.pullRequests.success).catch(this.requests.pullRequests.error);
        Ajax.get(this.requests.adminPullRequests).then(this.requests.adminPullRequests.success).catch(this.requests.adminPullRequests.error);
        Poller.run(this.requests.pullRequests);
        Poller.run(this.requests.adminPullRequests);
    }

    createRequest(id, url, token) {
        return {
            id: id,
            url: url,
            headers: {
                'Authorization': 'Bearer ' + decodeURIComponent(token)
            },
            success: (data) => {
                if (data.values) {
                    const stateUpdate = {};

                    stateUpdate[id] = this.parsePRs(data.values);
                    this.setState(stateUpdate);
                } else if (data.authorized === false) {
                    this.redirectToAuth();
                }
            },
            error: (error) => {
                console.warn('error', error);
            }
        };
    }

    redirectToAuth() {
        window.location.href = CONSTANTS.BITBUCKET_AUTHORIZE_URL;
    }

    parsePRs(prs) {
        let requests = prs.filter(pr => {
            return pr.state === 'OPEN';
        });

        requests = requests.map(request => {
            const timeDifference = moment().diff(request.created_on, 'hours');

            request.createdTimestamp = moment(request.created_on).valueOf();
            request.createdFromNow = moment(request.createdTimestamp).fromNow();
            request.statusLevel = 'pending';

            if (timeDifference > CONSTANTS.PR_NUMBER_OF_HOURS_TO_WARNING) {
                request.statusLevel = timeDifference > CONSTANTS.PR_NUMBER_OF_HOURS_TO_ALERT ? 'alert' : 'warning';

                Ajax.post({
                    url: CONSTANTS.API_URL + 'pr-alert',
                    body: {
                        id: request.id,
                        type: request.statusLevel
                    }
                });
            }

            return request;
        });

        requests.sort((a, b) => {
            return a.createdTimestamp - b.createdTimestamp;
        });

        return requests;
    }

    render() {
        const allPullRequests = this.state.pullRequests.length + this.state.adminPullRequests.length,
            tileLabel = 'Open Pull Request' + (allPullRequests === 1 ? '' : 's') + ' (' + allPullRequests + ')';

        return (
            <Paper className="content--tile" zDepth={1}>
                <Subheader className="content--tile__title">{tileLabel}</Subheader>
                {this.state.pullRequests.length > 0 &&
                    <PullRequestsList subheader="SS-Newpro-UI" requests={this.state.pullRequests} />
                }

                {this.state.adminPullRequests.length > 0 &&
                    <PullRequestsList subheader="SS-Newpro-Admin-UI" requests={this.state.adminPullRequests} />
                }

                {this.state.pullRequests.length === 0 && this.state.adminPullRequests.length === 0 &&
                    <div className="content--tile_loader">
                        <CircularProgress />
                    </div>
                }
            </Paper>
        );
    }
}

export default PullRequests;
