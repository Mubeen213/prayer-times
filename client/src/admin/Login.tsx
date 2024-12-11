import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Add auth logic here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      navigate('/admin/dashboard')
    } catch (error) {
      console.error(error)
      toast.error('Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyles =
    'w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200'

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-xl p-8 space-y-8'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
              Welcome Back
            </h1>
            <p className='mt-2 text-sm text-gray-600'>
              Sign in to manage your mosque
            </p>
          </div>

          <form onSubmit={handleLogin} className='space-y-6'>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Username
                </label>
                <input
                  type='text'
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={inputStyles}
                  placeholder='Enter your username'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Password
                </label>
                <input
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputStyles}
                  placeholder='Enter your password'
                />
              </div>
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='w-full py-3 px-4 flex items-center justify-center rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50'
            >
              {isLoading ? (
                <>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
