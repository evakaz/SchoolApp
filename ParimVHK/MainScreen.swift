//
//  ContentView.swift
//  ParimVHK
//
//  Created by Eva Kazakovskaia on 11.01.2023.

import SwiftUI

struct JsonVhk: Codable {
    var grade: String
    var group: [String : String]
}

struct MainScreenData {
    var currentTitle: String
    var currentIfPressed: String
    var total_amount_of_lessons: Int
    var current_amount_of_lessons: Int
    var lunchTitle: String
    var lucnRoom: String
    var nextLessonTitle: String
    var nextLessonIfPressed: String
}

class MainScreenVM: ObservableObject {
    @Published var datas =  MainScreenData(currentTitle: "Loading", currentIfPressed: "Loading", total_amount_of_lessons: 0, current_amount_of_lessons: 0, lunchTitle: "Loading", lucnRoom: "Loading", nextLessonTitle: "Loading", nextLessonIfPressed: "Loading")
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
                    let response = try decoder.decode(MainScreenStruct.self, from: data)
                    print(response)
                    DispatchQueue.main.async {
                        self.datas.currentTitle = response.current_button.title
                        self.datas.currentIfPressed = response.current_button.titleIfPressed
                        self.datas.total_amount_of_lessons = response.total_amount_of_lessons
                        self.datas.current_amount_of_lessons = response.current_amount_of_lessons
                        self.datas.lunchTitle = response.lunch_button.title
                        self.datas.lucnRoom = response.lunch_button.titleIfPressed
                        self.datas.nextLessonTitle = response.next_button.title
                        self.datas.nextLessonIfPressed = response.next_button.titleIfPressed
                    }
                } catch {
                    print("Error parsing JSON: \(error.localizedDescription)")
                }
            }
        }.resume()
    }
}

struct MainScreen: View{
    @StateObject var data = MainScreenVM()
    var body: some View {
        ZStack{
            LinearGradient(colors: [.pink, .orange], //if all lessons are finished or a weekend than fun color
                           startPoint: .topLeading, endPoint: .bottomTrailing)
            .edgesIgnoringSafeArea(.all)
            
            VStack {
                VStack {
                    ProgressView(value: Float(data.datas.current_amount_of_lessons), total: Float(data.datas.total_amount_of_lessons)) //value and total depends on the amount of lessons and lessons done
                        .padding()
                    HStack {
                        VStack(alignment: .leading) {
                            Text("Lessons done")
                                .font(.system(size: 20))
                            Label(String(data.datas.current_amount_of_lessons), systemImage: "house.fill") //instead of actual amount "300"
                        }
                        .padding()
                        Spacer()
                        VStack(alignment: .trailing) {
                            Text("Lessons left")
                                .font(.system(size: 20))
                            Label(String(data.datas.total_amount_of_lessons), systemImage: "flag.checkered.2.crossed")
                        }
                        .padding()
                    }
                    Spacer()
                    
                    HStack {
                        VStack(alignment: .center) {
                            Button(action: {
                                print("VENE SUUR SÖÖGISAAL")
                            }) {
                                HStack{
                                    Image(systemName: "brain.head.profile")
                                        .font(.largeTitle)
                                    Text(data.datas.currentTitle)
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
                            VStack() {
                                Text(data.datas.currentIfPressed)
                                
                                
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
                                    Text(data.datas.nextLessonTitle)
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
                            Text(data.datas.nextLessonIfPressed)
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
                                    Text(data.datas.lunchTitle)
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
                            Text(String(data.datas.lucnRoom))
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
