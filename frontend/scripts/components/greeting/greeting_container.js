import { connect } from 'react-redux';
import { login, logout } from '../../actions/session_actions';
import Greeting from './greeting';

const mapStateToProps = ({ session }) => ({
	currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
	login: (provider) => dispatch(login(provider)),
	logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);
