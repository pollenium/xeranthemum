import { Bytes32 } from 'pollenium-buttercup';
export declare function computePrivateKey(struct: {
    knowUtf8: string;
    haveUtf8: string;
}): Promise<Bytes32>;
