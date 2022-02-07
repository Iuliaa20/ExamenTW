import { useState } from "react";

const AddShip = (props) => {
  const { setShowModal } = props;
  const [name, setName] = useState("");
  const [displacement, setDisplacement] = useState(0);

  const addShip = async (e) => {
    const bodyValues = {
      name: name,
      displacement: displacement,
    };
    await fetch(`http://localhost:8080/api/ships`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyValues),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((json) => {
            throw new Error(json.message);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative read-more my-6 mx-auto max-w-3xl">
          <div className=" border-0 rounded-lg shadow-lg relative flex flex-col read-more bg-white opacity-95 outline-none focus:outline-none">
            <div className="grid justify-center">
              <form
                className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
                onSubmit={addShip}
              >
                <div className="mt-10">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="displacement"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Displacement
                  </label>
                  <input
                    type="number"
                    name="displacement"
                    id="displacement"
                    placeholder="Displacement"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                    value={displacement}
                    onChange={(e) => setDisplacement(e.target.value)}
                    required
                  ></input>
                </div>

                <button
                  type="submit"
                  className="w-3/6  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add
                </button>
              </form>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default AddShip;
