import Foundation
import CoreGraphics

enum AppStoreDevice: String, CaseIterable, Identifiable {
    case iphone = "IPHONE"
    case ipad = "IPAD"
    case mac = "MAC"
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
        
        AppStoreSize(name: "iPad 13in (2064x2752)", device: .ipad, size: CGSize(width: 2064, height: 2752)),
        AppStoreSize(name: "iPad 13in (2752x2064)", device: .ipad, size: CGSize(width: 2752, height: 2064)),
        AppStoreSize(name: "iPad 12.9in (2048x2732)", device: .ipad, size: CGSize(width: 2048, height: 2732)),
        AppStoreSize(name: "iPad 12.9in (2732x2048)", device: .ipad, size: CGSize(width: 2732, height: 2048)),
        
        AppStoreSize(name: "Mac 1280x800", device: .mac, size: CGSize(width: 1280, height: 800)),
        AppStoreSize(name: "Mac 1440x900", device: .mac, size: CGSize(width: 1440, height: 900)),
        AppStoreSize(name: "Mac 2560x1600", device: .mac, size: CGSize(width: 2560, height: 1600)),
        AppStoreSize(name: "Mac 2880x1800", device: .mac, size: CGSize(width: 2880, height: 1800))
    ]
}
