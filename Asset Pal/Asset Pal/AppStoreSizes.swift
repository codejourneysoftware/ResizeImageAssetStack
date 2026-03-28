import Foundation
import CoreGraphics

enum AppStoreDevice: String, CaseIterable, Identifiable {
    case iphone = "IPHONE"
    case ipad = "IPAD"
    var id: String { rawValue }
}

struct AppStoreSize: Identifiable, Hashable {
    let id = UUID()
    let name: String
    let device: AppStoreDevice
    /// The size stored in portrait orientation. We swap these at runtime if the source image is landscape.
    let portraitSize: CGSize
}

struct AppStoreTargetSizes {
    static let sizes: [AppStoreSize] = [
        AppStoreSize(name: "iPhone_6.5in", device: .iphone, portraitSize: CGSize(width: 1242, height: 2688)),
        AppStoreSize(name: "iPhone_6.7in", device: .iphone, portraitSize: CGSize(width: 1284, height: 2778)),
        AppStoreSize(name: "iPad_13in", device: .ipad, portraitSize: CGSize(width: 2064, height: 2752)),
        AppStoreSize(name: "iPad_12.9in", device: .ipad, portraitSize: CGSize(width: 2048, height: 2732))
    ]
}
