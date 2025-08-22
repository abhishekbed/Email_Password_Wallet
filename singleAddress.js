const crypto = require("crypto");
const { Wallet } = require("ethers");
const bip39 = require("bip39");

function deriveSeedPhrase(email, password) {
    const input = `${email}:${password}`;
    const hash = crypto.createHash("sha256").update(input).digest("hex");
    const seedPhrase = bip39.entropyToMnemonic(hash);
    return seedPhrase;
}

function generateWalletFromSeedPhrase(seedPhrase) {
    const seed = bip39.mnemonicToSeedSync(seedPhrase);
    const privateKey = seed.slice(0, 32).toString('hex');
    const wallet = new Wallet(`0x${privateKey}`);
    return {
        seedPhrase,
        privateKey: wallet.privateKey,
        address: wallet.address,
    };
}

const email = "abc@gmail.com";
const password = "Abc@123";
const seedPhrase = deriveSeedPhrase(email, password);
const wallet = generateWalletFromSeedPhrase(seedPhrase);

console.log("Seed Phrase:", wallet.seedPhrase);
console.log("Private Key:", wallet.privateKey);
console.log("Wallet Address:", wallet.address);