import { Shell } from 'lucide-react'
import { LoginForm } from '@features/Auth'

const Auth = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center bg-background-primary relative overflow-hidden'>
      <div className='absolute -top-40 -left-40 w-96 h-96 bg-red/20 blur-[120px] rounded-full' />
      <div className='absolute -bottom-40 -right-40 w-96 h-96 bg-red/10 blur-[120px] rounded-full' />

      <div className='relative z-10 flex flex-col items-center gap-8 w-full max-w-sm px-4'>
        <div className='flex items-center gap-3'>
          <Shell className='w-12 h-12 text-red' />
          <h1 className='text-3xl font-bold text-text-secondary'>Anixart</h1>
        </div>

        <LoginForm />

        <p className='text-text-primary text-sm'>
          Неофициальный клиент для ПК
        </p>
      </div>
    </div>
  )
}

export default Auth
