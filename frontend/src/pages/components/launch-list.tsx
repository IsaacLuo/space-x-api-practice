import { useEffect, useState } from "react"
import LaunchCard from "./launch-card"
import axios from "axios";

export default function LaunchList() {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    const url = `/api/v1/launches`;

    const fetchData = async () => {
        try {
            const response = await axios(url);
            const json = await response.data;
            console.log(json.results);
            setLaunches(json.results);
        } catch (error) {
            console.log("error", error);
        }
    };

    fetchData();
  }, []);

  if (launches.length === 0) {
    return <p>loading, please refresh the page later if you cannot see the launch information.</p>
  }

  return (
    <div
      className={`launch-list flex flex-col items-center justify-between p-10 gap-10 `}
    >
      {launches.map((launch,i)=><LaunchCard launchData={launch} key={i}/>)}

    </div>
  )
}
