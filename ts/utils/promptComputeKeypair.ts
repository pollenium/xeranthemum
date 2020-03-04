import { Keypair } from 'pollenium-ilex'
import { promptComputePrivateKey } from './promptComputePrivateKey'

export async function promptComputeKeypair(): Promise<Keypair> {
  const privateKey = await promptComputePrivateKey()
  return new Keypair(privateKey)
}
