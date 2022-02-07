import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddCrewmember from "../components/add-crewmember";
import Header from "../components/header";
import Line from "../components/line";

const Crewmembers = () => {
  const headerElementsCrewmembers = ["Name", "Role"];
  const [crewmembers, setCrewmembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getAllCrewmembers = async () => {
    await fetch(`http://localhost:8080/api/ships/${id}/crewmembers`, {
      method: "GET",
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
      .then((data) => {
        setCrewmembers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getAllCrewmembers();
  }, []);

  const handleClickBack = () => {
    navigate(`/`);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="min-w-screen min-h-screen bg-gray-100 flex justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full lg:w-5/6">
            <div className="flex justify-between">
              <button
                type="button"
                className="mt-10 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={handleClickBack}
              >
                Back
              </button>
              <button
                type="button"
                className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setShowModal(true)}
              >
                Add crewmember
              </button>
            </div>
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <Header headerElements={headerElementsCrewmembers} />
                <tbody className="text-gray-600 text-sm font-light">
                  {crewmembers.map((crewmember, index) => (
                    <Line key={index} crewmember={crewmember} getAll={getAllCrewmembers} />
                  ))}
                </tbody>
              </table>
            </div>
            {showModal && (
              <AddCrewmember setShowModal={setShowModal} shipId={id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crewmembers;
