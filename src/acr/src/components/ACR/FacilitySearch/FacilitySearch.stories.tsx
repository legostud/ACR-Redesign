import { Meta, StoryObj } from '@storybook/react';

import FacilitySearch from 'components/ACR/FacilitySearch/FacilitySearchApp';
import ContainerFullWidth from '../Container/ContainerFullWidth/ContainerFullWidth';
import ContainerFullBleed from '../Container/ContainerFullBleed/ContainerFullBleed';
import Container70 from '../Container/Container70/Container70';
import TextCards from '../TextCards/TextCards';

import { defaultMockData } from './FacilitySearch.mock';
import { defaultMockData as containerFullBleedMockData } from 'components/ACR/Container/ContainerFullBleed/ContainerFullBleed.mock';
import { defaultMockData as containerFullWidthMockData } from 'components/ACR/Container/ContainerFullWidth/ContainerFullWidth.mock';
import { defaultMockData as container70MockData } from 'components/ACR/Container/Container70/Container70.mock';
import { defaultMockData as textCardsMockData } from 'components/ACR/TextCards/TextCards.mock';
import { sampleText } from 'src/variables/global';
import { Theme } from 'src/enumerations/Theme.enum';

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
      <>
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
        <ContainerFullBleed {...containerFullBleedMockData} params={{ theme: Theme.LIGHT_INDIGO }}>
          <Container70 {...container70MockData}>
            <TextCards {...textCardsMockData} />
          </Container70>
        </ContainerFullBleed>
      </>
    );
  },
};
