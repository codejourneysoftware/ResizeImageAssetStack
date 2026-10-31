import Foundation
import CoreGraphics

enum AppStoreDevice: String, CaseIterable, Identifiable {
    case iphone = "IPHONE"
    case iphoneDuo = "IPHONE DUO"
    case ipad = "IPAD"
    case mac = "MAC"
    case tv = "APPLE TV"
    case banners = "BANNERS"
    case android = "ANDROID"
    var id: String { rawValue }
}

struct AppStoreSize: Identifiable, Hashable {
    let id = UUID()
    let name: String
    let device: AppStoreDevice
    let size: CGSize
}

struct AppStoreTargetSizes {
    static let sizes: [AppStoreSize] = [
        AppStoreSize(name: "iPhone 6.5in (1242x2688)", device: .iphone, size: CGSize(width: 1242, height: 2688)),
        AppStoreSize(name: "iPhone 6.5in (2688x1242)", device: .iphone, size: CGSize(width: 2688, height: 1242)),
        AppStoreSize(name: "iPhone 6.7in (1284x2778)", device: .iphone, size: CGSize(width: 1284, height: 2778)),
        AppStoreSize(name: "iPhone 6.7in (2778x1284)", device: .iphone, size: CGSize(width: 2778, height: 1284)),
        
        AppStoreSize(name: "iPhone Duo (1398x2034)", device: .iphoneDuo, size: CGSize(width: 1398, height: 2034)),
        AppStoreSize(name: "iPhone Duo (2034x1398)", device: .iphoneDuo, size: CGSize(width: 2034, height: 1398)),
        AppStoreSize(name: "iPhone Duo (2007x2853)", device: .iphoneDuo, size: CGSize(width: 2007, height: 2853)),
        AppStoreSize(name: "iPhone Duo (2853x2007)", device: .iphoneDuo, size: CGSize(width: 2853, height: 2007)),
        
        AppStoreSize(name: "iPad 13in (2064x2752)", device: .ipad, size: CGSize(width: 2064, height: 2752)),
        AppStoreSize(name: "iPad 13in (2752x2064)", device: .ipad, size: CGSize(width: 2752, height: 2064)),
        AppStoreSize(name: "iPad 12.9in (2048x2732)", device: .ipad, size: CGSize(width: 2048, height: 2732)),
        AppStoreSize(name: "iPad 12.9in (2732x2048)", device: .ipad, size: CGSize(width: 2732, height: 2048)),
        
        AppStoreSize(name: "Mac 1280x800", device: .mac, size: CGSize(width: 1280, height: 800)),
        AppStoreSize(name: "Mac 1440x900", device: .mac, size: CGSize(width: 1440, height: 900)),
        AppStoreSize(name: "Mac 2560x1600", device: .mac, size: CGSize(width: 2560, height: 1600)),
        AppStoreSize(name: "Mac 2880x1800", device: .mac, size: CGSize(width: 2880, height: 1800)),
        
        AppStoreSize(name: "Apple TV 1080p (1920x1080)", device: .tv, size: CGSize(width: 1920, height: 1080)),
        AppStoreSize(name: "Apple TV 4K (3840x2160)", device: .tv, size: CGSize(width: 3840, height: 2160)),
        
        AppStoreSize(name: "Header & Search (5244x2950)", device: .banners, size: CGSize(width: 5244, height: 2950)),
        AppStoreSize(name: "Header (3840x1646)", device: .banners, size: CGSize(width: 3840, height: 1646)),
        AppStoreSize(name: "Search Results (3840x2560)", device: .banners, size: CGSize(width: 3840, height: 2560)),
        AppStoreSize(name: "Search Results (1920x1280)", device: .banners, size: CGSize(width: 1920, height: 1280)),
        
        AppStoreSize(name: "Android Phone (1080x1920)", device: .android, size: CGSize(width: 1080, height: 1920)),
        AppStoreSize(name: "Android Phone (1920x1080)", device: .android, size: CGSize(width: 1920, height: 1080)),
        AppStoreSize(name: "Android Phone (1440x2560)", device: .android, size: CGSize(width: 1440, height: 2560)),
        AppStoreSize(name: "Android Phone (2560x1440)", device: .android, size: CGSize(width: 2560, height: 1440)),
        AppStoreSize(name: "Android Phone (2160x3840)", device: .android, size: CGSize(width: 2160, height: 3840)),
        AppStoreSize(name: "Android Phone (3840x2160)", device: .android, size: CGSize(width: 3840, height: 2160))
    ]
}
