import { useQuery } from "@tanstack/react-query";
import errorAnimation from "../../../public/error.json";
import loadingAnimation from "../../../public/loading.json";
import styles from "./blogs.module.css";
import Lottie from "lottie-react";
import {  Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { IBlog, IError } from "../../utils/interfaces";


/** the main function to fetch data */
 export const fetchBlogs = async () => {
  try {
		const blogs = await fetch("https://jsonplaceholder.typicode.com/posts");
		return blogs.json();
	} catch (error: IError | any) {
		throw Error(`can not reach the resource ${error.message}`);
	}
};

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  /** tanstack query to fetch blogs and cache result */
  const { data, isPending, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    staleTime: Number(import.meta.env.VITE_STALE_TIME) || 10000
  });

  /** render blogs based on current page */
  const currentPosts =
    !isPending && data.length > 0 && data.slice(firstPostIndex, lastPostIndex);

  return (
    <div className={styles.blogsContainer}>
      <div className={styles.header}>
        <h1>Explore Blogs</h1>
      </div>
      {isError ? (
        <Lottie animationData={errorAnimation} loop={true} />
      ) : (!isPending && currentPosts.length > 0) ? (
        <div className={styles.blogs}>
          { currentPosts.map((blog:IBlog) => (
          <div className={styles.blogCard} key={blog.id}>
            <div className={styles.titleSec}>
              <h2>{blog.title}</h2>
            </div>
            <div className={styles.bodySec}>
              <p>{blog.body}</p>
            </div>
            <Link to={`/blogs/blog-details/${blog.id}`} className={styles.arrowSec}>view details <ArrowForwardIcon/> </Link>
          </div>
        ))}
        </div>
      ) : (
        <Lottie animationData={loadingAnimation} loop={true} />
      )}

      {/** pagination section */ }
      {(!isPending && data.length > 0 ) && (
        <div>
          <Pagination
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            totalPosts={data.length}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Blogs;
