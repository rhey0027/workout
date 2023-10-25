import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {

    const {logout} = useLogout();
    const { user } = useAuthContext();


    const handleLogout = () => {
        logout()
    }
    return (
        <nav>
            <div className="container">
                <Link to='/'>
                    <h2>Gym Buddy Logger</h2>
                </Link>
                {user && (
                <div className='userContainer'>
                    <span>{user.email}</span>
                    <div className='logoutBtn' onClick={handleLogout}>Logout</div>
                </div>
                )}
                {!user && (
                <div className='navBtn'>
                    <Link to='/login'className='loginBtn'>Login</Link>
                    <Link to='/signup'>Signup</Link>
                </div>
                )}
            </div> 
        </nav>
    );
}
 
export default Navbar;