import { Post } from '../Post'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'
import { fetchPosts } from '../../store/postsSlice'
import { useEffect } from 'react'
import { Error } from '../Error'
import { Loading } from '../Loading'

export function Posts() {
  const dispatch = useAppDispatch()
  const { posts, loading, error, favoritePosts, favoriteToggle } = useAppSelector((state) => state.posts)

  useEffect(() => {
    dispatch(fetchPosts(import.meta.env.VITE_APP_PHOTOS_URL))
  }, []);

  const statePosts = favoriteToggle ? favoritePosts : posts;

  return (
    <>
      {
        posts && posts.length > 0
        ?
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          { statePosts.map((post) => <Post key={post.id} {...post} />) }
        </div>
        :
        <>
          { loading && <Loading /> }
          { error && <Error message={error} /> }
        </>
      }
      { 
        favoritePosts.length === 0 && favoriteToggle &&
        <div className="text-lg font-medium flex justify-center">
          Здесь будут посты добавленные в избранное
        </div> 
      }
    </>
  )
}
