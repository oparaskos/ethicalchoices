// ButtonGroup.stories.js | ButtonGroup.stories.jsx

import React from 'react';

import { Story, Meta } from '@storybook/react';
import { QuantitativeValue, QuantitativeValueProps  } from '../components/quantitative-value';

export default {
  title: 'QuantitativeValue',
  component: QuantitativeValue,
} as Meta;

const Template: Story<QuantitativeValueProps> = (args) => <QuantitativeValue {...args} />;

export const Generic = Template.bind({});
Generic.args = {
  title: 'Example',
  data: {
    // minValue: 0
    // maxValue: 0,
    value: 10,
    unitCode: 'P1',
    unitText: '%'
  }
};