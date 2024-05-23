import { Meta, StoryObj } from '@storybook/react';

import FacilitySearch from 'components/ACR/FacilitySearch/FacilitySearchApp';
import ContainerFullWidth from '../Container/ContainerFullWidth/ContainerFullWidth';
import ContainerFullBleed from '../Container/ContainerFullBleed/ContainerFullBleed';

import { defaultMockData } from './FacilitySearch.mock';
import { defaultMockData as containerFullBleedMockData } from 'components/ACR/Container/ContainerFullBleed/ContainerFullBleed.mock';
import { defaultMockData as containerFullWidthMockData } from 'components/ACR/Container/ContainerFullWidth/ContainerFullWidth.mock';
import { sampleText } from 'src/variables/global';

export default {
  title: 'Components/Facility Search',
  component: FacilitySearch,
  tags: ['autodocs'],
} as Meta<typeof FacilitySearch>;

type Story = StoryObj<typeof FacilitySearch>;

export const Default: Story = {
  args: defaultMockData,
};

export const InContext: Story = {
  args: defaultMockData,
  render: (args) => {
    return (
      <ContainerFullBleed {...containerFullBleedMockData}>
        <ContainerFullWidth {...containerFullWidthMockData}>
          <p>{sampleText}</p>
        </ContainerFullWidth>
        <ContainerFullWidth {...containerFullWidthMockData}>
          <FacilitySearch {...args} />
        </ContainerFullWidth>
        <ContainerFullWidth {...containerFullWidthMockData}>
          <p>{sampleText}</p>
        </ContainerFullWidth>
      </ContainerFullBleed>
    );
  },
};
