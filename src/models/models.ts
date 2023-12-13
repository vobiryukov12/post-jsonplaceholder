export interface IPost {
  id: number,
  title: string,
  url: string,
  isFavorite: boolean
}

export interface IStatePosts {
  posts: IPost[],
  favoritePosts: IPost[],
  favoriteToggle: boolean,
  loading: boolean,
  error: string | undefined
}
