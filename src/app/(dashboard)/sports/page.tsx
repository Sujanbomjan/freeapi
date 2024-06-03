"use client";

import React, { useState, useEffect } from "react";
import SportsCard from "@/components/sports/SportsCard";
import { fetchSports } from "@/api/api";
import Skeleton from "react-loading-skeleton";

interface Sport {
  matchId: number;
  matchDateTime: string;
  timeZoneID: string;
  leagueId: number;
  leagueName: string;
  leagueSeason: number;
  leagueShortcut: string;
  matchDateTimeUTC: string;
  group: {
    groupName: string;
    groupOrderID: number;
    groupID: number;
  };
  lastUpdateDateTime: string;
  location: {
    locationCity: string;
    locationStadium: string;
  };
  matchIsFinished: boolean;
}

const SportsWrapper: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSportsData = async () => {
      setLoading(true);
      try {
        const sportsData = await fetchSports();
        console.log("Sports Data:", sportsData);

        // Transform API data to match Sport interface
        const transformedData = sportsData.map((match: any) => ({
          matchId: match.matchID,
          matchDateTime: match.matchDateTime,
          timeZoneID: match.timeZoneID,
          leagueId: match.leagueId,
          leagueName: match.leagueName,
          leagueSeason: match.leagueSeason,
          leagueShortcut: match.leagueShortcut,
          matchDateTimeUTC: match.matchDateTimeUTC,
          group: match.group,
          lastUpdateDateTime: match.lastUpdateDateTime,
          location: match.location,
          matchIsFinished: match.matchIsFinished,
        }));

        setSports(transformedData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching sports data:", error);
      }
    };

    fetchSportsData();
  }, []);

  return (
    <div className=" bg-white h-[100vh]">
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-2xl font-bold mb-6">Sports List</h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index}>
                <Skeleton width={200} height={300} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sports.map((sport, index) => (
              <SportsCard key={index} result={sport} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SportsWrapper;
