import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { IPost, IStatePosts } from "../models/models"

export const fetchPosts = createAsyncThunk('posts/fetch', async(url: string) => {
  const response = await fetch(url) 
  const data: IPost[] = await response.json()
  data.forEach(postData => {
    postData.isFavorite = false
  })
  return data
})

const filter = (state: IPost[], action: PayloadAction<{id: number}>): IPost[] => {
  return state.filter((post) => post.id !== action.payload.id)
}

const initialState: IStatePosts = {
  posts: [],
  favoritePosts: [],
  favoriteToggle: false,
  loading: false,
  error: '',
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePosts(state, action: PayloadAction<{id: number}>) {
      const statePosts = state.favoriteToggle ? 'favoritePosts' : 'posts';
      state[statePosts] = filter(state[statePosts], action)
    },
    addFavoritePosts(state, action: PayloadAction<{id: number}>) {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          post.isFavorite = !post.isFavorite
        }

        return post
      })

      if (state.favoriteToggle) {
        state.favoritePosts = filter(state.favoritePosts, action)
      }
    },
    filterFavoritePosts(state, action: PayloadAction<{favoriteToggle: boolean}>) {
      state.favoriteToggle = action.payload.favoriteToggle
      state.favoritePosts = state.posts.filter((post) => post.isFavorite)
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false
      state.posts = action.payload
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
}
})

export const { removePosts, filterFavoritePosts, addFavoritePosts } = postsSlice.actions
export default postsSlice.reducer
