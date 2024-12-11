import { useState } from 'react'
import toast from 'react-hot-toast'

interface EventFormData {
  title: string
  scholar: string
  description: string
  date: string
  time: string
}

export const EventForm = () => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    scholar: '',
    description: '',
    date: '',
    time: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Event created successfully')
      setFormData({
        title: '',
        scholar: '',
        description: '',
        date: '',
        time: '',
      })
    } catch (error: unknown) {
      console.error(error)
      toast.error('Failed to create event')
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyles =
    'w-full px-4 py-3 rounded-lg border border-gray-200 bg-white transition-all duration-200'

  return (
    <div className='container bg-white rounded-lg shadow-md'>
      <form onSubmit={handleSubmit} className='space-y-6 p-6'>
        <h2 className='text-xl font-semibold text-gray-900'>Add New Event</h2>

        <div className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Event Title
            </label>
            <input
              type='text'
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={inputStyles}
              placeholder='Enter event title'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Scholar Name
            </label>
            <input
              type='text'
              required
              value={formData.scholar}
              onChange={(e) =>
                setFormData({ ...formData, scholar: e.target.value })
              }
              className={inputStyles}
              placeholder='Enter event title'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className={`${inputStyles} resize-none`}
              placeholder='Enter event description'
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Date
              </label>
              <input
                type='date'
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className={inputStyles}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Time
              </label>
              <input
                type='time'
                required
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className={inputStyles}
              />
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-3 pt-4'>
          <button
            type='submit'
            className='px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                    fill='none'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
                <span>Creating Event...</span>
              </>
            ) : (
              'Create Event'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
