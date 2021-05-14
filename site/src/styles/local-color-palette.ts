// Names mostly from: https://coolors.co
export interface PaletteColor {
  value: string;
  contrastText?: PaletteColor;
  names: string[];
}

////// BLACK AND WHITE /////
export const BLACK: PaletteColor = { value: '#000000', names: ['black'] };
export const WHITE: PaletteColor = {
  value: '#ffffff',
  contrastText: BLACK,
  names: ['white']
};
BLACK.contrastText = WHITE;

////// TEXT COLOURS /////
export const RICH_BLACK: PaletteColor = {
  value: '#121212',
  names: ['Rich Black', 'Text Black', 'Grey 900']
};
export const SNOW_WHITE: PaletteColor = {
  value: '#fffbfa',
  names: ['Snow White', 'Text White']
};
export const SONIC_SILVER_GREY: PaletteColor = {
  value: '#757575',
  names: ['Sonic Silver Grey', 'Diminished Text', 'Text Grey', 'Grey 600']
};

RICH_BLACK.contrastText = SNOW_WHITE;
SONIC_SILVER_GREY.contrastText = RICH_BLACK;
SNOW_WHITE.contrastText = RICH_BLACK;

export const TextColours = {
  TEXT_BLACK: RICH_BLACK,
  TEXT_DIMINISHED: SONIC_SILVER_GREY,
  TEXT_WHITE: SNOW_WHITE
};

export const COFFEE_BLACK: PaletteColor = {
  value: '#312526',
  names: ['Coffee Black', 'Black 50'],
  contrastText: TextColours.TEXT_WHITE
};

////// PINK SHADES /////

export const SPANISH_PINK: PaletteColor = {
  value: '#f7b8b9',
  names: ['Spanish Pink', 'Pink 500', 'Pink Base'],
  contrastText: TextColours.TEXT_BLACK
};

export const WHITE_PINK: PaletteColor = {
  value: '#FEF9F8',
  names: ['White Pink', 'Pink 50'],
  contrastText: TextColours.TEXT_BLACK
};
export const SNOW_PINK: PaletteColor = {
  value: '#fff7f5',
  names: ['Snow Pink', 'Pink 100'],
  contrastText: TextColours.TEXT_BLACK
};
export const MISTY_ROSE: PaletteColor = {
  value: '#f8e3de',
  names: ['Misty Rose', 'Pink 200'],
  contrastText: TextColours.TEXT_BLACK
};
export const PEARL_ROSE: PaletteColor = {
  value: '#F3D8D4',
  names: ['Pearl Rose', 'Pink 300'],
  contrastText: TextColours.TEXT_BLACK
};
export const CRYSTAL_PINK: PaletteColor = {
  value: '#EECFCE',
  names: ['Crystal Pink', 'Pink 400'],
  contrastText: TextColours.TEXT_BLACK
};
export const PASTEL_PINK: PaletteColor = {
  value: '#D8A9A9',
  names: ['Pastel Pink', 'Pink 700'],
  contrastText: TextColours.TEXT_BLACK
};
export const ROSY_BROWN: PaletteColor = {
  value: '#c59495',
  names: ['Rosy Brown', 'Pink 800'],
  contrastText: TextColours.TEXT_BLACK
};

export const Pinks: PaletteColor[] = [
  WHITE_PINK,
  SNOW_PINK,
  MISTY_ROSE,
  PEARL_ROSE,
  CRYSTAL_PINK,
  SPANISH_PINK,
  PASTEL_PINK,
  ROSY_BROWN
];

////// GREEN SHADES /////

export const TROPICAL_RAINFOREST_GREEN: PaletteColor = {
  value: '#007565',
  names: ['Tropical Rainforest Green', 'Green 500', 'Green Base'],
  contrastText: TextColours.TEXT_WHITE
};
export const PASTEL_BLUE: PaletteColor = {
  value: '#e1f5f3',
  names: ['Pastel Blue', 'Green 50'],
  contrastText: TextColours.TEXT_BLACK
};
export const LIGHT_CYAN_GREEN: PaletteColor = {
  value: '#d3ede6',
  names: ['Light Cyan Green', 'Green 100'],
  contrastText: TextColours.TEXT_BLACK
};
export const POWDER_BLUE: PaletteColor = {
  value: '#abd9d4',
  names: ['Powder Blue', 'Green 200'],
  contrastText: TextColours.TEXT_BLACK
};
export const ILLUMINATING_EMERALD_GREEN: PaletteColor = {
  value: '#258d7b',
  names: ['Illuminating Emerald Green', 'Green 300'],
  contrastText: TextColours.TEXT_WHITE
};
export const BOTANICAL_GARDEN_GREEN: PaletteColor = {
  value: '#08433d',
  names: ['Botanical Garden Green', 'Green 600'],
  contrastText: TextColours.TEXT_WHITE
};
export const CYBER_LEAF_GREEN: PaletteColor = {
  value: '#004D42',
  names: ['Cyber Leaf Green', 'Green 500'],
  contrastText: TextColours.TEXT_WHITE
};
export const FAUX_TROPICAL_RAIN_FOREST_GREEN: PaletteColor = {
  value: '#007666',
  names: ['Faux Tropical Rain Forest Green', 'Green 400'],
  contrastText: TextColours.TEXT_WHITE
};
export const OCEAN_GREEN: PaletteColor = {
  value: '#3CA974',
  names: ['Ocean Green', 'Increase green', 'positive'],
  contrastText: TextColours.TEXT_WHITE
};
export const BRUNSWICK_GREEN: PaletteColor = {
  value: '#264d41',
  names: ['Brunswick Green', 'Green 700'],
  contrastText: TextColours.TEXT_WHITE
};
export const BLUE_GREEN: PaletteColor = {
  value: '#0a4c42',
  names: ['Blue Green', 'Green 750'],
  contrastText: TextColours.TEXT_WHITE
};
export const DARK_GREEN: PaletteColor = {
  value: '#02251b',
  names: ['Dark Green', 'Green 800'],
  contrastText: TextColours.TEXT_WHITE
};
export const DARK_JUNGLE_GREEN: PaletteColor = {
  value: '#193031',
  names: ['Dark Jungle Green', 'Green 820'],
  contrastText: TextColours.TEXT_WHITE
};
export const DARKEST_JUNGLE_GREEN: PaletteColor = {
  value: '#012224',
  names: ['Dark Jungle Green', 'Green 850'],
  contrastText: TextColours.TEXT_WHITE
};

