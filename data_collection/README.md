# Data Collection Module — CardOS Dataset Architecture

Welcome to the dedicated **Data Collection** module for Credit Card OS (CardOS). This directory houses the 100% accurate, verified, bank-by-bank dataset structure and data verification schema.

---

## 📁 Directory Structure

```
data_collection/
├── schema/
│   └── cardSchema.ts        # Master 9-layer TypeScript schema definition
├── banks/
│   ├── hdfc.json            # HDFC Bank cards (Infinia, Regalia Gold, etc.)
│   ├── axis.json            # Axis Bank cards (Atlas, Magnus, etc.)
│   ├── icici.json           # ICICI Bank cards (Emeralde, Amazon Pay, etc.)
│   ├── sbi.json             # SBI Card datasets (Elite, Cashback, etc.)
│   ├── amex.json            # American Express India datasets (Platinum, MRCC)
│   └── index.ts             # Master aggregator exporting ALL_BANK_DATASETS
└── README.md                # Documentation & Expansion Guidelines
```

---

## 🎯 9 Core Layers per Credit Card Spec

1. **Card Identity:** Name, variant, network (Visa/Mastercard/RuPay/Amex), tier.
2. **Fees & Annual Waiver Thresholds:** Joining fee, annual fee, waiver threshold, exclusion categories.
3. **Base & Accelerated Reward Engine:** Base return %, point valuation breakdown (flights, hotels, cash credit), category multipliers.
4. **Category Exclusions:** MCC codes, surcharge caps, zero-reward categories (Fuel, Rent, Utilities, Wallet).
5. **Voucher Multipliers:** Gyftr, SmartBuy, GrabDeals, and Treat portals.
6. **Partner Transfers:** Airline miles & hotel loyalty transfer ratios.
7. **Lounge & Travel Perks:** Domestic quarterly caps, quarterly spend requirements (₹35,000 rule), Priority Pass.
8. **Forex & Financial Fees:** Foreign currency markup % (0%, 0.99%, 2.0%, 3.5%).
9. **Verification Metadata:** `lastUpdated`, `verifiedBy`, and official bank MITC `sourceDocumentUrl`.

---

## 🚀 How to Add a New Bank Dataset

1. Create a new JSON file inside `data_collection/banks/<bank_id>.json` (e.g. `idfc.json`, `kotak.json`, `federal.json`).
2. Populate card objects strictly following `data_collection/schema/cardSchema.ts`.
3. Import and spread the new JSON file in `data_collection/banks/index.ts`.
