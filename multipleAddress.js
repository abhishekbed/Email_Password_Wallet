const crypto = require("crypto");
const { ethers } = require("ethers");
const bip39 = require("bip39");

function deriveSeedPhraseFromEmailAndPassword(email, password) {
    const input = `${email}:${password}`;
    const hash = crypto.createHash("sha256").update(input).digest("hex");
    const seedPhrase = bip39.entropyToMnemonic(hash);
    return seedPhrase;
}

function generateWalletsFromSeedPhrase(seedPhrase, numAddresses = 5) {
    if (!bip39.validateMnemonic(seedPhrase)) {
        throw new Error("Invalid seed phrase!");
    }
    const wallet = ethers.utils.HDNode.fromMnemonic(seedPhrase);
    const wallets = [];
    for (let i = 0; i < numAddresses; i++) {
        const childNode = wallet.derivePath(`m/44'/60'/0'/0/${i}`);
        wallets.push({
            index: i,
            address: childNode.address,
            privateKey: childNode.privateKey,
        });
    }
    return wallets;
}

const email = "abc@gmail.com";
const password = "Abc@123";
const numAddresses = 5;

try {
    const seedPhrase = deriveSeedPhraseFromEmailAndPassword(email, password);
    console.log("Derived Seed Phrase:", seedPhrase);
    const wallets = generateWalletsFromSeedPhrase(seedPhrase, numAddresses);
    wallets.forEach(wallet => {
        console.log(`Address ${wallet.index + 1}:`);
        console.log(`  Address: ${wallet.address}`);
        console.log(`  Private Key: ${wallet.privateKey}`);
        console.log();
    });
} catch (error) {
    console.error("Error:", error.message);
}
