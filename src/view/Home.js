'use strict';

import React, {
    Dimensions,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import LoginNav from './LoginNav';
import SplashScreen from './SplashScreen';

var WINDOW_HEIGHT = Dimensions.get('window').height;

export default class Home extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          splashed: false,
      };
  }

  componentDidMount() {
    TimerMixin.setTimeout(
      () => {
        this.setState({
          splashed: true,
        });
      },
      3000,
    );
  }

  render() {
    if (this.state.splashed) {
      return ( < LoginNav / > );
    } else {
      return ( < SplashScreen / > );
    }
  }
}
