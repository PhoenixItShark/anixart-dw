import { Forward } from 'lucide-react';
import { useNavigate } from 'react-router-dom'


const ForwardButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className='group absolute right-0 p-2 rounded-md bg-text-primary max-w-fit hover:scale-110 transition'>
      <Forward className='text-text-secondary -scale-x-100 w-8 h-8 group-hover:text-red transition' />
    </button>
  )
}

export default ForwardButton