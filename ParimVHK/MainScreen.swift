//
//  ContentView.swift
//  ParimVHK
//
//  Created by Eva Kazakovskaia on 11.01.2023.
//
//папа, [7. Feb 2023 at 22:22:17]:
//import Foundation
//
//struct Person: Codable {
//    var grade: String
//    var group: [String : String]
//    var arr: [String]?
//}
//
//var p = Person(grade: "Roxy", group: ["math": "C1", "eesti": "C2"])
//"group": {
//        "matemaatika": "G1",
//        "eesti keel": "G2"
//    }
//
//let jsonData = try JSONEncoder().encode(p)
//let jsonString = String(data: jsonData, encoding: .utf8)!
//
//print(jsonString)
//
//{"grade":"Roxy","group":{"math":"C1","eesti":"C2"}}
//Program ended with exit code: 0
import SwiftUI

struct JsonVhk: Codable {
    var grade: String
    var group: [String : String]
}

//var p = JsonVhk(grade: "12R", group: ["matemaatika": "G1", "eesti keel": "G2"])
//let jsonData = try JSONEncoder().encode(p)
//let jsonString = String(data: jsonData, encoding: .utf8)!

class MainScreenVM: ObservableObject {
    @Published var datas = [MainScreenStruct]()
    init() {
        loadData()
    }
    func loadData() {
        print("Fetching started")
        guard let url = URL(string: "http://localhost:3000/getMainScreen")
        else {
            print("Invalid URL")
            return
        }
        var p = JsonVhk(grade: "12R", group: ["matemaatika": "G1", "eesti keel": "G2"])
        
        let jsonData = try! JSONEncoder().encode(p)
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = jsonData
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let data = data {
                do {
                    let decoder = JSONDecoder()
                    decoder.keyDecodingStrategy = .convertFromSnakeCase
                    let response = try decoder.decode([MainScreenStruct].self, from: data)
                    DispatchQueue.main.async {
                        self.datas = response
                    }
                } catch {
                    print("Error parsing JSON: \(error.localizedDescription)")
                }
            }
        }.resume()
    }
}

struct MainScreen: View{
    @StateObject var list = MainScreenVM()
    var body: some View {
        ZStack{
            LinearGradient(colors: [.pink, .orange], //if all lessons are finished or a weekend than fun color
                           startPoint: .topLeading, endPoint: .bottomTrailing)
            .edgesIgnoringSafeArea(.all)
            
            VStack {
                VStack {
                    ProgressView(value: 2, total: 5) //value and total depends on the amount of lessons and lessons done
                        .padding()
                    HStack {
                        VStack(alignment: .leading) {
                            Text("Lessons done")
                                .font(.system(size: 20))
                            Label("3", systemImage: "house.fill") //instead of actual amount "300"
                        }
                        .padding()
                        Spacer()
                        VStack(alignment: .trailing) {
                            Text("Lessons left")
                                .font(.system(size: 20))
                            Label("2", systemImage: "flag.checkered.2.crossed")
                        }
                        .padding()
                    }
                    Spacer()
                    
                    HStack {
                        VStack(alignment: .center) {
                            Button(action: {
                                print("VENE SUUR SÖÖGISAAL")
                            }) {
//                                ForEach(list.datas) { item in
//                                    HStack{
//                                        Image(systemName: "brain.head.profile")
//                                            .font(.largeTitle)
//                                        Text(item.current_button.title)
//                                    }
//                                    .frame(minWidth: 0, maxWidth: .infinity)
//                                    .padding()
//                                    .foregroundColor(.white)
//                                    .background(LinearGradient(colors: [.indigo, .accentColor],
//                                                               startPoint: .bottomTrailing, endPoint: .leading))
//                                    .cornerRadius(10)
//                                    .shadow(color: .gray, radius: 5.0)
//                                    .padding()
//                                }
                            }
                            VStack() {
                                Text("Ends in {0} hours {20} minutes {4} seconds")
                                
                                
                            }
                        }
                    }
                    HStack {
                        VStack(alignment: .center) {
                            Button(action: {
                                print("VENE SUUR SÖÖGISAAL")
                            }) {
                                HStack{
                                    Image(systemName: "books.vertical.fill")
                                        .font(.largeTitle)
                                    Text("Next lesson is {English}")
                                        .font(.subheadline  )
                                }
                                .frame(minWidth: 0, maxWidth: .infinity)
                                .padding()
                                .foregroundColor(.white)
                                .background(LinearGradient(colors: [.indigo, .accentColor],
                                                           startPoint: .bottomTrailing, endPoint: .leading))
                                .cornerRadius(10)
                                .shadow(color: .gray, radius: 5.0)
                                .padding()
                            }
                            Text("The lesson starts at {14:50}")
                        }
                    }
                    HStack {
                        VStack(alignment: .center) {
                            Button(action: {
                                print("VENE SUUR SÖÖGISAAL")
                            }) {
                                HStack{
                                    Image(systemName: "fork.knife.circle.fill")
                                        .font(.largeTitle)
                                    Text("Lunch is in 1 hour 15 minutes 30 seconds")
                                        .font(.subheadline  )
                                }
                                .frame(minWidth: 0, maxWidth: .infinity)
                                .padding()
                                .foregroundColor(.white)
                                .background(LinearGradient(colors: [.indigo, .accentColor],
                                                           startPoint: .bottomTrailing, endPoint: .leading))
                                .cornerRadius(10)
                                .shadow(color: .gray, radius: 5.0)
                                .padding()
                            }
                        }
                    }
                    Spacer()
                    
                }
            }
        }
    }
}


struct TimeLeft_Previews: PreviewProvider {
    static var previews: some View {
        MainScreen()
    }
}
