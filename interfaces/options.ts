export interface IOptionFeaturedPost {
  ID: number;
  post_author: string;
  post_date: string;
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
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

export type FeaturedArticles = IOptionFeaturedPost[] | false;
export type FeaturedOptionTags = IOptionTag[] | false;

export interface IAllOptionsResponse {
  "csgo-description": string;
  "csgo-featured-articles": FeaturedArticles;
  "csgo-tags": FeaturedOptionTags;

  "default-tags": FeaturedOptionTags;

  "dota2-description": string;
  "dota2-featured-articles": FeaturedArticles;
  "dota2-tags": FeaturedOptionTags;

  "general-tags": FeaturedOptionTags;

  "gta-description": string;
  "gta-featured-articles": FeaturedArticles;
  "gta-tags": FeaturedOptionTags;

  "homepage-description": string;
  "homepage-featured-articles": FeaturedArticles;

  "lol-description": string;
  "lol-featured-articles": FeaturedArticles;
  "lol-tags": FeaturedOptionTags;

  "pokemon-description": string;
  "pokemon-featured-articles": FeaturedArticles;
  "pokemon-tags": FeaturedOptionTags;

  "reviews-description": string;
  "reviews-featured-articles": FeaturedArticles;
  "reviews-tags": FeaturedOptionTags;

  "twitch-description": string;
  "twitch-featured-articles": FeaturedArticles;
  "twitch-tags": FeaturedOptionTags;

  "valorant-description": string;
  "valorant-featured-articles": FeaturedArticles;
  "valorant-tags": FeaturedOptionTags;

  "videos-tags": FeaturedOptionTags;

  featured_review_1: IOptionFeaturedPost;
  featured_review_2: IOptionFeaturedPost;
  featured_review_3: IOptionFeaturedPost;

  featured_video_1: string;
  featured_video_2: string;
  featured_video_3: string;
  featured_video_4: string;
  featured_video_5: string;
  featured_video_6: string;
  featured_video_7: string;
  featured_video_8: string;
  featured_video_9: string;
}
