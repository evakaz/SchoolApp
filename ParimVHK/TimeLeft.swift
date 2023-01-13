//
//  ContentView.swift
//  ParimVHK
//
//  Created by Eva Kazakovskaia on 11.01.2023.
//

import SwiftUI

struct TimeLeft: View {
    @State private var isWeekday = false
    var body: some View {
        ZStack{
            LinearGradient(colors: [.pink, .orange], //if all lessons are finished or a weekend than fun color
                           startPoint: .topLeading, endPoint: .bottomTrailing)
            .edgesIgnoringSafeArea(.all)
            
            VStack {
                /*HStack {
                    Button(action: {}) {
                        Image(systemName: "flag.2.crossed.fill")
                    }
                 */
                ProgressView(value: 5, total: 15) //value and total depends on the amount of lessons and lessons done
                    .padding()
                HStack {
                    VStack(alignment: .leading) {
                        Text("Lessons done")
                            .font(.system(size: 20))
                        Label("300", systemImage: "hourglass.bottomhalf.fill") //instead of actual amount "300"
                    }
                    .padding()
                    Spacer()
                    VStack(alignment: .trailing) {
                        Text("Lessons left")
                            .font(.system(size: 20))
                        Label("600", systemImage: "hourglass.tophalf.fill")
                    }
                    .padding()
                }
                Spacer()
                HStack {
                    VStack(alignment: .center) {
                        /*Button(action: {}) {
                            Image(systemName: "fork.knife.circle.fill")
                                .foregroundColor(.white)
                        }
                        Text("Lunch is in ...")*/
                        Button(action: {
                            print("VENE SUUR SÖÖGISAAL")
                        }) {
                            HStack{
                                Image(systemName: "fork.knife.circle.fill")
                                    .font(.largeTitle)
                                    //.foregroundColor(.white)
                                Text("Lunch is in 1 hour 15 minutes 30 seconds")
                                    .font(.subheadline  )
                                    //.foregroundColor(.white)
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
                        //RoundedRectangle(cornerRadius: 5.0)
                            //.strokeBorder(Color.white, style: StrokeStyle(lineWidth: 4.0, lineCap: .round, dash: [10,20]))
                            //.fill(Color.white)
                            //.frame(width: 350, height: 100)
                            //.stroke(Color.green, style: StrokeStyle(lineWidth: 4.0, lineCapq: .round, dash: [10, 20]))
                    }
                }
                HStack {
                    VStack {
                        RoundedRectangle(cornerRadius: 5.0)
                            .fill(Color.white)
                            .frame(width: 350, height: 100)
                    }
                }
                HStack {
                    VStack {
                        RoundedRectangle(cornerRadius: 5.0)
                            .strokeBorder(Color.white, style: StrokeStyle(lineWidth: 4.0, lineCap: .round, dash: [10,20]))
                            //.fill(Color.white)
                            .frame(width: 350, height: 100)
                    }
                }
                Spacer()
    
            }
        }
    }
}
            /*Circle()
                .strokeBorder(lineWidth: 24)
            HStack {
                Text("Speaker 1 of 3")
                Button(action: {}) {
                    Image(systemName: "forward.fill")
                }
            }*/
        
        //.padding()

struct TimeLeft_Previews: PreviewProvider {
    static var previews: some View {
        TimeLeft()
    }
}
