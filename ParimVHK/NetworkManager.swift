//
//  NetworkManager.swift
//  ParimVHK
//
//  Created by Eva Kazakovskaia on 23.01.2023.
//

import Foundation

class ButtonMain : Codable {
    var title: String
    var titleIfPressed: String
}

struct MainScreenStruct: Codable {
    var type: String
    var current_button: ButtonMain
    var total_amount_of_lessons: Int
    var current_amount_of_lessons: Int
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
