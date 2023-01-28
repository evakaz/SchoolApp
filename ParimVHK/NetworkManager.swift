//
//  NetworkManager.swift
//  ParimVHK
//
//  Created by Eva Kazakovskaia on 23.01.2023.
//

import Foundation

class ButtonMain : Decodable {
    let title: String
    let titleIfPressed: String
    
    enum CodingKeys: String, CodingKey {
        case title = "title"
        case titleIfPressed = "titleIfPressed"
    }

    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.title = try container.decode(String.self, forKey: .title)
        self.titleIfPressed = try container.decode(String.self, forKey: .titleIfPressed)
    }
}

struct MainScreenStruct: Decodable, Identifiable { //Identifiable
    let id: UUID
    let type: String
    let current_button: ButtonMain
    let lunch_button: ButtonMain
    let next_button: ButtonMain
    let total_amount_of_lessons: Int
    let current_amount_of_lessons: Int
    
}


//
//{
//    "type": "success",
//    "current_button": {
//        "title": "Current lesson: matemaatika",
//        "titleIfPressed": "Time left: 00:20"
//    },
//    "lunch_button": {
//        "title": "Lunch in: 02:05",
//        "titleIfPressed": "vene suur söögisaal"
//    },
//    "next_button": {
//        "title": "Next lesson: muusikaajalugu. The lesson starts in: 00:35",
//        "titleIfPressed": "Room: AUD"
//    }
//}
