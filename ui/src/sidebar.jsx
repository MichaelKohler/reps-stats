import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BugReportIcon from '@material-ui/icons/BugReport';
import DataUsageIcon from '@material-ui/icons/DataUsage';

// The usage of React.forwardRef will no longer be required for react-router-dom v6.
// see https://github.com/ReactTraining/react-router/issues/6056
const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ ref } { ...props }/>); // eslint-disable-line react/display-name

// eslint-disable-next-line react/no-multi-comp
export function Sidebar() {
  return (
      <List>
          <ListItem button component={ AdapterLink } to="/">
              <ListItemIcon>
                  <DashboardIcon/>
              </ListItemIcon>
              <ListItemText primary="Dashboard"/>
          </ListItem>

          <ListItem button component={ AdapterLink } to="/onboarding">
              <ListItemIcon>
                  <BugReportIcon/>
              </ListItemIcon>
              <ListItemText primary="Onboarding"/>
          </ListItem>

          <ListItem button component={ AdapterLink } to="/portal">
              <ListItemIcon>
                  <BugReportIcon/>
              </ListItemIcon>
              <ListItemText primary="Portal"/>
          </ListItem>

          <ListItem button component={ AdapterLink } to="/budget">
              <ListItemIcon>
                  <BugReportIcon/>
              </ListItemIcon>
              <ListItemText primary="Budget Requests"/>
          </ListItem>

          <ListItem button component={ AdapterLink } to="/swag">
              <ListItemIcon>
                  <BugReportIcon/>
              </ListItemIcon>
              <ListItemText primary="Swag Requests"/>
          </ListItem>

          <ListItem button component={ AdapterLink } to="/activity">
              <ListItemIcon>
                  <DataUsageIcon/>
              </ListItemIcon>
              <ListItemText primary="Activity"/>
          </ListItem>

          <ListItem button component={ AdapterLink } to="/tenure">
              <ListItemIcon>
                  <DataUsageIcon/>
              </ListItemIcon>
              <ListItemText primary="Tenure"/>
          </ListItem>
      </List>
  );
}

export default Sidebar;
