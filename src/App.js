import { useState, useEffect } from "react";
import "./App.css";
import { CSVLink } from "react-csv";

function App() {
  const URL = "http://ec2-3-19-141-59.us-east-2.compute.amazonaws.com/api/";
  const [loading, setLoading] = useState(true);
  const [result, setresult] = useState();
  const [search, setSearch] = useState("");

  const headers = [
    { label: "Name", key: "Name" },
    { label: "Code", key: "Code" },
    { label: "Low", key: "Low" },
    { label: "High", key: "High" },
    { label: "Open", key: "Open" },
    { label: "Close", key: "Close" },
  ];
  useEffect(() => {
    fetch(URL + "?value=" + search)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setresult(data);
        setLoading(false);
      });
  }, [search]);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-center">
          <a href="/">Zerodha Task App</a>
          <ul className="nav-links"></ul>
        </div>
      </nav>
      <section className="section search">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <label htmlFor="name">search stocks</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
      </section>
      {loading ? (
        <div className="loader" />
      ) : (
        <section className="section">
          <h2 className="section-title">Results</h2>
          <div className="section-title">
            <button className="btn">
              <CSVLink
                data={result}
                headers={headers}
                filename={`${search}-result.csv`}
              >
                Download as CSV
              </CSVLink>
            </button>
          </div>

          <div className="data-center">
            <table className="data-table">
              <thead>
                <th>
                  <td>Name</td>
                </th>
                <th>
                  <td>Code</td>
                </th>
                <th>
                  <td>Low</td>
                </th>
                <th>
                  <td>High</td>
                </th>
                <th>
                  <td>Open</td>
                </th>
                <th>
                  <td>Close</td>
                </th>
              </thead>
              <tbody>
                {result.map((record) => {
                  return (
                    <tr>
                      <td>{record.Name}</td>
                      <td>{record.Code}</td>
                      <td>{record.Low}</td>
                      <td>{record.High}</td>
                      <td>{record.Open}</td>
                      <td>{record.Close}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
