import { createContext, useContext, useEffect, useState } from "react";
import { goldRateApi } from "../services/api";

const AppContext = createContext(null);

// Temporary values for local testing.
// Replace these with your real business buying rates.
const DEFAULT_GOLD_RATES = {
  id: 0,
  gold24k: 8500,
  gold22k: 7800,
  gold18k: 6400,
};

export function AppProvider({ children }) {
  const [rates, setRates] = useState(DEFAULT_GOLD_RATES);
  const [loadingRates, setLoadingRates] = useState(true);

  const loadRates = async () => {
    try {
      setLoadingRates(true);

      const response = await goldRateApi.getAll();

      const data = response.data;

      if (Array.isArray(data) && data.length > 0) {
        // Get the latest rate record
const latestRate = data[0];
        setRates({
          id: latestRate.id,
          gold24k: Number(latestRate.gold24k || 0),
          gold22k: Number(latestRate.gold22k || 0),
          gold18k: Number(latestRate.gold18k || 0),
        });
      } else {
        // No database record yet
        setRates(DEFAULT_GOLD_RATES);
      }
    } catch (error) {
      console.error("Gold rate request failed:", error);

      // Keep website working with test values
      setRates(DEFAULT_GOLD_RATES);
    } finally {
      setLoadingRates(false);
    }
  };

  useEffect(() => {
    loadRates();
  }, []);

  return (
    <AppContext.Provider
      value={{
        rates,
        loadingRates,
        refreshRates: loadRates,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);