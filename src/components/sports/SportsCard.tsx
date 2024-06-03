import React from "react";

interface SportCardProps {
  result: {
    matchId: number;
    matchDateTime: string;
    timeZoneID: string;
    leagueId: number;
    leagueName: string;
    leagueSeason: number;
    leagueShortcut: string;
    matchDateTimeUTC: string;
    lastUpdateDateTime: string;
    location: {
      locationCity: string;
      locationStadium: string;
    };
    matchIsFinished: boolean;
  };
}

const SportsCard: React.FC<SportCardProps> = ({ result }) => {
  return (
    <div className="w-full px-2 mb-4">
      <div className="border border-gray-300 rounded-lg">
        <div className="p-4">
          <p className="font-semibold">Match ID: {result.matchId}</p>
          <p className="font-normal">
            Match Date Time: {result.matchDateTime}
          </p>
          <p className="font-normal">Time Zone: {result.timeZoneID}</p>
          <p className="font-normal">League Season: {result.leagueSeason}</p>
          <p className="font-normal">
            Location City: {result.location.locationCity}
          </p>
          <p className="font-normal">
            Match Date Time UTC: {result.matchDateTimeUTC}
          </p>
          <p className="font-normal">
            Match is Finished: {result.matchIsFinished ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SportsCard;
