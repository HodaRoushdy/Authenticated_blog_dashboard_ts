import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import styles from "./dashboard.module.css";
import type { IBlog, IError } from "../../utils/interfaces";

const handleDelete = async (id:number) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );
    return res;
  } catch (error: IError | any ) {
    throw new Error(`error while deleting post ${error.message}`);
  }
};
const userInfo = JSON.parse(localStorage.getItem("token") || '');
const userBlogs = JSON.parse(localStorage.getItem("blogs") || '');

const Dashboard = () => {
  const { mutate, isError, error } = useMutation({
    mutationFn: (id:number) => {
      return handleDelete(id);
    },
    onSuccess: () => {
      toast.success("Deleted successfully !", {
        position: "top-right",
      });
    },
  });

  isError &&
    toast.error(`Error while deleting ${error}`, {
      position: "top-right",
    });

  const onSubmit = (id: number) => {
    /** Deleting blog in Database Using React Query */
    // mutate(id);
    const filteredBlogs = userBlogs.filter((item:IBlog) => item.id !== id);
    localStorage.setItem("blogs", JSON.stringify(filteredBlogs));
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <img src={userInfo.image} alt="userImg" />
        <div>
          <h2>{userInfo.name}</h2>
          <h3>{userInfo.email}</h3>
        </div>
      </div>
      <div className={styles.postsSec}>
        {userBlogs.length > 0 ?
          userBlogs.map((post:IBlog) => (
            <div key={post.id} className={styles.postCard}>
              <div className={styles.postHeader}>
                <h4>{post.title}</h4>
              </div>
              <p>{post.body}</p>
              <button onClick={() => onSubmit(post.id)}>Delete</button>
            </div>
          )) : <p>You don't have any blogs, create your own now</p>}
      </div>
    </div>
  );
};

export default Dashboard;
