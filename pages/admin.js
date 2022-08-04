import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Admin() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const { data: session, status } = useSession();
  const router = useRouter();

  const loading = status === "loading";
  if (loading) return "<><h1>loading</h1></>";

  if (!session) {
    router.push("/");
    return;
  }

  if (!session.user.isAdmin) {
    router.push("/");
    return;
  }

  return (
    <div className=" ">
      <div className="h-screen flex flex-col justify-center items-center w-screen bg-stone-500">
        <h1 className="text-xl text-white capitalize font-bold pb-2">admin</h1>
        <p className="capitalize text-gray-200 pbp2">Add an item</p>

        <div className="w-full max-w-xl">
          <form
            className="bg-transparent capitalize font-bold shadow-md rounded px0-8 pt-6 pb-8 mb-4"
            onSubmit={async (e) => {
              e.preventDefault();

              await fetch("/api/new", {
                body: JSON.stringify({
                  name,
                  type,
                  description,
                }),
                headers:{
                    "Content-Type": "application/json"
                },
                method: 'POST'
              });
            }}
          >
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="name"
              >
                name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="item name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="type"
              >
                type
              </label>

              <select
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setType(e.target.value)}
              >
                  <option value="">select type</option>
                <option value="restaurant">Restaurant</option>
                <option value="hotel">Hotel</option>
                <option value="thing-to-do">Thing to do</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="description"
              >
                description
              </label>
              <input
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="item description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="text-center">
              <button
                disabled={name ? false : true}
                className={`bg-black text-white font-bold py-2 px-4 rounded focus:bg-red-500 focus:outline-none focus:shadow-outline ${
                  name ? "" : "cursor-not-allowed text-gray-400 border-gray-400"
                }`}
                type="submit"
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
