# Voting-dapp

A decentralized voting application built on Solana, allowing users to create and participate in on-chain polls with a modern web interface.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Smart Contract**: Rust, Anchor Framework
- **Blockchain**: Solana

## Features

- Create and manage on-chain voting polls
- Cast votes recorded directly on the Solana blockchain
- Connect via Solana wallet adapters
- Local validator support for development and testing

## Prerequisites

- Node.js v18.18.0+
- Rust v1.77.2+
- Anchor CLI 0.30.1+
- Solana CLI 1.18.17+

## Getting Started

```shell
git clone <repo-url>
cd <repo-name>
pnpm install
pnpm dev
```

## Smart Contract (Anchor)

```shell
# Sync program ID
pnpm anchor keys sync

# Build
pnpm anchor-build

# Run local validator
pnpm anchor-localnet

# Run tests
pnpm anchor-test

# Deploy to devnet
pnpm anchor deploy --provider.cluster devnet
```

> After running `keys sync`, update the program ID constant in `anchor/lib/counter-exports.ts` to match.

## Web App

```shell
pnpm dev       # Start dev server
pnpm build     # Production build
```
