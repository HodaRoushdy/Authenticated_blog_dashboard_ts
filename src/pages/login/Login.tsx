import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginValidationSchema } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/AuthSlice";
import type { ILoginValues } from "../../utils/interfaces";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues: ILoginValues = {
    email: "",
    password: "",
  };
  /** handle login process using redux */
  const handleSubmit = (values: ILoginValues) => {
    dispatch(login(values));
    navigate("/blogs");
  };
  
  return (
    <div className="flex justify-center p-5">
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {() => (
          <Form className="w-1/2 flex justify-center">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="space-y-6">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white ">
                  Sign in to our platform
                </h5>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email:
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                  />
                  <ErrorMessage
                    className="flex text-red-400	text-left"
                    name="email"
                    component="span"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password:{" "}
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="••••••••"
                  />
                  <ErrorMessage
                    name="password"
                    className="flex text-red-400 text-left"
                    component="span"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login to your account
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{" "}
                  <a
                    href="/signup"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </a>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
