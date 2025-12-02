import { FunctionComponent } from "react";
import { Chip, Typography, Box } from "@mui/material";
import { useSearchStore } from "../stores";

export type SearchHistoryType = {
  className?: string;
};

const SearchHistory: FunctionComponent<SearchHistoryType> = ({ className = "" }) => {
  const { searchHistory, setFlightSearch, clearSearchHistory } = useSearchStore();

  const handleHistoryClick = (searchCriteria: any) => {
    setFlightSearch(searchCriteria);
  };

  if (searchHistory.length === 0) {
    return null;
  }

  return (
    <Box className={className} sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h6" sx={{ mb: 1, fontSize: "14px", fontWeight: "bold" }}>
        Recent Searches
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {searchHistory.slice(0, 5).map((search, index) => (
          <Chip
            key={index}
            label={`${search.departure} → ${search.arrival}`}
            variant="outlined"
            clickable
            onClick={() => handleHistoryClick(search)}
            sx={{
              fontSize: "12px",
              height: "28px",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          />
        ))}
        {searchHistory.length > 0 && (
          <Chip
            label="Clear history"
            variant="outlined"
            clickable
            onClick={clearSearchHistory}
            sx={{
              fontSize: "12px",
              height: "28px",
              color: "#d32f2f",
              borderColor: "#d32f2f",
              "&:hover": {
                backgroundColor: "#ffebee",
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default SearchHistory;