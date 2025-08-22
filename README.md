# 📌 Wallet Generator using Email & Password

This Node.js project allows you to generate a deterministic Ethereum
wallet (or multiple wallets) using just an email and password as input.

## 🚀 Features

- Generate a **single Ethereum wallet** using email + password.
- Generate **multiple Ethereum wallets** (HD wallets) from the same
  seed phrase.
- Uses **SHA-256 hashing**, **BIP39 seed phrase**, and **ethers.js**
  for wallet derivation.

## 🛠 Tech Stack

- Node.js
- crypto (for hashing email:password)
- bip39 (for mnemonic seed phrase)
- ethers.js (for wallet generation)
