import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Button } from "react-bootstrap"; // Assuming you have imported the Button component from react-bootstrap
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const headers = [
  { key: "firstName", label: "First Name" },
  { key: "middleName", label: "Middle Name" },
  { key: "thirdName", label: "Third Name" },
  { key: "email", label: "Email" },
  { key: "ssn", label: "SSN" },
  { key: "gender", label: "Gender" },
  { key: "actions", label: "Actions" }, // New header for actions
];

function TableComponent({ data, sortFun,onDelete }) {
  const handleSort = (key, asc) => sortFun(`&sort=${key}&asc=${asc}`);
  const navigate = useNavigate();


  const handleAction = (action, id) => {
    if (action === "view") {
      navigate(`/viewUser/` + id);
    } else if (action === "edit") {
      navigate(`/user/` + id);

    } 
  };
  

  return (
    <>
      {data.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              {headers.map(({ key, label }) => (
                <th key={key}>
                  <div className="d-flex justify-content-between">
                    <span>{label}</span>
                    {key === "actions" ? null : (
                      <span>
                        <FontAwesomeIcon
                          onClick={() => handleSort(key, -1)}
                          className="me-3"
                          icon={faCaretDown}
                          style={{ cursor: "pointer" }}
                        />
                        <FontAwesomeIcon
                          onClick={() => handleSort(key, 1)}
                          icon={faCaretUp}
                          style={{ cursor: "pointer" }}
                        />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                {headers.map(({ key }) => {
                  if (key === "actions") {
                    return (
                      <td key={key} className="d-flex justify-content-between">
                        <Button
                          variant="primary"
                          onClick={() => handleAction("view", item._id)}
                        >
                          View
                        </Button>
                        <Button
                          variant="warning"
                          onClick={() => handleAction("edit", item._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => onDelete(item._id)} // Call onDelete when Delete button is clicked
                        >
                          Delete
                        </Button>
                      </td>
                    );
                  }
                  return <td key={key}>{item[key]}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default TableComponent;
