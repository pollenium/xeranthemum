import { Uu } from 'pollenium-uvaursi'
import crypto from 'crypto'
import prompt from 'prompt-promise'
import { Bytes32 } from 'pollenium-buttercup'

const salt = Uu.fromHexish('830a46600f948915d616413455e14c7d6dc08845128cd7a5f93777af5601060d')
const iterations = Math.pow(2, 32) - 1
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
    crypto.pbkdf2(knowAndhave.u, salt.u, iterations, keyLength, digest, (error, derivedKey) => {
      if (error) {
        reject(error)
        return
      }
      resolve(new Bytes32(derivedKey))
    })

  })
}
