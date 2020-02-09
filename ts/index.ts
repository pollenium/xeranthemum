import { pbkdf2 } from 'crypto'
import { Bytes32, Address } from 'pollenium-buttercup'
import prompt from 'prompt-promise'
import { Uu } from 'pollenium-uvaursi'
import { Keypair } from 'pollenium-ilex'
import fs from 'fs'

const addressesPath = `${__dirname}/../addresses`

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

export async function promptComputePrivateKey(): Promise<Bytes32> {
  const knowUtf8 = await prompt.password('Something you know: ')
  const haveUtf8 = await prompt.password('Something you have: ')
  return computePrivateKey({ knowUtf8, haveUtf8 })
}

export function getAddressPath(name: string): string {
  return `${addressesPath}/${name}.hex.txt`
}

export function saveAddress(struct: {
    name: string,
    address: Address
}): void {
  const { name, address } = struct
  if (getAddress(name) !== null) {
    throw new Error(`${name} already exists`)
  }
  fs.writeFileSync(getAddressPath(name), address.uu.toHex(), 'utf8')
}

export function getAddress(name: string): Address | null {
  const addressPath = getAddressPath(name)
  if (!fs.existsSync(addressPath)) {
    return null
  }
  const addressHex = fs.readFileSync(addressPath, 'utf8')
  return new Address(Uu.fromHexish(addressHex))
}

export async function promptNew(): Promise<void> {
  const name = await prompt('Name: ')
  const privateKey = await promptComputePrivateKey()
  const keypair = new Keypair(privateKey)
  saveAddress({
    name,
    address: keypair.getAddress()
  })
}

export async function promptFetchKeypair(name: string): Promise<Keypair> {
  const address = getAddress(name)
  if (address === null) {
    throw new Error(`${name} does not exist`)
  }
  const privateKey = await promptComputePrivateKey()
  const keypair = new Keypair(privateKey)
  if (!keypair.getAddress().uu.getIsEqual(address.uu)) {
    throw new Error('Address mismatch')
  }
  return keypair
}
