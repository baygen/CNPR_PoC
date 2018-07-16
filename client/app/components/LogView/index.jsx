import React from 'react';
import style from '../styles';

export default class LogScreen extends React.Component {
  state = {}

  render() {
    const { logs } = this.props;
    return (<div style={style.logContainer} >
      <LogDetails />
      {logs.length ? logs.map((l, i) => (
        <LogDetails
          key={i}
          dateTime={l.dateTime}
          plate={l.plate}
          region={l.region}
          approved={l.isAllowed}
          confidence={l.confidence}
          id={l.id}
        />
      )) : <p style={{ alignSelf: 'center', fontSize: 16 }} >Empty log history</p>}
    </div>)
  }
}

const LogDetails = ({
  dateTime,
  plate,
  confidence,
  approved,
  region,
  id,
  ...props
}) => (
    <div style={{ flex: 1 }}>
      <div style={{
        display: 'flex',
        fontWeight: plate ? 'normal' : 'bold',
        fontSize: plate ? 16 : 24,
        padding: 5,
        flex: 1,
        flexBasis: '3%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: !plate ? 'transparent' : approved ? '#2DB7CA5E' : '#ee336157',
      }}>
        <span style={{ flex: 1, textAlign: 'center' }}>{dateTime || 'TimeStamp'}</span>
        <span style={{ flex: 1, textAlign: 'center' }}>{plate || 'License plate'}</span>
        <span style={{ flex: 1, textAlign: 'center' }}>{region || 'Country'}</span>
        <span style={{ flex: 1, textAlign: 'center' }}>{confidence ? `${('' + confidence).slice(0, 5) + '%'}` : 'Confidence'}</span>
        <span style={{ flex: 1, textAlign: 'center' }}>{plate ? approved ? 'ALLOWED' : 'NOT ALLOWED' : 'Access'}</span>
      </div>
    </div>
  )
