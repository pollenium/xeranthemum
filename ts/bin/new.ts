import { utils } from '../'
import { Forgetmenot } from 'pollenium-forgetmenot'
import prompt from 'prompt-promise'

const forgetmenot = new Forgetmenot(`${__dirname}/../../ts/users`)

export async function run(): Promise<void> {
  const name = await prompt('Name: ')
  const keypair = await utils.promptComputeKeypair()
  forgetmenot.set({
    key: name,
    value: keypair.getAddress()
  })
}

run()
