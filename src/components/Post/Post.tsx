import { removePosts, addFavoritePosts } from "../../store/postsSlice"
import { IPost } from "../../models/models"
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'

export function Post({ id, url, title, isFavorite }: IPost) {
  const dispatch = useAppDispatch()
  const { favoriteToggle } = useAppSelector((state) => state.posts)
  
  const removePostsHandler = () => {
    if (!favoriteToggle) {
      dispatch(removePosts({ id }))
    } else {
      dispatch(addFavoritePosts({ id }))
    }
  }

  return (
    <div className="shadow-md rounded-md overflow-hidden relative">
      <img src={url} alt={`${title} image`} loading="lazy"/>
      <div className="p-4">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>

        <button onClick={() => dispatch(addFavoritePosts({ id }))} type="button" className="button px-1 py-1 rounded mt-2 ml-2 absolute top-0 left-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 hover:fill-red-600 hover:stroke-red-600 ${isFavorite ? 'fill-red-600 stroke-red-600' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
        </button>

        <button onClick={removePostsHandler} type="button" className="button px-1 py-1 mt-2 mr-2 absolute top-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  hover:stroke-red-600"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>

      </div>
    </div>
  )
}
