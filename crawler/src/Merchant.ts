import { SchemaValue, ThingBase } from './schema';

import { Organization } from 'schema-dts'

export interface EthicalPolicy extends ThingBase {
    "@type": "EthicalPolicy";
}

export interface MerchantExtensions extends ThingBase {
    "@type": "Organization";
    ethicsPolicy: SchemaValue<EthicalPolicy>
}

export type Merchant = Organization & MerchantExtensions;