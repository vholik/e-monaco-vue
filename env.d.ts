/// <reference types="vite/client" />

interface ImportMetaEnv {
  env: {
    VITE_SERVER_BASE_URL: string
  }
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