export const Greens: PaletteColor[] = [
  DARK_GREEN,
  DARKEST_JUNGLE_GREEN,
  DARK_JUNGLE_GREEN,
  BRUNSWICK_GREEN,
  BOTANICAL_GARDEN_GREEN,
  BLUE_GREEN,
  TROPICAL_RAINFOREST_GREEN,
  FAUX_TROPICAL_RAIN_FOREST_GREEN,
  OCEAN_GREEN,
  ILLUMINATING_EMERALD_GREEN,
  POWDER_BLUE,
  LIGHT_CYAN_GREEN,
  PASTEL_BLUE
];

////// GREYS /////

export const MANATEE_GREY: PaletteColor = {
  value: '#969aa3',
  names: ['Manatee Grey', 'Grey 500', 'Grey Base'],
  contrastText: TextColours.TEXT_BLACK
};
export const CULTURED_GREY: PaletteColor = {
  value: '#f5f5f5',
  names: ['Cultured Grey', 'Grey 50'],
  contrastText: TextColours.TEXT_BLACK
};
export const AZURE_GREY: PaletteColor = {
  value: '#F8F9F9',
  names: ['Azure Grey', 'Grey 100'],
  contrastText: TextColours.TEXT_BLACK
};
export const GAINSBORO_GREY: PaletteColor = {
  value: '#e0e0e0',
  names: ['Gainsboro Grey', 'Grey 300'],
  contrastText: TextColours.TEXT_BLACK
};
export const ONYX_GREY: PaletteColor = {
  value: '#424242',
  names: ['Onyx Grey', 'Grey 800'],
  contrastText: TextColours.TEXT_WHITE
};

export const Neutrals: PaletteColor[] = [
  BLACK,
  RICH_BLACK,
  COFFEE_BLACK,
  ONYX_GREY,
  SONIC_SILVER_GREY,
  MANATEE_GREY,
  GAINSBORO_GREY,
  CULTURED_GREY,
  AZURE_GREY,
  SNOW_WHITE,
  WHITE
];

////// BLUES //////
export const SPANISH_BLUE: PaletteColor = {
  value: '#3c77a7',
  names: ['Spanish Blue', 'Blue 500', 'Blue Base'],
  contrastText: TextColours.TEXT_WHITE
};

export const ALICE_BLUE: PaletteColor = {
  value: '#DFE7F2',
  names: ['Alice Blue', 'Grey inline graph', 'Blue 50'],
  contrastText: TextColours.TEXT_BLACK
};

export const Blues: PaletteColor[] = [ALICE_BLUE, SPANISH_BLUE];

////// REDS //////

export const FLAME_RED: PaletteColor = {
  value: '#CC5A29',
  names: ['Flame Red', 'Red 800', 'Red Base'],
  contrastText: TextColours.TEXT_WHITE
};

export const SIZZLING_RED: PaletteColor = {
  value: '#ff5b62',
  names: ['Sizzling Red', 'Red 400'],
  contrastText: TextColours.TEXT_BLACK
};

export const Reds: PaletteColor[] = [FLAME_RED, SIZZLING_RED];

////// OTHER COLOURS /////

export const MAXIMUM_YELLOW_RED: PaletteColor = {
  value: '#fbc152',
  names: ['Maximum Yellow Red'],
  contrastText: TextColours.TEXT_BLACK
};

////// Other Colours /////

export const GraphColours: PaletteColor[] = [SPANISH_BLUE, ALICE_BLUE];

export const Palettes = {
  Neutrals,
  Greens,
  Pinks,
  Blues,
  Reds,
  GraphColours
};
