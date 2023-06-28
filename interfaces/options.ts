export interface IOptionFeaturedPost {
  ID: 98093;
  post_author: string;
  post_date: string;
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: "Don't cross Dust 2 mid against this guy.";
  post_status: "publish";
  comment_status: "closed";
  ping_status: "closed";
  post_name: string;
  post_modified: string;
  post_modified_gmt: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  comment_count: number;
  filter: string;
}

export interface IOptionTag {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
}

export interface IAllOptionsResponse {
  options: {
    "csgo-description": string;
    "csgo-featured-articles": IOptionFeaturedPost[];
    "csgo-tags": IOptionTag[];

    "default-tags": IOptionTag[];

    "dota2-description": string;
    "dota2-featured-articles": IOptionFeaturedPost[];
    "dota2-tags": IOptionTag[];

    "general-tags": IOptionTag[];

    "gta-description": string;
    "gta-featured-articles": IOptionFeaturedPost[];
    "gta-tags": IOptionTag[];

    "homepage-description": string;
    "homepage-featured-articles": IOptionFeaturedPost[];

    "lol-description": string;
    "lol-featured-articles": IOptionFeaturedPost[];
    "lol-tags": IOptionTag[];

    "pokemon-description": string;
    "pokemon-featured-articles": IOptionFeaturedPost[];
    "pokemon-tags": IOptionTag[];

    "reviews-description": string;
    "reviews-featured-articles": IOptionFeaturedPost[];
    "reviews-tags": IOptionTag[];

    "twitch-description": string;
    "twitch-featured-articles": IOptionFeaturedPost[];
    "twitch-tags": IOptionTag[];

    "valorant-description": string;
    "valorant-featured-articles": IOptionFeaturedPost[];
    "valorant-tags": IOptionTag[];

    "videos-tags": IOptionTag[];
  };
}
