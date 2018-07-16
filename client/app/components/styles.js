const FONT_FAMILY = "Roboto";

export default {
  appContainer: {
    fontFamily: FONT_FAMILY
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  flexRowAroundCentered: {
    alignContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  fontSize20: {
    fontSize: 20
  },
  flexColumnCentered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
    flex: 1,
    padding: 20,
    alignContent: 'flex-start',
    border: '2px solid #0B314F',
  },
  logContainer: {
    justifyContent: 'space-around',
    backgroundColor: '#90afd21a',
    margin: 20,
    flex: 1,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid #0B314F',
    fontFamily: 'Lato',
    fontSize: 20
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'start'
  },
  numberRow: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    width: 240,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  numberPlate: {
    margin: 0, padding: 0,
    border: '1px solid black', borderRadius: 2,
    width: '105px', textAlign: 'center',
    fontSize: 16
  },
  verticalCenteredContainer: {
    display: 'flex',
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  navbar: {
    display: 'flex',
    backgroundColor: '#0B314F',
    flexDirection: 'row', alignContent: 'center', flex: 1, justifyContent: 'space-around',
    height: 75,
    fontFamily: 'Roboto',
    alignItems: 'center',
    fontSize: 20
  },
  navbarPicture: {
    maxHeight: '80%',
  },
  navbarLink: {
    color: 'gray',
    textDecoration: 'none'
  },
  navbarLinkActive: {
    color: 'white',
    textDecoration: 'none'
  }
}