import { Link } from 'react-router-dom'
  
const Avatar = () => {
  return (
    <Link to="/profile">
      <img className='rounded-full' src="/img/ava.jpg" alt="User Avatar" width={48} height={48} />
    </Link>
  )
}

export default Avatar