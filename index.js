/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import First from './Screen/First';
import Splash from './Screen/Splash';
import Login from './Screen/User/Login';
import Signup from './Screen/User/Signup';
import Forgot from './Screen/User/Forgotpass';

AppRegistry.registerComponent(appName, () => App);
