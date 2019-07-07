import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Scatter } from 'react-chartjs-2';
// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button, Typography } from '@material-ui/core';
import { Spinner } from 'components/Spinner'

// Material icons
import {
  ArrowDropDown as ArrowDropDownIcon,
  ArrowRight as ArrowRightIcon
} from '@material-ui/icons';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletToolbar,
  PortletContent,
  PortletFooter
} from 'components';

// Chart configuration
import { chartData, options } from './chart';

// Component styles
import styles from './styles';

import { getTop } from 'services/user'

class SalesChart extends Component {
  signal = true;

  state = {
    isLoading: true,
    data: [],
    error: null
  };

  componentDidMount() {
    this.signal = true;
    getTop('short_term')
      .then((tracks) => {
        this.setState({
          data: tracks.map((track, index) => {
            return { 'x': index, 'y': track.popularity }
          }),
          isLoading: false
        })
      })
      .catch((err) => this.setState({ error: err }));
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renderChart() {
    const { classes } = this.props;
    const { isLoading, data, error } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <Spinner />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (data.length === 0) {
      return <Typography variant="h6">There is no data</Typography>;
    }

    chartData.datasets[0].data = data;

    return (
      <div className={classes.chartWrapper}>
        <Scatter
          data={chartData}
          options={options}
        />          
      </div>
      
    );
  }

  componentDidUpdate() {
    console.log('this.state :', this.state);
    console.log('this.renderChart() :', this.renderChart());
  }

  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader noDivider>
          <PortletLabel title="Mainstream-o-meter" />
          <PortletToolbar>
            <Button
              className={classes.dropdownButton}
              size="small"
              variant="text"
            >
              Last 7 days <ArrowDropDownIcon />
            </Button>
          </PortletToolbar>
        </PortletHeader>
        <PortletContent>
          <div className={classes.chartWrapper}>
            {this.renderChart()}
          </div>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            size="small"
            variant="text"
          >
            Overview <ArrowRightIcon />
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

SalesChart.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SalesChart);
