import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/models.dart';

class UserFormProvider extends ChangeNotifier {
  GlobalKey<FormState> formKey = new GlobalKey<FormState>();
  User user;

  UserFormProvider(this.user);

  test() {
    print(user.email);
  }
}
