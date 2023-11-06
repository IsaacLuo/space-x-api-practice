import { useEffect, useState } from "react"
import LaunchCard from "./launch-card"
import axios from "axios";

export default function LaunchList(
  props: {
    launchDataArray?: {
      id: string;
      launchName: string;
      rocketName: string;
      launchpadName: string;
      details: string;
      date: string;
      success: boolean;
    }[],
  }
) {
  const [launches, setLaunches] = useState(props.launchDataArray ?? []);

  useEffect(() => {
    const url = `/api/v1/launches`;

    const fetchData = async () => {
        try {
          const response = await axios.get(url);
          const json = response.data;
          setLaunches(json.results);
        } catch {
        }
    };

    if(launches.length === 0) {
      fetchData();
    }
  }, []);

  if (launches.length === 0) {
    return <p className="loading-message">loading, please refresh the page later if you cannot see the launch information.</p>
  }

  return (
    <div
      className={`launch-list flex flex-col items-center justify-between p-10 gap-10 `}
    >
      {launches.map((launch,i)=><LaunchCard launchData={launch} launchPictureSrc="/537-521x521.jpg" key={i}/>)}

    </div>
  )
}
