import { IAllOptionsResponse } from "@/interfaces/options";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge"
};

export default async function handler(req: NextRequest) {
  let options: IAllOptionsResponse | null = null;
  try {
    const basicAuth =
      "Basic " +
      btoa(
        process.env.BASIC_AUTH_USERNAME + ":" + process.env.BASIC_AUTH_PASSWORD
      );
    const response = await fetch(
      `https://${process.env.WP_API_DOMAIN}/wp-json/options/all`,
      {
        method: "GET",
        headers: { Authorization: basicAuth }
      }
    );
    options = await response.json();
  } catch (e) {
    console.log("Fetching options failed, with cause:", e);
  }
  return new Response(
    JSON.stringify({
      options
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=1200, stale-while-revalidate=600"
      }
    }
  );
}
