//
//  ContentView.swift
//  ParimVHK
//
//  Created by Eva Kazakovskaia on 11.01.2023.
//

import SwiftUI
class MainScreenVM: ObservableObject {
    @Published var datas = [MainScreenStruct]()
    
//    init() {
//        loadData()
//    }
    func loadData() {
        guard let url = URL(string: "http://localhost:3000/getMainScreen")
        else {
            print("Invalid URL")
            return
        }
        let json: [String: Any] = ["grade": "12R",
                                   "group": ["matemaatika": "G1",
                                             "eesti keel": "G2"]]
        let jsonData = try? JSONSerialization.data(withJSONObject: json)
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.httpBody = jsonData
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let data = data {
                if let response = try? JSONDecoder().decode([MainScreenStruct].self, from: data) {
                    DispatchQueue.main.async {
                    //DispatchQueue.global().async {
                        self.datas = response
                    }
                    return
                }
            }
        }.resume()
    }
}
    
//    class PrimeBookVM: ObservableObject {
//        @Published var datas = [Datum]()
//
//        init() {
//            getData()
//        }
//
//        func getData() {
//            guard let url = URL(string: "https://alibrary.in/api/book-search?is_prime") else { return }
//            URLSession.shared.dataTask(with: url) { (data, _, _) in
//                if let data = data {
//                    do {
//                        let results = try JSONDecoder().decode(ApiResponse.self, from: data)
//                        DispatchQueue.main.async {
//                            self.datas = results.bookDetails.data
//                        }
//                    }
//                    catch {
//                        print(error)
//                    }
//                }
//            }.resume()
//        }
//    }
//
//    struct PrimeBooksView: View{
//        @StateObject var list = PrimeBookVM()
//


struct MainScreen: View {
    @StateObject var list = MainScreenVM()
    //@State private var isWeekday = false
    //@State var results = [MainScreenStruct]()
//    func loadData() {
//        @Published var datas = [MainScreenStruct]()
//            guard let url = URL(string: "http://localhost:3000/getMainScreen")
//            else {
//                print("Invalid URL")
//                return
//            }
//            let json: [String: Any] = ["grade": "12R",
//                                       "group": ["matemaatika": "G1",
//                                                 "eesti keel": "G2"]]
//            let jsonData = try? JSONSerialization.data(withJSONObject: json)
//            var request = URLRequest(url: url)
//            request.httpMethod = "POST"
//            request.httpBody = jsonData
//            URLSession.shared.dataTask(with: request) { data, response, error in
//                if let data = data {
//                    if let response = try? JSONDecoder().decode([MainScreenStruct].self, from: data) {
//                        DispatchQueue.main.async {
//                        //DispatchQueue.global().async {
//                            self.datas = response
//                        }
//                        return
//                    }
//                }
//            }.resume()
//        }
    //var resultName: String = ""

    var body: some View {
        //var totalAmountOfLessons : Int = 3
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
                                ForEach(list.datas) { item in
                                    
                                    HStack{
                                        
                                        //ForEach(results.datas, id: \.self){ result in
                                        Image(systemName: "brain.head.profile")
                                            .font(.largeTitle)
                                        Text(item.current_button.title)
                                        //Text(results)
                                        //Text("\(results)")
                                        /* List(results) { result in
                                         HStack {
                                         Text("\(result.type)")
                                         .font(.subheadline)}
                                         }.onAppear(perform: loadData)*/
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
//                                .frame(minWidth: 0, maxWidth: .infinity)
//                                .padding()
//                                .foregroundColor(.white)
//                                .background(LinearGradient(colors: [.indigo, .accentColor],
//                                                           startPoint: .bottomTrailing, endPoint: .leading))
//                                .cornerRadius(10)
//                                .shadow(color: .gray, radius: 5.0)
//                                .padding()
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
    }.onAppear {
        list.loadData()
     }

}


struct TimeLeft_Previews: PreviewProvider {
    static var previews: some View {
        MainScreen()
    }
}
