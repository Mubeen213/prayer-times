import { useState } from 'react'
import { Event } from '../types/event'
import { EventList } from './EventList'
import { EventForm } from './EventForm'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface EventManagementProps {
  mosqueId: string
}

export const EventManagement = ({ mosqueId }: EventManagementProps) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleClose = () => {
    setIsFormOpen(false)
    setSelectedEvent(null)
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-lg font-semibold text-gray-900'>Events</h2>
        <button
          onClick={() => (isFormOpen ? handleClose() : setIsFormOpen(true))}
          className='inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
        >
          {isFormOpen || selectedEvent ? (
            <>
              <XMarkIcon className='w-5 h-5 mr-1.5' />
              Cancel
            </>
          ) : (
            <>
              <PlusIcon className='w-5 h-5 mr-1.5' />
              Add Event
            </>
          )}
        </button>
      </div>

      {isFormOpen || selectedEvent ? (
        <div className='rounded-lg shadow-sm'>
          <EventForm
            mosqueId={mosqueId}
            event={selectedEvent}
            onClose={handleClose}
          />
        </div>
      ) : (
        <EventList mosqueId={mosqueId} onEdit={setSelectedEvent} />
      )}
    </div>
  )
}
