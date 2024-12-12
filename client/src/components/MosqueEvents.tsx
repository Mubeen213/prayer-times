import { ClockIcon } from '@heroicons/react/24/outline'
import { useMosqueEvents } from '../hooks/useMosques'
import { Event } from '../types/event'

interface MosqueEventsProps {
  mosqueId: string
  isVisible: boolean
}

export const MosqueEvents = ({ mosqueId, isVisible }: MosqueEventsProps) => {
  const { data: events, isLoading } = useMosqueEvents(mosqueId, isVisible)

  if (isLoading) {
    return (
      <div className='animate-pulse space-y-4'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='h-16 bg-gray-100 rounded'></div>
        ))}
      </div>
    )
  }

  if (!events?.length) {
    return (
      <div className='text-center py-12 bg-gray-50 rounded-lg'>
        <p className='text-gray-500 text-sm'>No upcoming events scheduled</p>
        <p className='text-gray-400 text-sm mt-1'>
          Check back later for updates
        </p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {events.map((event: Event) => (
        <div
          key={event._id}
          className='bg-white border border-gray-100 rounded-lg p-5 hover:shadow-md transition-shadow duration-200'
        >
          {/* Stack on mobile, flex on desktop */}
          <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
            <div className='space-y-2'>
              <h3 className='text-xl sm:text-lg font-semibold text-gray-900 leading-tight'>
                {event.title}
              </h3>
              {event?.scholar && (
                <p className='text-sm text-green-600'>
                  Speaker: {event.scholar}
                </p>
              )}
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full shrink-0'>
              <ClockIcon className='w-4 h-4 flex-shrink-0' />
              <time>
                {event.date} at {event.time}
              </time>
            </div>
          </div>
          <p className='mt-3 text-gray-600 text-sm leading-relaxed'>
            {event.description}
          </p>
        </div>
      ))}
    </div>
  )
}
