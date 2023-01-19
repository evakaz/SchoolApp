//
//  StartScreen.swift
//  ParimVHK
//
//  Created by Eva Kazakovskaia on 18.01.2023.
//

import SwiftUI

struct StartScreen: View {
    var body: some View {
        ZStack {
            LinearGradient(colors: [.gray, .white], startPoint: .bottomTrailing, endPoint: .topLeading)
                .edgesIgnoringSafeArea(.all)
            VStack() {
                HStack {
                    Text("Welcome to VHK app!")
                        .bold()
                        .padding(45)
                        .font(.title)
                }
                Spacer()
                Button(action: {
                    print("Hello World!")
                }) {
                    Text("Start")
                        .frame(width: 250, height: 150)
                        .fontWeight(.bold)
                        .font(.largeTitle)
                        .padding()
                        //.background(Color.purple)
                        .background(LinearGradient(gradient: Gradient(colors: [Color.green, Color.mint]), startPoint: .leading, endPoint: .trailing))
                        .cornerRadius(40)
                        .foregroundColor(.white)
                        .padding(10)
                }
                Spacer()
                
            }
        }
    }
}



struct StartScreen_Previews: PreviewProvider {
    static var previews: some View {
        StartScreen()
    }
}
