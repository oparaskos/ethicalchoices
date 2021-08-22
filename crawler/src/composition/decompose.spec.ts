import "mocha";

import * as chai from "chai";

import { decompose } from "./decompose";

const expect = chai.expect;

describe("Structured Product Composition", () => {
  it("should tag parts labelled as 'organic' with isOrganic", () => {
    const input = "100% Organic Cotton";
    const output = decompose(input);
    expect(output).to.deep.equal([
      {
        name: "cotton",
        description: input,
        isOrganic: true,
        weight: {
          "@type": "QuantitativeValue",
          unitCode: "P1",
          unitText: "%",
          value: 100,
        },
      },
    ]);
  });

  it("should split comma separated components into a list of products", () => {
    const input = "75% Cotton, 10% Polyester";
    const output = decompose(input);
    expect(output).to.deep.equal([
      {
        name: "cotton",
        description: '75% Cotton',
        weight: {
          "@type": "QuantitativeValue",
          unitCode: "P1",
          unitText: "%",
          value: 75,
        },
      },
      {
        name: "polyester",
        description: '10% Polyester',
        weight: {
          "@type": "QuantitativeValue",
          unitCode: "P1",
          unitText: "%",
          value: 10,
        },
      },
    ]);
  });

  it("should convert percent to mass when pack mass is known ", () => {
    const input = "10% Polyester";
    const output = decompose(input, { weight: "100g" } as any);
    expect(output).to.deep.equal([
      {
        name: "polyester",
        description: input,
        weight: {
          "@type": "QuantitativeValue",
          unitText: "g",
          unitCode: "GRM",
          value: 10,
        },
      },
    ]);
  });
});
