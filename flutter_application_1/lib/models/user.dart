// To parse this JSON data, do
//
//     final user = userFromMap(jsonString);

import 'dart:convert';

class User {
  User({
    this.id,
    this.email,
    required this.lastname,
    required this.name,
    required this.username,
  });

  int? id;
  String? email;
  String lastname;
  String name;
  String username;

  factory User.fromJson(String str) => User.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory User.fromMap(Map<String, dynamic> json) => User(
        id: json["id"],
        email: json["email"],
        lastname: json["lastname"],
        name: json["name"],
        username: json["username"],
      );

  Map<String, dynamic> toMap() => {
        "id": id,
        "email": email,
        "lastname": lastname,
        "name": name,
        "username": username,
      };
}
