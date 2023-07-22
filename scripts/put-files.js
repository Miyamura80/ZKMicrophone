const process = require("process")
const { Web3Storage, getFilesFromPath } = require("web3.storage");

async function main () {
  const token = process.env.API_TOKEN

  if (!token) {
    return console.error('A token is needed. You can create one on https://web3.storage')
  }

  const storage = new Web3Storage({ token })
  const files = (await Promise.all(["./test.wav"].map(path => getFilesFromPath(path)))).flat()

  console.log(`Uploading ${files.length} files`)
  const cid = await storage.put(files)
  console.log('Content added with CID:', cid)
}

main()
