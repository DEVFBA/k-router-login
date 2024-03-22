import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.token) {
          localStorage.setItem("token", json.token);
          setPassword("");
          setUser("");
          return navigate("/");
        }

        // esto se ejecuta si no hay token
        setError("Nel Pastel || You shall not pass!!!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main className="flex flex-row items-center justify-center">
      <form
        action=""
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
        onSubmit={handleSubmit}
      >
        <div className="sm:col-span-4">
          <label
            for="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Username
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                required
                onChange={(event) => {
                  setUser(event.target.value);
                }}
                type="text"
                name="username"
                id="username"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Enter User"
                value={user}
              />
            </div>
          </div>

          <label
            for="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
                type="password"
                name="password"
                id="password"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Enter Password"
                value={password}
              />
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button className="rounded-full">Login</button>
        </div>
      </form>
    </main>
  );
};

export default Login;
