import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../config/axios'
import toast from 'react-hot-toast'

interface EventInput {
  title: string
  description: string
  scholar?: string
  date: string
  time: string
}

export const useCreateEvent = (mosqueId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: EventInput) => {
      const response = await api.post(`/events/mosque/${mosqueId}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mosque-events', mosqueId] })
      toast.success('Event created successfully')
    },
  })
}

export const useUpdateEvent = (mosqueId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      eventId,
      data,
    }: {
      eventId: string
      data: Partial<EventInput>
    }) => {
      const response = await api.patch(
        `/events/mosque/${mosqueId}/event/${eventId}`,
        data
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mosque-events', mosqueId] })
      toast.success('Event updated successfully')
    },
  })
}
