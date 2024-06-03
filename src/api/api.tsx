import axios from "axios";
export const fetchQuote = async () => {
  try {
    const response = await axios.get("https://type.fit/api/quotes");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching quote data");
  }
};
export const fetchMovie = async (title: string) => {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${title}&apikey=16379c6d`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching movie data");
  }
};
export const fetchToy = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
    );
    return response.data.results;
  } catch (error) {
    throw new Error("Error fetching toys data");
  }
};
export const fetchSports = async () => {
  const leagueAbbreviation = "bl1";
  const season = "2020";
  const url = `https://api.openligadb.de/getmatchdata/${leagueAbbreviation}/${season}/1`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching sports data: ");
  }
};
