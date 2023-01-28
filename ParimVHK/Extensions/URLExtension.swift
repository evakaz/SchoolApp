//
//  URLExtension.swift
//  ParimVHK
//
//  Created by Eva Kazakovskaia on 26.01.2023.
//

import Foundation
extension URL {
    static func getURL() -> URL? {
        guard let url = URL(string: "http://localhost:3000/getMainScreen")
        else {
            print("Invalid URL")
            return nil
        }
        return url
    }
}
