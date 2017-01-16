import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SocialPeople from 'material-ui/svg-icons/social/people';

class Header extends Component {
    render() {
        return (
          <div className="row header">
                <div className="col-xs">
                    <AppBar title="AIMIA UI Board" iconElementLeft={<IconButton><SocialPeople /></IconButton>} />
                </div>
            </div>
        );
    }
}

export default Header;
