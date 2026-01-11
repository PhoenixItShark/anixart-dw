/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_TOKEN: string
  readonly VITE_VERSION_CODE: string
  readonly VITE_IS_BETA: string
  readonly VITE_HELPER_URL: string
  readonly VITE_IS_API_ALT: string
  readonly VITE_EXTENDED_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}