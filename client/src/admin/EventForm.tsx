import { useState } from 'react'
import { useCreateEvent } from '../hooks/useCreateEvent'

interface EventFormProps {
  mosqueId: string
}

interface EventInput {
  title: string
  description: string
  scholar?: string
  date: string
  time: string
}

export const EventForm = ({ mosqueId }: EventFormProps) => {
  const [formData, setFormData] = useState<EventInput>({
    title: '',
    description: '',
    scholar: '',
    date: '',
    time: '',
  })

  const { mutate: createEvent } = useCreateEvent(mosqueId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createEvent(formData, {
      onSuccess: () => {
        setFormData({
          title: '',
          description: '',
          scholar: '',
          date: '',
          time: '',
        })
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Event Title
        </label>
        <input
          type='text'
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Scholar Name
        </label>
        <input
          type='text'
          value={formData.scholar}
          onChange={(e) =>
            setFormData({ ...formData, scholar: e.target.value })
          }
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Description
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Date
          </label>
          <input
            type='date'
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Time
          </label>
          <input
            type='time'
            required
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
          />
        </div>
      </div>

      <button
        type='submit'
        className='w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50'
      >
        Create Event
      </button>
    </form>
  )
}
