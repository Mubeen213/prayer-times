import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../config/axios'
import toast from 'react-hot-toast'

interface EventInput {
  title: string
  description: string
  scholar?: string
  date: string
  time: string
}

interface UpdateEventInput extends EventInput {
  _id: string
}

export const useCreateEvent = (mosqueId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: EventInput) => {
      const response = await api.post(`/admin/mosques/${mosqueId}/events`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mosque-events', mosqueId] })
      toast.success('Event created successfully')
    },
  })
}

export const useAllMosqueEvents = (mosqueId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['mosque-events', mosqueId],
    queryFn: async () => {
      const { data } = await api.get(`/admin/mosques/${mosqueId}/events`)
      return data
    },
    enabled: enabled,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  })
}

export const useUpdateEvent = (mosqueId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateEventInput) => {
      const response = await api.patch(
        `/admin/mosques/${mosqueId}/events/${data._id}`,
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

export const useDeleteEvent = (mosqueId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (eventId: string) => {
      const response = await api.delete(
        `/admin/mosques/${mosqueId}/events/${eventId}`
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mosque-events', mosqueId],
      })
      toast.success('Event deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete event')
    },
  })
}
