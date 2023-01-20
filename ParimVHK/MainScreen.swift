//
//  ContentView.swift
//  ParimVHK
//
//  Created by Eva Kazakovskaia on 11.01.2023.
//

import SwiftUI

struct MainScreen: View {
    @State private var isWeekday = false
    var body: some View {
        //var totalAmountOfLessons : Int = 3
        ZStack{
            LinearGradient(colors: [.pink, .orange], //if all lessons are finished or a weekend than fun color
                           startPoint: .topLeading, endPoint: .bottomTrailing)
            .edgesIgnoringSafeArea(.all)
            
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
                            HStack{
                                Image(systemName: "brain.head.profile")
                                    .font(.largeTitle)
                                Text("Currently: {MATH}")
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
                    VStack() {
                        Text("Ends in {0} hours {20} minutes {4} seconds")
                            
                    }                    }
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


struct TimeLeft_Previews: PreviewProvider {
    static var previews: some View {
        MainScreen()
    }
}

private func getData() {
    let url = URL(string: "http://localhost:3000/getMainScreen")
    guard url != nil else {
        print("Error. URL was not found.")
        throw new Error
        //exit(1)
    }
    
    var request = URLRequest(url: url!)
    l
    
}
//    let task = URLSession.shared.dataTask(with: URL(string: url)!, completionHandler: {data, response, error in
//        guard let data = data, error == nil else {
//            print("Something went wrong")
//            return
//        }
//        var result: Response?
//        do {
//            result = try JSONDecoder().decode(Response.self, from: data)
//        }
//        catch {
//            print("Failed to convert \(error.localizedDescription)")
//        }
//
//        guard let json = result else {
//            return
//        }
//
//        print(json.results.name)
//        print(json.results.age)
//    })
//    task.resume()
//}
//
//struct Response : Codable {
//    let results: myResult
//}
//
//struct myResult: Codable {
//    let age: Int
//    let count: Int
//    let name: String
//}

/*
{
    "age":33,
    "count":21,
    "name":"meelad"
}
*/
