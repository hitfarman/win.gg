import { IOptionTag } from "@/interfaces/options";
import { IFeaturedTag } from "@/interfaces/tags";

export const extractFeaturedTags = (
  optionTags: IOptionTag[]
): IFeaturedTag[] => {
  return optionTags.map((optionTag) => ({
    name: optionTag.name,
    slug: optionTag.slug,
    term_id: optionTag.term_id
  }));
};
