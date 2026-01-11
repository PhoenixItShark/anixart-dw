import { BookMarked, Compass, House, UserCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const SideBarNav = () => {
  return (
    <ul className='flex flex-col gap-10 items-center h-full mt-6'>
        <li className='p-2'>
          <Link to={"/"} className='group flex flex-col items-center justify-center'>
            <House className="text-text-primary group-hover:text-text-secondary transition duration-150 hover:text-red" width={32} height={32} />
            <span
              className='
  text-text-secondary mt-3 font-medium
  opacity-0 invisible
  group-hover:opacity-100 group-hover:visible
  transition-all  duration-100 ease-in-out
'
            >
              Главная
            </span>
          </Link>
        </li>
        <li className='p-2'>
          <Link
            to={"/discover"}
            className='flex flex-col items-center justify-center'
          >
            <Compass  className="text-text-primary group-hover:text-text-secondary transition duration-150 hover:text-red" width={32} height={32} />
            <span
              className='
  text-text-secondary mt-3 font-medium
  opacity-0 invisible
  group-hover:opacity-100 group-hover:visible
  transition-all  duration-100 ease-in-out
'
            >
              Обзор
            </span>
          </Link>
        </li>
        <li className='p-2'>
          <Link
            to={"/marks"}
            className='flex flex-col items-center justify-center'
          >
            <BookMarked  className="text-text-primary group-hover:text-text-secondary transition duration-150 hover:text-red" width={32} height={32} />
            <span
              className='
  text-text-secondary mt-3 font-medium
  opacity-0 invisible
  group-hover:opacity-100 group-hover:visible
  transition-all  duration-100 ease-in-out
'
            >
              Закладки
            </span>
          </Link>
        </li>
        <li className='p-2'>
          <Link
            to={"/profile"}
            className='flex flex-col items-center justify-center'
          >
            <UserCircle2  className="text-text-primary group-hover:text-text-secondary transition duration-150 hover:text-red" width={32} height={32} />
            <span
              className='
  text-text-secondary mt-3 font-medium
  opacity-0 invisible
  group-hover:opacity-100 group-hover:visible
  transition-all  duration-100 ease-in-out
'
            >
              Профиль
            </span>
          </Link>
        </li>
      </ul>
  )
}

export default SideBarNav