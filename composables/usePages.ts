import { ref, computed } from 'vue'

interface Page {
  id: number
  name: string
  current: boolean
  slug: string
  children?: Page[]
}

const pages = ref([
  { id: 0, name: 'Home', current: true, slug: '/' },
  {
    id: 1,
    name: 'Projects',
    current: false,
    slug: '/projects',
    children: [
      { id: 10, name: 'Project Thoughts', current: false, slug: '/' },
      { id: 11, name: 'Frontend', current: false, slug: '/frontend' },
      { id: 12, name: 'Backend', current: false, slug: '/backend' },
      { id: 13, name: 'Business', current: false, slug: '/business' }
    ]
  },
  {
    id: 2,
    name: 'Design',
    current: false,
    slug: '/design',
    children: [
      { id: 20, name: 'Design  Thoughts', current: false, slug: '/' },
      { id: 21, name: 'Data', current: false, slug: '/data' },
      { id: 22, name: 'Lists', current: false, slug: '/lists' },
      { id: 23, name: 'Mobile', current: false, slug: '/mobile' },
      { id: 24, name: 'User Interface', current: false, slug: '/user-interface' },
      { id: 25, name: 'Basic', current: false, slug: '/basic' },
      { id: 26, name: 'Patterns', current: false, slug: '/patterns' }
    ]
  },
  {
    id: 3,
    name: 'Code',
    current: false,
    slug: '/code',
    children: [
      { id: 30, name: 'Code Thoughts', current: false, slug: '/' },
      { id: 31, name: 'Challenges', current: false, slug: '/challenges' }
    ]
  },
  {
    id: 4,
    name: 'Tech',
    current: false,
    slug: '/tech',
    children: [
      { id: 40, name: 'Tech Thoughts', current: false, slug: '/' },
      { id: 41, name: 'My Stack', current: false, slug: '/my-stack' }
    // { id: 40, name: 'projects', current: false, slug: '/4projects' },
    ]
  }
] as Page[])

const currentPage = ref('Home')

export default function usePages () {
  function changePage (p: Page) {
    if (p.current) { return }
    // Set all current to false
    pages.value.forEach((page) => {
      page.current = false
      page.children?.forEach(c => c.current = false)
    })
    // Main pages
    if (p.id < 10) {
      pages.value.find(page => page.id === p.id ? page.current = true : null)
      return
    }
    // child pages
    pages.value.find((page) => {
      page.children?.find((child) => {
        if (child.id === p.id) {
          page.current = true
          child.current = true
        }
      })
    })
  }

  return {
    currentPage: computed(() => currentPage.value),
    setPage: (newPage: string) => { currentPage.value = newPage },
    pages: computed(() => pages.value),
    tabs: (currentPage: string) => pages.value.find(p => p.name.toLocaleLowerCase() === currentPage)
  }
}
