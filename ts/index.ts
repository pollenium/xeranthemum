import { pbkdf2 } from 'crypto'
import { Bytes32 } from 'pollenium-buttercup'
import Prompt from 'prompt-password'
import { Uu } from 'pollenium-uvaursi'

const salt = Uu.fromHexish('830a46600f948915d616413455e14c7d6dc08845128cd7a5f93777af5601060d')
const iterations = Number.MAX_SAFE_INTEGER
const keyLength = 32
const digest = 'sha256'

export async function computePrivateKey(struct: {
  knowUtf8: string,
  haveUtf8: string
}): Promise<Bytes32> {
  const { knowUtf8, haveUtf8 } = struct

  const know = Uu.fromUtf8(knowUtf8.trim())
  const have = Uu.fromUtf8(haveUtf8.trim())
  const knowAndhave = Uu.genConcat([know, have])

  return new Promise<Bytes32>((resolve, reject) => {
    pbkdf2(knowAndhave.u, salt.u, iterations, keyLength, digest, (error, derivedKey) => {
      if (error) {
        reject(error)
        return
      }
      resolve(new Bytes32(derivedKey))
    })

  })
}

export async function promptPrivateKey(): Promise<Bytes32> {

  const knowUtf8 = await new Prompt({
    name: 'know',
    type: 'password',
    message: 'Something you know...'
  }).run()

  const haveUtf8 = await new Prompt({
    name: 'have',
    type: 'password',
    message: 'Something you have...'
  }).run()

  return computePrivateKey({ knowUtf8, haveUtf8 })
}
