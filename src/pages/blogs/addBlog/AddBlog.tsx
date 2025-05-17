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

  /** the main function to create blog */
  const createNewPost = async (values:IEnteredValues) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        userId: JSON.parse(localStorage.getItem("token") || '{}').id || null,
        ...values,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (res.ok) {
      const pastBlogs = JSON.parse(localStorage.getItem("blogs") || '') || [];
      pastBlogs.push({ id: pastBlogs[pastBlogs.length - 1] ? pastBlogs[pastBlogs.length - 1].id + 1 : 1, ...values });
      localStorage.setItem("blogs", JSON.stringify(pastBlogs));
    } else {
      throw new Error(`error while creating new blog `);
    }
    return res;
  };
  
  /** tanstack query function to mutate data to add new blog */
  const { mutate} = useMutation({
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
    onError: (error) => {
      toast.error(`${error.message}`, {
      position: "top-right",
    });

    }
  });

  const handleSubmit = (values:IEnteredValues) => {
    mutate(values);
  };

  return (
    <div className="flex justify-center p-5">
      {/** create post form */}
          <Formik
            initialValues={initialValues}
            validationSchema={blogValidationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {() => (
              <Form className="w-1/2 flex justify-center">
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <div className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white ">
                      Create your own blog 
                    </h5>
                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title:
                      </label>
                      <Field
                        name="title"
                        type="string"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="title..."
                      />
                      <ErrorMessage
                        className="flex text-red-400 text-left"
                        name="title"
                        component="span"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="body"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Body:
                      </label>
                      <Field
                        name="body"
                        type="string"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="body..."
                      />
                      <ErrorMessage
                        name="body"
                        className="flex text-red-400 text-left"
                        component="span"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Create Blog
                    </button>
                    
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
  );
};

export default AddBlog;
