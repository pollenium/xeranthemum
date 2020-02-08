import { promptPrivateKey } from '../'

promptPrivateKey().then((privateKey) => {
  console.log(privateKey.uu.toHex())
})
