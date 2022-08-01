import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_application_1/models/models.dart';

class UsersProvider extends ChangeNotifier {
  final String _baseUrl = 'localhost:3000';
  final List<User> users = [];
  User user = User(lastname: '', name: '', username: '');
  late User selectedUser;
  UsersProvider() {
    getUsers();
  }

  Future<List<User>> getUsers() async {
    var url = Uri.http(_baseUrl, 'users');
    var response = await http.get(url);
    List<dynamic> usersList = json.decode(response.body);
    usersList.forEach((user) {
      final userTemp = User.fromMap(user);
      users.add(userTemp);
    });
    return users;
  }

  Future<User> getUser() async {
    var url = Uri.http(_baseUrl, 'users/1');
    var response = await http.get(url);

    Map<String, dynamic> userMap = json.decode(response.body);

    user.lastname = userMap['lastname'];
    user.name = userMap['name'];
    user.username = userMap['username'];

    // userMap.forEach((key, value) {
    //   final userTemp = User.fromMap(value);
    //   User user = User(userTemp);
    // });

    // print(user.toMap());

    return user;
  }

  createUser(User user) {}

  updateUser(User user) async {
    final url = Uri.http(_baseUrl, 'users/${user.id}');
    final response = await http.put(url, body: user.toJson());
  }

  deleteUser() {}

  Future saveOnUpdate(User user) async {
    if (user.id == null) {
      createUser(user);
    } else {
      updateUser(user);
    }
  }
}
