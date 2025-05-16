import { useNavigate, useParams } from "react-router-dom";
import styles from "./blogDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import loadingAnimation from "../../../../public/loading.json";
import type { IError } from "../../../utils/interfaces";
import Lottie from "lottie-react";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchBlog = async () => {
    try {
      const blog = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      return blog.json();
    } catch (error: IError | any) {
      throw Error(`can not reach the resource ${error.message}`);
    }
  };

  const { data, isPending } = useQuery({
    queryKey: [`blog${id}`],
    queryFn: fetchBlog,
    staleTime: Number(import.meta.env.VITE_STALE_TIME) || 10000,
  });

  if (typeof id === "number" && !(id > 1 && id < 100)) {
    navigate("/blogs");
    return;
  }

  return (
    <div className={styles.blogPage}>
      {isPending ? (
        <Lottie animationData={loadingAnimation} loop={true} />
      ) : (
        <div className={styles.BlogDetails}>
          <h2>{data.title}</h2>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
