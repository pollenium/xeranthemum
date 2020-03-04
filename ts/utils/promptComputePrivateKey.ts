import { computePrivateKey } from './computePrivateKey'
import prompt from 'prompt-promise'
import { Bytes32 } from 'pollenium-buttercup'

export async function promptComputePrivateKey(): Promise<Bytes32> {
  const knowUtf8 = await prompt.password('Something you know: ')
  const haveUtf8 = await prompt.password('Something you have: ')
  return computePrivateKey({ knowUtf8, haveUtf8 })
}
