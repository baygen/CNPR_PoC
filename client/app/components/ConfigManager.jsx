import React from 'react';
import style from './styles';
import io from 'socket.io-client';

export default class ConfigManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // minNumberLength: 7, confidence: 70, delay: 100
    }
  }

  componentDidMount() {
    console.log('config did mount')
    this.setState({ ...this.props.config })
  }

  _onChange = ({ target }) => {
    this.setState({ [target.name]: target.value < 0 ? 0 : target.value })
  }

  triggerChangeAndSave = type => {
    this.state[type] && this.props.onSave(this.state)
    this.setState({ [type]: !this.state[type] })
  }

  render() {
    const { minNumberLength, confidence, delay, editConfidence, editLength, editDelay } = this.state//this.props.config || {};

    return (
      <div style={configStyle.container}>

        <div style={configStyle.row}>
          <label style={configStyle.labelName}> Minimal license length: </label>
          {!editLength ? <label style={configStyle.labelName}> {minNumberLength} </label> :
            <input type="number"
              min={0}
              name='minNumberLength'
              onChange={this._onChange}
              style={configStyle.input}
              placeholder='Min number length'
              value={minNumberLength} />}

          <label
            style={configStyle.trigger}
            onClick={() => this.triggerChangeAndSave('editLength')}
          >{editLength ? 'Save' : 'Edit'}</label>

        </div>

        <div style={configStyle.row}>
          <label style={configStyle.labelName}> Minimal confidence : </label>
          {!editConfidence ? <label style={configStyle.labelName}> {confidence} %</label> :
            <input type="number"
              name='confidence'
              onChange={this._onChange}
              style={configStyle.input}
              placeholder='Confidence'
              value={confidence} />}
          <label
            style={configStyle.trigger}
            onClick={() => this.triggerChangeAndSave('editConfidence')}
          >{editConfidence ? 'Save' : 'Edit'}</label>

        </div>

        <div style={configStyle.row}>
          <label style={configStyle.labelName}> Minimal delay : </label>
          {!editDelay ? <label style={configStyle.labelName}> {delay} ms</label> :
            <input type="number"
              name='delay'
              onChange={this._onChange}
              style={configStyle.input}
              placeholder='Delay'
              value={delay} />}
          <label
            style={configStyle.trigger}
            onClick={() => this.triggerChangeAndSave('editDelay')}
          >{editDelay ? 'Save' : 'Edit'}</label>

        </div>

      </div>)
  }
}

const configStyle = {
  row: {
    ...style.flexRowAroundCentered,
    ...style.fontSize20,
    flex: 1, display: 'block', margin: 10
  },
  input: {
    lineHeight: '22px',
    fontSize: 20,
    width: 80
  },
  labelName: {
    flex: 1
  },
  trigger: {
    color: '#0B314F', fontSize: 14, paddingLeft: 20
  },
  container: {
    ...style.pageContainer, //...style.verticalCenteredContainer,
    justifyContent: 'space-around',
    alignSelf: 'flex-start',
    fontFamily: 'Lato'
  }
}
