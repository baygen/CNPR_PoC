import React from 'react';
import style from './styles';
import io from 'socket.io-client';

export default class RecognitionResultPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      plate: '',
      confidence: 0,
      dateTime: null,
      // approved,
      // id
    }
    this.socket = io();
    this.socket.on('connect', () => {
      console.log('Socket HomePage connected')
      console.log(this.socket.id); // 'G5p5...'
      this.socket.on('plate', this.handlePlateResult);
    });
  }

  handlePlateResult = ({
    dateTime,
    plate,
    confidence,
    approved,
    region,
    id }) => this.setState({ plate, confidence, dateTime, approved, id, region })

  componentWillMount() {
    this.socket.connect()
  }

  componentWillUnmount() {
    console.log('HOME PAGE componentWillunmount')
    this.socket.disconnect();
  }

  render() {
    // const { plate, confidence, dateTime, approved, id } = this.state;
    const { plate, confidence, dateTime, approved, region, id } = this.state;

    return (
      <div style={{ ...style.pageContainer, ...style.verticalCenteredContainer, ...{ fontFamily: 'Lato' }  }}>
        {plate ? (
          <Plate
            number={plate}
            isInWhiteList={approved}
          />)
          : <span style={{ fontSize: 30 }} >No plates found!</span>
        }

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'flex-start',
          padding: 20,
          paddingRight: 40,
          border: '2px solid #0B314F',
        }}>
          <span style={{ fontSize: 24, }}>Detailed data:</span>
          <span>Date: {dateTime}</span>
          <span>Region: {region && region.toUpperCase()}</span>
          <span>ID: {id}</span>
          <span>Confidence: {confidence}</span>
          <span>Access:
            <span style={{ color: `${approved ? 'green' : 'red'}` }}>
              {plate && (approved ? ' allowed' : ' denied')}
            </span>
          </span>
        </div>
      </div>)
  }
}

const Plate = ({ number, isInWhiteList }) => (
  <span style={{
    border: `4px solid ${isInWhiteList ? 'green' : 'red'}`,
    borderRadius: 5,
    flex: 1,
    padding: 20, // paddingRight: 10,
    fontSize: 60
  }}>
    {number}
  </span>
)
