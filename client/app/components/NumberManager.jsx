import React from 'react';
import style from './styles';

export default class NumberManager extends React.Component {
  state = {
    newPlate: '',
    warning: false
  }

  pattern = new RegExp(/([A-Z]{2})([0-9]{4})([A-Z]{2})/, 'g');

  addNumberToList = () => {
    if (!this.state.newPlate || this.state.warning) return;
    this.props.onAdd(this.state.newPlate);
    this.setState({ newPlate: '' })
  }

  _onAddNumberChange = ({ target }) => {
    this.setState({
      newPlate: target.value.toUpperCase().slice(0, 8)
    },
      () => this.setState({ warning: !this.state.newPlate.replace(' ', '').match(this.pattern) })
    )
  };

  render() {
    const { newPlate, warning } = this.state;
    const { plates } = this.props;
    return (
      <div style={{ ...style.pageContainer, ...style.listContainer, ...{ fontFamily: 'Lato' } }}>

        <div style={{ flexDirection: 'column', flex: 1 }} >
          <p style={{ fontSize: 20, margin: 10 }}>Car license number plates white list</p>
          {plates.length ?
            plates.map(({ id, plate, isAllowed }, index) => (
              <CarPlate
                key={index + plate}
                index={id}
                onDelete={() => this.props.onDelete({ id, plate })}
                onStatusChange={() => this.props.onStatusChange(id, isAllowed)}
                value={plate}
                isAllowed={isAllowed} />))
            : <p>Empty white list</p>
          }
        </div >
        <AddCarNumber
          warning={warning}
          onInput={this._onAddNumberChange}
          value={newPlate}
          onSubmit={this.addNumberToList}
        />
      </div>)
  }
}

const CarPlate = ({ onDelete, value, index, onStatusChange, isAllowed }) => (
  <div style={style.numberRow}>
    <p style={{ margin: 0, padding: 0, fontSize: 24, marginRight: 5 }} >{`ID: ${index}.`}</p>
    <p style={style.numberPlate} >{` ${value}`}</p>
    <input style={{ flex: 1 }}
      type='checkbox'
      checked={isAllowed}
      onChange={onStatusChange}
      />
    <button onClick={onDelete} style={{
      border: '0',
      flex: 1,
      backgroundColor: 'transparent',
    }} >

      <img src="https://image.flaticon.com/icons/svg/189/189678.svg" style={{ width: 20, height: 20 }} />
    </button>
  </div>
)

const AddCarNumber = ({ onInput, onSubmit, value, warning }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    flexWrap: 'wrap'
  }}>
    <input type="text"
      onChange={onInput}
      style={{
        fontSize: 20,
        borderColor: warning ? 'red' : 'green',
        flex: 1
      }}
      placeholder='License plate'
      value={value} />
    <button onClick={onSubmit}
      disabled={warning}
      style={{
        flex: 1,
        backgroundColor: '#1958A8',
        margin: 5,
        color: 'white',
        border: '2px solid #0B314F',
        borderRadius: 1,
        textAlign: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 24
      }}>Add to list</button>
  </div>
)
