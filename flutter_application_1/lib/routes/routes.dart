import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/menu_option.dart';
import 'package:flutter_application_1/screens/screens.dart';

class AppRoutes {
  static const initialRoute = 'home';

  static final menuOptions = <MenuOption>[
    MenuOption(
        route: 'home',
        icon: Icons.home,
        name: 'Home Screen',
        screen: const HomeScreen()),
    MenuOption(
        route: 'user-list',
        icon: Icons.list,
        name: 'User List',
        screen: const UserListScreen()),
    MenuOption(
        route: 'user-form',
        icon: Icons.people,
        name: 'User Form',
        screen: const UserFormScreen()),
    MenuOption(
        route: 'card',
        icon: Icons.card_giftcard,
        name: 'Card',
        screen: const CardScreen()),
  ];

  static Map<String, Widget Function(BuildContext)> getAppRoutes() {
    Map<String, Widget Function(BuildContext)> routes = {};

    for (final menuOption in menuOptions) {
      routes.addAll(
          {menuOption.route: (BuildContext context) => menuOption.screen});
    }
    return routes;
  }
}
