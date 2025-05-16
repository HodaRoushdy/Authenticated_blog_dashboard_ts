import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { blogValidationSchema } from "../../../utils/validation";
import type { IEnteredValues } from "../../../utils/interfaces";

const AddBlog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initialValues = {
    title: "",
    body: "",
  };

  const createNewPost = async (values:IEnteredValues) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        userId: JSON.parse(localStorage.getItem("token") || '').id || null,
        ...values,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (res.ok) {
      const pastBlogs = JSON.parse(localStorage.getItem("blogs") || '') || [];
      pastBlogs.push({ id: pastBlogs.length + 1, ...values });
      localStorage.setItem("blogs", JSON.stringify(pastBlogs));
    } else {
      throw new Error(`error while creating new blog `);
    }
    return res;
  };

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: (values : IEnteredValues) => {
      return createNewPost(values);
    },
    onSuccess: () => {
      toast.success(`Blog created successfully `, {
        position: "top-right",
      });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/dashboard");
    },
  });
  isError &&
    toast.error(`${error.message}`, {
      position: "top-right",
    });

  const handleSubmit = (values:IEnteredValues) => {
    mutate(values);
  };
  return (
    <>
      <h2>Create your blog</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={blogValidationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Form className="my_form">
          <div className="input_group">
            <label htmlFor="title">Title:</label>
            <Field name="title" type="string" />
            <ErrorMessage name="title" component="span" />
          </div>
          <div className="input_group">
            <label htmlFor="body">Body:</label>
            <Field name="body" type="string" />
            <ErrorMessage name="body" component="span" />
          </div>
          <button type="submit" disabled={isPending}>
            Post
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default AddBlog;
