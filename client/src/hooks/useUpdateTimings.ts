import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../config/axios'
import toast from 'react-hot-toast'
import { PrayerTimings } from '../types/mosque'

export const useUpdateTimings = (mosqueId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (timings: PrayerTimings) =>
      api.patch(`/admin/mosques/${mosqueId}/prayer-times`, {
        prayerTimings: timings,
      }),
    onSuccess: () => {
      toast.success('Prayer times updated successfully')
      queryClient.invalidateQueries({ queryKey: ['mosque', mosqueId] })
    },
    onError: () => {
      toast.error('Failed to update prayer times')
    },
  })
}
