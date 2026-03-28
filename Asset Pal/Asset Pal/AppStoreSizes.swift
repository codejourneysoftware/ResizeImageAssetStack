import Foundation
import CoreGraphics

struct AppStoreSize: Identifiable, Hashable {
    let id = UUID()
    let name: String
    /// The size stored in portrait orientation. We swap these at runtime if the source image is landscape.
    let portraitSize: CGSize
}

struct AppStoreTargetSizes {
    static let sizes: [AppStoreSize] = [
        AppStoreSize(name: "iPhone_6.5in", portraitSize: CGSize(width: 1242, height: 2688)),
        AppStoreSize(name: "iPhone_6.7in", portraitSize: CGSize(width: 1284, height: 2778)),
        AppStoreSize(name: "iPad_13in", portraitSize: CGSize(width: 2064, height: 2752)),
        AppStoreSize(name: "iPad_12.9in", portraitSize: CGSize(width: 2048, height: 2732))
    ]
}
