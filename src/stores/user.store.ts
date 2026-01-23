import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CustomUser } from '@/lib/types/user.type'

type CustomUserState = {
  userData: CustomUser
  updateUserData: (data: CustomUser) => void
}

const initialUserState: CustomUser = {
  userId: '',
  employeeId: '',
  email: '',
  name: '',
  role: '',
}

export const useCustomUserStore = create<CustomUserState>()(
  persist(
    (set) => ({
      userData: initialUserState,
      updateUserData: (data) => set(() => ({ userData: { ...data } })),
    }),
    {
      name: 'custom-user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
