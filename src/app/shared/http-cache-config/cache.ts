import { HttpContextToken } from "@angular/common/http";

interface CacheToken {
  cached: boolean;
  id: string | null;
}

const cacheToken: CacheToken = {
  cached: false,
  id: null
}

export const CACHE_REQUEST = new HttpContextToken<CacheToken>(() => cacheToken);
