/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_API_LOCATION?: string;
  readonly REACT_APP_RECAPTCHA_SITEKEY?: string;
  readonly REACT_APP_YEAR?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
