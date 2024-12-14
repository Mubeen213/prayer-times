import { useState } from 'react'
import { useCreateEvent, useUpdateEvent } from '../hooks/useEvents'
import { Event } from '../types/event'

interface EventFormProps {
  mosqueId: string
  event: Event | null
  onClose: () => void
}

export const EventForm = ({ mosqueId, event, onClose }: EventFormProps) => {
  const [formData, setFormData] = useState<Omit<Event, '_id' | 'mosqueId'>>({
    title: event?.title || '',
    description: event?.description || '',
    scholar: event?.scholar || '',
    date: event?.date || '',
    time: event?.time || '',
  })

  const { mutate: createEvent, isPending: isCreating } =
    useCreateEvent(mosqueId)
  const { mutate: updateEvent, isPending: isUpdating } =
    useUpdateEvent(mosqueId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (event) {
      updateEvent({ ...formData, _id: event._id }, { onSuccess: onClose })
    } else {
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
      onClose()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white rounded-lg shadow-sm space-y-6'
    >
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-medium text-gray-900'>
          {event ? 'Edit Event' : 'Create Event'}
        </h3>
      </div>
      <div>
        <label className='p-2 block text-sm font-medium text-gray-700'>
          Event Title
        </label>
        <input
          type='text'
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className='w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent hover:bg-white transition-colors duration-200'
          placeholder='Enter event title'
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
          className='w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent hover:bg-white transition-colors duration-200'
          placeholder='Enter scholar name'
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
          className='w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent hover:bg-white transition-colors duration-200'
          placeholder='Add description'
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
            className='p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
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
            className='p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
          />
        </div>
      </div>

      <button
        type='submit'
        className='w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50'
      >
        {isCreating || isUpdating
          ? 'Saving...'
          : event
          ? 'Update Event'
          : 'Create Event'}
      </button>
    </form>
  )
}
