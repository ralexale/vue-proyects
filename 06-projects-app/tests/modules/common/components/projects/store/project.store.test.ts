import { useProjectsStore } from "@/modules/projects/store/projects.store"
import { createPinia, setActivePinia } from "pinia"

describe('project store', () => {

    beforeEach(() => {
      setActivePinia(createPinia())
    })

  test('should return default values', () => {
    

    const projectStore = useProjectsStore()
  })
})