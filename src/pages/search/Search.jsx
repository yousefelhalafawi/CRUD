import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import TableComponent from "./TableComponent";
import PaginationComponent from "./PaginationComponent";
import FormInputs from "./FormInputs";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Search() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [count, setCount] = useState(1);
  const [sort, setSort] = useState("");
  const [total, settotal] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });

    console.log(filterData);
  };
  const sortFun = (e) => {
    setSort(e);
  };
  const fetchData = useCallback(
    (filterDataObj = {}) => {
      setLoading(true);
      axios
        .post(
          `${BASE_URL}/users/search?s=${perPage}&p=${page}${sort}`,
          filterDataObj
        )
        .then((res) => {
          setData(res.data.result.data);
          setCount(res.data.result.pagesCount);
          settotal(res.data.result.total);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [page, perPage, sort]
  );
  // in first render only
  useEffect(() => {
    fetchData(filterData);
  }, [fetchData, page, sort, perPage]);

  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}/users/${id}`)
      .then((response) => {
        toast.success("User deleted successfully");
        // Call fetchData to refresh the data after deletion
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  // on click search button
  const handleSearchClick = (e) => {
    e.preventDefault();
    fetchData(filterData);
  };
  // on click reset button
  const handleResetClick = () => {
    setFilterData({});
    fetchData();
  };
  const handelPageRow = (e) => {
    setPerPage(e);
  };
  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };
  const onCLickPage = (e) => {
    setPage(e);
  };
  return (
    <div className="px-5 min-vh-100">
      <FormInputs
        handleSearchClick={handleSearchClick}
        handleInputChange={handleInputChange}
        handleResetClick={handleResetClick}
        filterData={filterData}
      />
      {loading ? (
        <div
          style={{ height: "600px" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner
            style={{ width: "200px", height: "200px" }}
            animation="border"
            variant="primary"
          />
        </div>
      ) : data.length > 0 ? (
        <>
          <TableComponent data={data} sortFun={sortFun} onDelete={handleDelete} />
          {count > 1 && (
            <PaginationComponent
              page={page}
              count={count}
              nextPage={nextPage}
              prevPage={prevPage}
              onCLickPage={onCLickPage}
              handelPageRow={handelPageRow}
              perPage={perPage}
              total={total}
            />
          )}
        </>
      ) : (
        <h1>No Data found</h1>
      )}
    </div>
  );
}

export default Search;
