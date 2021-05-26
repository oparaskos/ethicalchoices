import { Action, CreativeWork, Event, ImageObject, PropertyValue, Text, URL } from "schema-dts";

export declare type SchemaValue<T> = T | readonly T[];
export declare type IdReference = {
    /** IRI identifying the canonical address of this object. */
    "@id": string;
};
export interface ThingBase extends Partial<IdReference> {
    /** An additional type for the item, typically used for adding more specific types from external vocabularies in microdata syntax. This is a relationship between something and a class that the thing is in. In RDFa syntax, it is better to use the native RDFa syntax - the 'typeof' attribute - for multiple types. Schema.org tools may have only weaker understanding of extra types, in particular those defined externally. */
    "additionalType"?: SchemaValue<URL>;
    /** An alias for the item. */
    "alternateName"?: SchemaValue<Text>;
    /** A description of the item. */
    "description"?: SchemaValue<Text>;
    /** A sub property of description. A short description of the item used to disambiguate from other, similar items. Information from other properties (in particular, name) may be necessary for the description to be useful for disambiguation. */
    "disambiguatingDescription"?: SchemaValue<Text>;
    /** The identifier property represents any kind of identifier for any kind of {@link https://schema.org/Thing Thing}, such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See {@link /docs/datamodel.html#identifierBg background notes} for more details. */
    "identifier"?: SchemaValue<PropertyValue | Text | URL | IdReference>;
    /** An image of the item. This can be a {@link https://schema.org/URL URL} or a fully described {@link https://schema.org/ImageObject ImageObject}. */
    "image"?: SchemaValue<ImageObject | URL | IdReference>;
    /** Indicates a page (or other CreativeWork) for which this thing is the main entity being described. See {@link /docs/datamodel.html#mainEntityBackground background notes} for details. */
    "mainEntityOfPage"?: SchemaValue<CreativeWork | URL | IdReference>;
    /** The name of the item. */
    "name"?: SchemaValue<Text>;
    /** Indicates a potential Action, which describes an idealized action in which this thing would play an 'object' role. */
    "potentialAction"?: SchemaValue<Action | IdReference>;
    /** URL of a reference Web page that unambiguously indicates the item's identity. E.g. the URL of the item's Wikipedia page, Wikidata entry, or official website. */
    "sameAs"?: SchemaValue<URL>;
    /** A CreativeWork or Event about this Thing. */
    "subjectOf"?: SchemaValue<CreativeWork | Event | IdReference>;
    /** URL of the item. */
    "url"?: SchemaValue<URL>;
}

export function addToSchemaValue<T, U extends T>(toAdd: U, schemaValue: SchemaValue<T>): any {
  if (toAdd) {
    if (!schemaValue) {
      schemaValue = [];
    }
    if (!Array.isArray(schemaValue)) {
      schemaValue = [schemaValue as T];
    }
    const a = (schemaValue as T[]);
    if (!a.some(it => JSON.stringify(it) == JSON.stringify(toAdd))) {
      a.push(toAdd);
    }
    if (schemaValue.length == 1) {
        schemaValue = schemaValue[0];
    }
  }
  return schemaValue;
}