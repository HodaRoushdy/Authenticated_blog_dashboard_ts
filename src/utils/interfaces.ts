export interface ILoginValues {
    email: string;
    password: string;
}

export interface ISignupValues {
    email: string;
    password: string;
    name: string;
    image: string;
    confirmPassword:string
}

export interface IPaginationProps{
    postsPerPage: number,
    totalPosts: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    currentPage: number
}
export interface IError{
    message: string
}
export interface IBlog{
    id:number,
    title:string,
    body:string,
    userId: number
}
export interface IEnteredValues{
    title:string,
    body: string
}