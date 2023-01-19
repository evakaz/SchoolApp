//
//  SelectGrade.swift
//  ParimVHK
//
//  Created by Eva Kazakovskaia on 19.01.2023.
//

import SwiftUI

struct SelectGrade: View {
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
                HStack {
                    Picker(selection: .constant(1),
                           label: Text("PickGrade"),
                           content: {
                        Text("1").tag(1)
                        Text("2").tag(2)})
                    .padding()
                    .pickerStyle(MenuPickerStyle())
                }
                Spacer()
            }
            
        }
    }
}

struct SelectGrade_Previews: PreviewProvider {
    static var previews: some View {
        SelectGrade()
    }
}
