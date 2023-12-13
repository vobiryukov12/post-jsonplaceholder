import { Posts } from './components/Posts'
import { filterFavoritePosts } from './store/postsSlice'
import { useAppSelector, useAppDispatch } from './hooks/hooks'

export default function App() {
  const dispatch = useAppDispatch()
  const { favoriteToggle, error } = useAppSelector((state) => state.posts)

  const filterFavoriteHandler = () => {
    dispatch(filterFavoritePosts({ favoriteToggle: !favoriteToggle }))
  }

  return (
    <div className="container mx-auto px-4 pt-10 pb-10 sm:max-w-screen-sm lg:max-w-screen-lg">
      <h1 className="text-center text-4xl pb-10 font-black">Posts</h1>
      <button onClick={filterFavoriteHandler} disabled={!!error} type="button" className="flex gap-1 mb-4 p-3 shadow-md rounded-md bg-white ease-linear transition-all duration-150 ml-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${!error ? 'hover:fill-red-600 hover:stroke-red-600' : ''} ${favoriteToggle ? 'fill-red-600 stroke-red-600' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
      </button>
      <Posts />
    </div>
  )
}
