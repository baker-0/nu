import React, { Component } from 'react';

// Externals
import { Polar } from 'react-chartjs-2';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { IconButton, Typography } from '@material-ui/core';

// Material icons
import {
  LaptopMac as LaptopMacIcon,
  PhoneIphone as PhoneIphoneIcon,
  Refresh as RefreshIcon,
  TabletMac as TabletMacIcon
} from '@material-ui/icons';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletToolbar,
  PortletContent
} from 'components';

// Palette
import palette from 'theme/palette';

// Chart configuration
import { data, options } from './chart';

// Component styles
import styles from './styles';

class DevicesChart extends Component {
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader noDivider>
          <PortletLabel title="Listening Clock" />
          <PortletToolbar>
            <IconButton
              className={classes.refreshButton}
              onClick={this.handleRefresh}
              variant="text"
            >
              <RefreshIcon />
            </IconButton>
          </PortletToolbar>
        </PortletHeader>
        <PortletContent>
          <div className={classes.chartWrapper}>
            <div className={classes.stats}>
              <Typography variant="body1">6 PM</Typography>
            </div>
            <Polar
              data={data}
              options={options}
            />
          </div>
          <div className={classes.stats}>
            <div className={classes.device}>
              <Typography variant="body1">6 AM</Typography>
            </div>
          </div>
        </PortletContent>
      </Portlet>
    );
  }
}

DevicesChart.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DevicesChart);
