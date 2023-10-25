import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const { signup, error, isLoading } = useSignup()  

    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log(email, password)
        await signup(email, password)
    }

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h2>Sign up</h2>

            <label>Email</label>
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            <label>Password</label>
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            <button disabled={isLoading}>Sign up</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}
 
export default Signup;