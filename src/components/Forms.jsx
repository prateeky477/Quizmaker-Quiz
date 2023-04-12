import React from "react";
const Forms = () => (
    <form
        className="mx-auto max-w-2xl"
        // onSubmit={onFinish}
        autoComplete="off"
    >
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                Quiz Name
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                Quiz Description
            </label>
            <textarea
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                required
            />
        </div>
        <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                TIME LIMIT (FOR EACH QUESTION IN MINUTES)
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                MARKS (FOR EACH QUESTION)
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                required
            />
        </div>

        <div className="flex justify-center">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
            >
                Submit
            </button>
        </div>
    </form>
);

export default Forms