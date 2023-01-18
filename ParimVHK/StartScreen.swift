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
            LinearGradient(colors: [.pink, .purple], startPoint: .bottomTrailing, endPoint: .topLeading)
                .edgesIgnoringSafeArea(.all)
            VStack() {
                HStack {
                    Text("Welcome to VHK app!")
                        .bold()
                        .padding(45)
                        .font(.title)
                }
                    Spacer()
                Button(action: {}) {
                    //.buttonStyle(BorderedButtonStyle)
                    Text("Start")
                        //.frame(minWidth: 10, maxWidth: 90)
                    
                        .padding(15)
                        .foregroundColor(.black)
                        //.clipShape(Capsule())
//                        .background(.white)
                    
                }
                .buttonStyle(.bordered)
                .background(.white)
                .padding(13)
                
            }
        }
    }
}



struct StartScreen_Previews: PreviewProvider {
    static var previews: some View {
        StartScreen()
    }
}
