import { Bytes32, Address } from 'pollenium-buttercup';
import { Keypair } from 'pollenium-ilex';
import { Forgetmenot } from 'pollenium-forgetmenot';
export declare const xeranthemum: Forgetmenot;
export declare function computePrivateKey(struct: {
    knowUtf8: string;
    haveUtf8: string;
}): Promise<Bytes32>;
export declare function promptComputePrivateKey(): Promise<Bytes32>;
export declare function saveAddress(struct: {
    name: string;
    address: Address;
}): Promise<void>;
export declare function getAddress(name: string): Address | null;
export declare function promptNew(): Promise<void>;
export declare function promptFetchKeypair(name: string): Promise<Keypair>;
