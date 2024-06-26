export const apiSupabase = async (query: string, variables: any = {}) => {
  const response = await fetch(
    `https://${import.meta.env.PROJECT_REF}.supabase.co/graphql/v1`,
    {
      method: "POST",
      headers: {
        apiKey: import.meta.env.API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  const json = await response.json();
  return json;
};