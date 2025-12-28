/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_LEAD_FORM_ID: string;
  readonly VITE_FORMSPREE_LAND_FORM_ID: string;
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_DEPOSIT_AMOUNT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

