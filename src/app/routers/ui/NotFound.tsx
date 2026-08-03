import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

const NotFound = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center gap-4'>
      <Compass className='text-red' width={64} height={64} />
      <h1 className='text-4xl font-bold text-text-secondary'>404</h1>
      <p className='text-text-primary'>Эта страница ещё в разработке</p>
      <Link
        to='/'
        className='bg-red text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition'
      >
        На главную
      </Link>
    </div>
  )
}

export default NotFound
