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
    "valorant",
    "general"
  ];

  if (specialSlugs.includes(slug)) {
    // Have to do this because of gta category
    if (slug === "general") {
      return {
        description: null,
        "featured-articles":
          "general-featured-articles" as keyof IAllOptionsResponse,
        tags: "general-tags" as keyof IAllOptionsResponse
      };
    }

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
