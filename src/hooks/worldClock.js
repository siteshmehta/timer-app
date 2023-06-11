import { useQuery } from "@tanstack/react-query";

export function useTimeZones() {

  const { data: timeZones } = useQuery({
    queryKey: ['timezones'],
    queryFn: async function () {

      const response = await fetch('https://worldtimeapi.org/api/timezone');
      if (response.ok) {
        return await response.json();
      }
      return [];
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });
  return { timeZones };
}
