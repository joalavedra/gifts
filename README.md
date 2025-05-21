# Email to Stables

## Introduction
Email to Stables is a decentralized application (dApp) that allows users to send stablecoins (USDC) to others via easily shareable claim links. It aims to simplify crypto payments by tokenizing assets that can be redeemed for their underlying value. The application operates on the Ancient8 Sepolia network.

## Features
- **Deposit USDC:** Users can deposit USDC into the platform.
- **Buy Tokens:** Purchase unique tokens that represent real-world gaming items or other assets, backed by USDC.
- **Send via Claim Link:** Generate a unique link for the tokens purchased, which can be shared with anyone.
- **Claim Tokens:** Recipients can use the claim link to receive the tokens/underlying stablecoins.
- **Reclaim Tokens:** Senders can reclaim tokens that haven't been claimed.
- **Redeem for USDC:** Tokens held by users can be redeemed back for their equivalent value in USDC.

## How it Works
1.  **Deposit:** Connect your wallet and deposit USDC on the Ancient8 Sepolia network via the Deposit page.
2.  **Buy:** Purchase a token from the available selection.
3.  **Send:** Generate a claim link for your purchased token.
4.  **Share:** Privately share this link with your friend.
5.  **Claim:** The recipient opens the link to claim the stables/tokens.

## Technology Stack
- **Frontend:** Next.js, React, TypeScript
- **Styling:** Tailwind CSS
- **Blockchain Interaction:** Wagmi, Viem
- **Wallet Infrastructure:** Openfort
- **Network:** Ancient8 Sepolia

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- Yarn (v1.22.17 or as specified in `package.json`)

### Installation
1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd Giftquest 
    ```
    (Or your chosen directory name)
3.  Install dependencies:
    ```bash
    yarn install
    ```

### Environment Variables
Copy the example environment file `.env.example` to a new file named `.env`:
```bash
cp .env.example .env
```
Then, open `.env` and fill in the required environment variables:
- `NEXT_PUBLIC_POLICY_ID`: Your Openfort Policy ID.
- `NEXT_PUBLIC_CONTRACT_ID`: Your Gift Token Contract ID/Address.
- `NEXT_PUBLIC_USDC_CONTRACT_ID`: Your USDC Contract ID/Address.
- `NEXT_PRIVATE_ENCRYPTION_KEY`: A private key used for encryption purposes.
- `NEXT_PUBLIC_PLAYER_ID`: Your Openfort Player ID.
- `NEXT_PRIVATE_OPENFORT_SECRET_KEY`: Your Openfort Secret API Key.

Ensure these variables are kept secure and are not committed to your repository if they contain sensitive information (especially the private keys). The `.gitignore` file should already be configured to ignore `.env`.

### Running the Development Server
To start the development server:
```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production
To build the application for production:
```bash
yarn build
```
To start the production server:
```bash
yarn start
```

## Linting
To run the linter and check for code quality:
```bash
yarn lint
```

## Important Notes
- Share claim links privately, as anyone with the link can claim the assets.
- Unclaimed stables/tokens can be reclaimed from your Send History.
- All tokens can always be redeemed for the underlying USDC.
