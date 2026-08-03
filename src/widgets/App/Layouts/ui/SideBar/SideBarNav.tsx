import { BookMarked, Compass, House, UserCircle2 } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const NAV = [
  { to: '/', icon: House, label: 'Главная' },
  { to: '/discover', icon: Compass, label: 'Обзор' },
  { to: '/marks', icon: BookMarked, label: 'Закладки' },
  { to: '/profile', icon: UserCircle2, label: 'Профиль' },
]

const SideBarNav = () => {
  return (
    <ul className='flex flex-col gap-10 items-center h-full mt-6'>
      {NAV.map(({ to, icon: Icon, label }) => (
        <li key={to} className='p-2'>
          <NavLink to={to} className='group flex flex-col items-center justify-center'>
            {({ isActive }) => (
              <>
                <Icon
                  className={`transition duration-150 ${
                    isActive ? 'text-red' : 'text-text-primary group-hover:text-text-secondary'
                  }`}
                  width={32}
                  height={32}
                />
                <span
                  className={`
                    mt-3 font-medium transition-all duration-100 ease-in-out
                    ${isActive ? 'text-red opacity-100 visible' : 'text-text-secondary opacity-0 invisible group-hover:opacity-100 group-hover:visible'}
                  `}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default SideBarNav
