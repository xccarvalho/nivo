import { Plus, Search, FileDown, MoreHorizontal } from 'lucide-react';
import { Header } from './components/header';
import { Tabs } from './components/tabs';
import { Button } from './components/ui/button';
import { Control, Input } from './components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Pagination } from './components/pagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom';

export interface TagResponse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: Tag[]
}

export interface Tag {
  title: string
  slug: string
  amountOfVideos: number
  id: string
}


export function App() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const { data: tagsResponse, isLoading } = useQuery<TagResponse>({
    // The cash is stored by key ('get-tags') and each time that browsing a different page is created a cache for each list ('get-tags')
    queryKey: ['get-tags', page],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/tags?_page=${page}&_per_page=10`)
      const data = await response.json()

      // give me a 2s delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      return data
    },
    // to not "blink" the screen content
    placeholderData: keepPreviousData,
    // Set how much time cash stay stored - It is in ms(milliseconds)
    staleTime: 1000 * 60
  })

  if (isLoading) {
    return null
  }

  return (
    <div className="py-10 space-y-8">
      <div>
        <Header />
        <Tabs />
      </div>
      <main className="max-w-6xl mx-auto space-y-5">
        <div className='flex items-center gap-3'>
          <h1 className="text-xl font-bold">Tags</h1>
          <Button variant='primary'>
            <Plus className='size-3' />
            Create
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <Input variant='filter'>
            <Search className='size-3' />
            <Control placeholder='Search tags..' />
          </Input>
          <Button>
            <FileDown className='size-3' />
            Export
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Amount of videos</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* JS to create a array to repeat fake data 
            {Array.from({ length: 10 }).map((_value, index) => { */}
            {tagsResponse?.data.map((tag) => {
              return (
                <TableRow key={tag.id}>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className='flex flex-col gap-0.5'>
                      <span className='font-medium'>{tag.title}</span>
                      <span className='text-xs text-zinc-500 uppercase'>{tag.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className='text-zinc-300'>
                    {tag.amountOfVideos} {tag.amountOfVideos > 1 ? 'videos' : 'video'}
                  </TableCell>
                  <TableCell className='text-right'>
                    <Button size='icon'>
                      <MoreHorizontal className='size-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {tagsResponse &&
          <Pagination pages={tagsResponse.pages} items={tagsResponse.items} page={page} />
        }
      </main>
    </div>
  )
}