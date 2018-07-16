import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

import { config } from '../../config';

import LogScreen from './components/LogView';
import RecognitionResultPage from './components/RecognitionResultPage';
import NumberManager from './components/NumberManager';
import NavBar from './components/NavBar';
import ConfigManager from './components/ConfigManager';

import style from './components/styles';


export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      plates: [],
      logs: [],

    };
    console.log('API : ' + config.API)
    // this.socket = io();
    this.socket = io();
    this.socket.on('connect', () => {
      console.log('Socket front end connected')
      console.log(this.socket.id);
    });
    // this.socket.on('plate', plate => {
    //   console.log('this.socket.on("plate") recognized: ' + plate.plate);
    //   this.onPlateDetected(plate)
    // });
    this.socket.on('log', logs => this.setState({ logs }));
    this.socket.on('plates', plates => {
      console.log('this.socket.on("plates") length ' + plates.length);
      this.setState({ plates })
    });
    this.socket.on('config', config => this.setState({ config }))
  }

  componentDidMount() {
    // console.log('Main did mount')
    // this.refreshPlates();
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  // refreshPlates = () => {
  //   axios.get('http://localhost:8080/plates')
  //     .then(({ data }) => this.setState({ plates: data }))
  // }

  addNumberToList = (plate) => {
    console.log('Emit plate: ' + plate)
    this.socket.emit('plate', plate)
  }

  onPlateDelete = ({ id, plate }) => {
    axios.delete(`${config.API}/plates/${plate}`)
  };

  saveConfig = config => this.socket.emit('config', config)

  onPlateDetected = (recognizedPlate) => this.setState({ recognizedPlate })

  onPlateStatusChange = (id, curValue) => {
    this.socket.emit('plate.status', { id, isAllowed: !curValue })
  }

  render() {
    const { plates, logs, recognizedPlate, config } = this.state;

    return (
      <div style={style.appContainer}>
        <Switch>
          <NavBar />
        </Switch>
        <Switch>
          <Route
            exact
            path='/recognition'
            render={(props) => (
              <RecognitionResultPage
                {...props}
                recognizedPlate={recognizedPlate} />)} />

          <Route path='/log'
            render={(props) => (
              <LogScreen
                {...props}
                logs={logs} />)} />

          <Route path='/list'
            render={(props) => (
              <NumberManager
                {...props}
                plates={plates}
                onStatusChange={this.onPlateStatusChange}
                onAdd={this.addNumberToList}
                onDelete={this.onPlateDelete} />)} />
          <Route path='/config'
            render={(props) => (
              <ConfigManager
                {...props}
                config={config}
                onSave={this.saveConfig}
              />)} />

        </Switch>
        <a href='https://www.eliftech.com'
          target='_blank'
        >
          <img
            src={'/pics/VER2-BLUE.png'}
            style={{
              maxWidth: '50%',
              alignSelf: 'center'
            }}
            onClick={() => { }}
            onBlur={() => console.log('blur')} />
        </a>
      </div>
    )
  }
}
