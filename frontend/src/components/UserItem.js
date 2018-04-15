import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from './Loader';
import { getUser } from '../redux/users/actions';
import { makeGetUserById } from '../redux/users/selectors';
import sampleData from '../redux/sampleData';

import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


const { USER_DATA } = sampleData;

class UserItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }


  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };




  render() {
    const { user, profileObj } = this.props;
    const loading = user === undefined;

    if (loading) {
      return <Loader type="bars" color="#333" width={32} height={32} />;
    }

    const { name, email, googleId } = user;

    const emailBody = "Hi " + name.split(" ")[0] + ",\n I'd like to buy your book!"

    return (
      <div>
      {`${name}, ${email}`}
      {(profileObj.googleId === googleId) 
        ?
        <CardActions>
          <RaisedButton label="Delete My Listing" secondary={true} onClick={this.handleClick}/>
        </CardActions>
        :
        <CardActions>
          <RaisedButton label="Contact Seller" primary={true} onClick={this.handleClick}/>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <div>
              <h3 style={{padding:'5px', margin: '5px'}}> Great! Send them an email </h3>
              <TextField
                readOnly
                disabled={false}
                defaultValue={email}
                floatingLabelText="Seller's Email"
                style={{padding:'5px'}}
                onFocus={(event) => event.target.select()}
              />
              <FlatButton style={{padding: '0px'}}
                icon={<i class="material-icons">assignment</i>}
                label="Copy"
                labelPosition="after"
              />
              <br />
              <TextField
                readOnly
                defaultValue={emailBody}
                floatingLabelText="Premade Email Body"
                style={{padding:'5px'}}
                onFocus={(event) => event.target.select()}
              />
              <FlatButton style={{padding: '0px'}}
                icon={<i class="material-icons">assignment</i>}
                label="Copy"
                labelPosition="after"
              />
              <br />
          </div>
          </Popover>
        </CardActions>}
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   const { profileObj } = state.authReducer;
//   return { profileObj };
// };

// export default withRouter(connect(mapStateToProps)(UserItem));
export default UserItem;
