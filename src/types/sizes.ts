export type AppStoreDevice =
  | "IPHONE"
  | "IPHONE DUO"
  | "IPAD"
  | "MAC"
  | "APPLE TV"
  | "APPLE BANNERS"
  | "ANDROID"
  | "ANDROID BANNERS";

export const APP_STORE_DEVICES: AppStoreDevice[] = [
  "IPHONE",
  "IPHONE DUO",
  "IPAD",
  "MAC",
  "APPLE TV",
  "APPLE BANNERS",
  "ANDROID",
  "ANDROID BANNERS",
];

export interface AppStoreSize {
  id: string;
  name: string;
  device: AppStoreDevice;
  width: number;
  height: number;
}

export const APP_STORE_TARGET_SIZES: AppStoreSize[] = [
  // iPhone
  { id: "iphone-65-p", name: "iPhone 6.5in (1242x2688)", device: "IPHONE", width: 1242, height: 2688 },
  { id: "iphone-65-l", name: "iPhone 6.5in (2688x1242)", device: "IPHONE", width: 2688, height: 1242 },
  { id: "iphone-67-p", name: "iPhone 6.7in (1284x2778)", device: "IPHONE", width: 1284, height: 2778 },
  { id: "iphone-67-l", name: "iPhone 6.7in (2778x1284)", device: "IPHONE", width: 2778, height: 1284 },

  // iPhone Duo
  { id: "iphone-duo-1", name: "iPhone Duo (1398x2034)", device: "IPHONE DUO", width: 1398, height: 2034 },
  { id: "iphone-duo-2", name: "iPhone Duo (2034x1398)", device: "IPHONE DUO", width: 2034, height: 1398 },
  { id: "iphone-duo-3", name: "iPhone Duo (2007x2853)", device: "IPHONE DUO", width: 2007, height: 2853 },
  { id: "iphone-duo-4", name: "iPhone Duo (2853x2007)", device: "IPHONE DUO", width: 2853, height: 2007 },

  // iPad
  { id: "ipad-13-p", name: "iPad 13in (2064x2752)", device: "IPAD", width: 2064, height: 2752 },
  { id: "ipad-13-l", name: "iPad 13in (2752x2064)", device: "IPAD", width: 2752, height: 2064 },
  { id: "ipad-129-p", name: "iPad 12.9in (2048x2732)", device: "IPAD", width: 2048, height: 2732 },
  { id: "ipad-129-l", name: "iPad 12.9in (2732x2048)", device: "IPAD", width: 2732, height: 2048 },

  // Mac
  { id: "mac-1280", name: "Mac 1280x800", device: "MAC", width: 1280, height: 800 },
  { id: "mac-1440", name: "Mac 1440x900", device: "MAC", width: 1440, height: 900 },
  { id: "mac-2560", name: "Mac 2560x1600", device: "MAC", width: 2560, height: 1600 },
  { id: "mac-2880", name: "Mac 2880x1800", device: "MAC", width: 2880, height: 1800 },

  // Apple TV
  { id: "tv-1080", name: "Apple TV 1080p (1920x1080)", device: "APPLE TV", width: 1920, height: 1080 },
  { id: "tv-4k", name: "Apple TV 4K (3840x2160)", device: "APPLE TV", width: 3840, height: 2160 },

  // Apple Banners
  { id: "apple-banner-header-search", name: "Header & Search (5244x2950)", device: "APPLE BANNERS", width: 5244, height: 2950 },
  { id: "apple-banner-header", name: "Header (3840x1646)", device: "APPLE BANNERS", width: 3840, height: 1646 },
  { id: "apple-banner-search-1", name: "Search Results (3840x2560)", device: "APPLE BANNERS", width: 3840, height: 2560 },
  { id: "apple-banner-search-2", name: "Search Results (1920x1280)", device: "APPLE BANNERS", width: 1920, height: 1280 },

  // Android Phones
  { id: "android-1080-p", name: "Android Phone (1080x1920)", device: "ANDROID", width: 1080, height: 1920 },
  { id: "android-1080-l", name: "Android Phone (1920x1080)", device: "ANDROID", width: 1920, height: 1080 },
  { id: "android-1440-p", name: "Android Phone (1440x2560)", device: "ANDROID", width: 1440, height: 2560 },
  { id: "android-1440-l", name: "Android Phone (2560x1440)", device: "ANDROID", width: 2560, height: 1440 },
  { id: "android-2160-p", name: "Android Phone (2160x3840)", device: "ANDROID", width: 2160, height: 3840 },
  { id: "android-2160-l", name: "Android Phone (3840x2160)", device: "ANDROID", width: 3840, height: 2160 },

  // Android Banners (Google Play)
  { id: "android-banner-feature", name: "Feature Graphic (1024x500)", device: "ANDROID BANNERS", width: 1024, height: 500 },
  { id: "android-banner-tv", name: "TV Banner (1280x720)", device: "ANDROID BANNERS", width: 1280, height: 720 },
];
