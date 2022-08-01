import 'package:flutter/material.dart';
import 'package:flutter_application_1/providers/users_provider.dart';
import 'package:flutter_application_1/themes/theme.dart';
import 'package:provider/provider.dart';

class UserListScreen extends StatelessWidget {
  const UserListScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final usersProvider = Provider.of<UsersProvider>(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('User List'),
      ),
      body: ListView.separated(
          itemBuilder: (context, index) => ListTile(
                leading: const Icon(Icons.people, color: AppTheme.primary),
                title: Text(usersProvider.users[index].email!),
                onTap: () {
                  usersProvider.selectedUser = usersProvider.users[index];
                  Navigator.pushNamed(context, 'user-form');
                },
              ),
          separatorBuilder: (_, __) => const Divider(),
          itemCount: usersProvider.users.length),
    );
  }
}
