export function Error({ message }) {
  return (
    <div className="flex items-center gap-3 justify-center">
      <div className="text-lg font-medium text-red-600">&#128557;{message}</div>
    </div>
  )
}
