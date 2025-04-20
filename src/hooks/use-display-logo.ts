import { create } from 'zustand'

interface DisplayLogoStore {
  displayLogo: boolean
  setDisplayLogo: (value: boolean) => void
}

const useDisplayLogo = create<DisplayLogoStore>((set) => ({
  displayLogo: false,
  setDisplayLogo: (value: boolean) => set({ displayLogo: value }),
}))

export default useDisplayLogo
