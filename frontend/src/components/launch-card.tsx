import Image from "next/image";

const BadgeRed = <div className="rounded-full px-2 text-xs bg-red-500 flex-none ml-auto mr-3 text-white">Failed</div>
const BadgeGreen = <div className="rounded-full px-2 text-xs bg-green-500 flex-none ml-auto mr-3 text-white">Success</div>

export default function LaunchCard(props: {
  launchData: {
    id: string;
    launchName: string;
    rocketName: string;
    launchpadName: string;
    details: string;
    date: string;
    success: boolean;
  },
  launchPictureSrc: string;
}) {
  const { launchName, rocketName, launchpadName, details, date, success} = props.launchData;
  const {launchPictureSrc} = props;

  const badge = success?BadgeGreen:BadgeRed;
  return (
    <article className="launch-card shadow rounded flex flex-row gap-x-5 rounded-xl">
      <div className="flex-initial w-64 h-64">
        <Image
          className="shrink-0 shadow-indigo-500/50 rounded-l-xl"
          src={launchPictureSrc}
          width={521}
          height={521}
          alt={`launch picture of ${launchName}`}
        />
      </div>
      <div className="launch-text flex-initial w-96 py-2">
        <div className="header-row flex flex-row items-center justify-center">
          <h2 className="launch-name text-3xl">{launchName}</h2>
          {badge}
        </div>
        <p className="launch-date text-gray-500 text-sm">{new Date(date).toLocaleString()}</p>
        <p className="launch-description text-xs pr-8 py-3">{details}</p>
        <h3 className="text-xl pt-3">Details</h3>
        <div className="text-xs">Rocket Name: {rocketName}</div>
        <div className="text-xs">Launchpad Name: {launchpadName}</div>
      </div>
    </article>
  );
}
