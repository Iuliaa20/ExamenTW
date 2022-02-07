import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditCrewmember from "./edit-crewmember";
import EditShip from "./edit-ship";

const Line = (props) => {
  const { ship, crewmember, getAll } = props;
  const navigate = useNavigate();
  const [showModalEditShip, setShowModalEditShip] = useState(false);
  const [showModalEditCrewmember, setShowModalEditCrewmember] = useState(false);

  const handleClickViewCrewmembers = () => {
    navigate(`/ships/${ship.id}/crewmembers`);
  };

  const deleteShip = async () => {
    await fetch(`http://localhost:8080/api/ships/${ship.id}`, {
      method: "DELETE",
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
        getAll();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteCrewmember = async () => {
    await fetch(
      `http://localhost:8080/api/ships/${crewmember.ShipId}/crewmembers/${crewmember.id}`,
      {
        method: "DELETE",
      }
    )
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
        getAll();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        {ship ? (
          <>
            <td className="py-3 px-6 text-left">
              <div className="flex items-center">
                <span>{ship.name}</span>
              </div>
            </td>

            <td className="py-3 px-6 text-left">
              <div className="flex items-center">
                <span>{ship.displacement}</span>
              </div>
            </td>
          </>
        ) : (
          <>
            <td className="py-3 px-6 text-left">
              <div className="flex items-center">
                <span>{crewmember.name}</span>
              </div>
            </td>

            <td className="py-3 px-6 text-left">
              <div className="flex items-center">
                <span>{crewmember.role}</span>
              </div>
            </td>
          </>
        )}

        <td className="py-3 px-6 text-center">
          <div className="flex item-center justify-center">
            {ship && (
              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                <button className="w-4" onClick={handleClickViewCrewmembers}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            )}

            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
              <button
                className="w-4"
                onClick={
                  ship
                    ? () => setShowModalEditShip(true)
                    : () => setShowModalEditCrewmember(true)
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
              <button
                className="w-4"
                onClick={ship ? deleteShip : deleteCrewmember}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </td>
      </tr>
      {showModalEditShip && (
        <EditShip
          setShowModal={setShowModalEditShip}
          ship={ship}
        />
      )}
      {showModalEditCrewmember && (
        <EditCrewmember
          setShowModal={setShowModalEditCrewmember}
          crewmember={crewmember}
        />
      )}
    </>
  );
};

export default Line;
