type Tree<T> = {
    data: T,
    children: Array<Tree<T>>
}