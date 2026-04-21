import React from 'react';
import { PageHeader } from './PageHeader';
import { ListingGrid } from './ListingGrid';
import { TrustStrip } from './TrustStrip';

export const Sites: React.FC = () => (
  <>
    <PageHeader
      eyebrow="What's available right now"
      title="Available sites"
      subtitle="Yards, hardstanding and open storage land — ready when you are. Each site can be inspected and reserved within days."
    />
    <ListingGrid showHeading={false} />
    <TrustStrip />
  </>
);

export default Sites;
