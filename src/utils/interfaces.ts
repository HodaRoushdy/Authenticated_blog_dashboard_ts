/** login data interface */
export interface ILoginValues {
    email: string;
    password: string;
}

/** signup data interface */
export interface ISignupValues {
    email: string;
    password: string;
    name: string;
    image: string;
    confirmPassword:string
}

/** pagination props interface */
export interface IPaginationProps{
    postsPerPage: number,
    totalPosts: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    currentPage: number
}

/** error interface */
export interface IError{
    message: string
}

/** blog data interface */
export interface IBlog{
    id:number,
    title:string,
    body:string,
    userId: number
}
/** create blog data interface */
export interface IEnteredValues{
    title:string,
    body: string
}