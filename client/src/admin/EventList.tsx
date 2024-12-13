import { useState } from 'react'
import { Event } from '../types/event'
import { ClockIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useAllMosqueEvents, useDeleteEvent } from '../hooks/useEvents'

interface EventListProps {
  mosqueId: string
  onEdit: (event: Event) => void
}

export const EventList = ({ mosqueId, onEdit }: EventListProps) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')
  const { data: events, isLoading } = useAllMosqueEvents(mosqueId, true)

  const { mutate: deleteEvent } = useDeleteEvent(mosqueId)

  const today = new Date().toISOString().split('T')[0]

  const filteredEvents = events?.filter((event: Event) => {
    const isPast = event.date < today
    return activeTab === 'past' ? isPast : !isPast
  })

  const handleDelete = async (eventId: string) => {
    deleteEvent(eventId)
  }

  if (isLoading) {
    return (
      <div className='space-y-4'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='animate-pulse bg-white rounded-lg p-6'>
            <div className='h-5 bg-gray-200 rounded w-3/4 mb-3'></div>
            <div className='h-4 bg-gray-200 rounded w-1/2'></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Tabs */}
      <div className='flex gap-4 border-b'>
        {(['upcoming', 'past'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
          </button>
        ))}
      </div>

      {/* Events */}
      <div className='grid gap-4'>
        {filteredEvents?.map((event: Event) => (
          <div
            key={event._id}
            className='bg-white p-4 sm:p-6 rounded-lg shadow-sm space-y-3'
          >
            <div className='flex justify-between items-start'>
              <div>
                <h3 className='text-lg font-medium text-gray-900'>
                  {event.title}
                </h3>
                {event.scholar && (
                  <p className='text-sm text-green-600 mt-1'>
                    Speaker: {event.scholar}
                  </p>
                )}
              </div>
              <div className='flex gap-2'>
                {activeTab === 'upcoming' && (
                  <button
                    onClick={() => onEdit(event)}
                    className='p-1 text-gray-400 hover:text-gray-600'
                  >
                    <PencilIcon className='w-4 h-4' />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(event._id)}
                  className='p-1 text-gray-400 hover:text-red-600'
                >
                  <TrashIcon className='w-4 h-4' />
                </button>
              </div>
            </div>

            <p className='text-sm text-gray-600'>{event.description}</p>

            <div className='flex items-center text-sm text-gray-500'>
              <ClockIcon className='w-4 h-4 mr-1.5' />
              <time>
                {event.date} at {event.time}
              </time>
            </div>
          </div>
        ))}

        {!filteredEvents?.length && (
          <div className='text-center py-12 bg-gray-50 rounded-lg'>
            <p className='text-gray-500'>No {activeTab} events</p>
          </div>
        )}
      </div>
    </div>
  )
}
