import { IAllOptionsResponse } from "@/interfaces/options";

export const getFeaturedOptionKeyNamesByCategorySlug = (slug: string) => {
  const specialSlugs = [
    "csgo",
    "dota2",
    "gta",
    "lol",
    "pokemon",
    "reviews",
    "twitch",
    "valorant"
  ];

  if (specialSlugs.includes(slug)) {
    return {
      description: `${slug}-description` as keyof IAllOptionsResponse,
      "featured-articles":
        `${slug}-featured-articles` as keyof IAllOptionsResponse,
      tags: `${slug}-tags` as keyof IAllOptionsResponse
    };
  } else {
    return {
      description: null,
      "featured-articles":
        "homepage-featured-articles" as keyof IAllOptionsResponse,
      tags: "default-tags" as keyof IAllOptionsResponse
    };
  }
};
