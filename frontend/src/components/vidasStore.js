// vidasStore.js
import { create } from "zustand";

const useVidasStore = create((set) => ({
  vidas: 5,
  setVidas: (nuevasVidas) => set({ vidas: nuevasVidas }),
}));

export default useVidasStore;
