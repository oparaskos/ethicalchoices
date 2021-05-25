type Class = { name: string };
type Group = { name: string; classes?: { [className: string]: Class } };
type Division = { name: string; groups?: { [className: string]: Group } };
export const categories: { [groupName: string]: Division } = {
  "10": {
    name: "Food Products",
    groups: {
      "1": {
        name: "meat and production of meat products",
      },
      "2": {
        name: "fish, crustaceans and molluscs",
      },
      "3": {
        name: "fruit and vegetables",
      },
      "4": {
        name: "vegetable and animal oils and fats",
        classes: {
          "1": {
            name: "oils and fats",
          },
          "2": {
            name: "margarine and similar edible fats",
          },
        },
      },
      "5": { name: "dairy products" },
      "6": { name: "grain mill products, starches and starch products" },
      "7": {
        name: "Bakery and farinaceous products",
      },
      "8": {
        name: "Other food products",
        classes: {
          "1": { name: "sugar" },
          "2": { name: "cocoa, chocolate and sugar confectionery" },
          "3": { name: "Processing of tea and coffee" },
          "4": { name: "condiments and seasonings" },
          "5": { name: "prepared meals and dishes" },
        },
      },
    },
  },
  "11": {
    name: "Beverages",
    groups: {
      "0": {
        name: "Beverages",
        classes: {
          "1": { name: "Spirits" },
          "2": { name: "Wine" },
          "3": { name: "Cider and Other Fruit Wines" },
          "4": { name: "Other non-distilled fermented beverages" },
          "5": { name: "Beer" },
          "6": { name: "Malt" },
          "7": {
            name: "Soft drinks and Bottled Water",
          },
        },
      },
    },
  },
  "12": { name: "Tobacco products" },
  "13": { name: "Textiles" },
  "14": {
    name: "Apparel",
    groups: {
      "1": { name: "Wearing apparel" },
      "2": { name: "Fur apparel" },
      "3": { name: "Knitted and Crocheted apparel" },
    },
  },
  "15": {
    name: "Leather and Related products",
    groups: {
      "2": { name: "Footwear" },
    },
  },
  "16": {
    name: "Wood and of products of wood and cork",
  },
  "17": { name: "Paper and Paper products" },
  "22": { name: "Rubber and Plastic products" },
  "26": { name: "Computer, Electronic and Optical products" },
  "27": { name: "Electrical Equipment" },
  "31": { name: "Furniture" },
};

export function findCategory(
  div: string,
  grp?: string | null | undefined | false,
  clss?: string | null | undefined | false
): null | { name: string } {
  const division: any = categories[div];
  if (!division) return null;
  const group = grp && division.groups?.[grp];
  if (group) {
    const groupClass = clss && group.classes?.[clss];
    if (groupClass) {
      return groupClass;
    }
    return group;
  }
  return division;
}
