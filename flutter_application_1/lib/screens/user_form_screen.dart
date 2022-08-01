import 'package:flutter/material.dart';
import 'package:flutter_application_1/providers/providers.dart';
import 'package:flutter_application_1/themes/theme.dart';
import 'package:flutter_application_1/widgets/widgets.dart';
import 'package:provider/provider.dart';

class UserFormScreen extends StatelessWidget {
  const UserFormScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final usersProvider = Provider.of<UsersProvider>(context);

    return ChangeNotifierProvider(
      create: (_) => UserFormProvider(usersProvider.selectedUser),
      child: UserFormScreenBody(
        usersProvider: usersProvider,
      ),
    );
  }
}

class UserFormScreenBody extends StatelessWidget {
  final UsersProvider usersProvider;
  const UserFormScreenBody({Key? key, required this.usersProvider})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    final userFormProvider = Provider.of<UserFormProvider>(context);
    final user = userFormProvider.user;
    final Map<String, String> myFormValues = {
      'username': user.username,
      'name': user.name,
      'lastname': user.lastname,
      'email': user.email ?? '',
      'password': '',
      'role': ''
    };
    return Scaffold(
        appBar: AppBar(
          title: const Text('User Form'),
        ),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
            key: userFormProvider.formKey,
            child: Form(
              child: Column(children: [
                CustomInputField(
                    initialValue: user.username,
                    formProperty: 'username',
                    formValues: myFormValues,
                    labelText: 'Nombre de Usuario',
                    hintText: 'Escriba su nombre de usuario',
                    helperText: 'Letras y Números',
                    autofocus: true,
                    suffixIcon: Icons.card_membership),
                CustomInputField(
                    initialValue: user.name,
                    formProperty: 'name',
                    formValues: myFormValues,
                    labelText: 'Nombre',
                    hintText: 'Escriba su nombre',
                    helperText: 'Solo letras',
                    suffixIcon: Icons.people),
                CustomInputField(
                  initialValue: user.lastname,
                  formProperty: 'lastname',
                  formValues: myFormValues,
                  labelText: 'Apellido',
                  hintText: 'Escriba su apellido',
                  helperText: 'Solo letras',
                  suffixIcon: Icons.people,
                ),
                CustomInputField(
                  initialValue: user.email,
                  formProperty: 'email',
                  formValues: myFormValues,
                  labelText: 'Correo',
                  hintText: 'Escriba su correo',
                  helperText: 'Ingrese un correo válido',
                  suffixIcon: Icons.email,
                  keyboardType: TextInputType.emailAddress,
                ),
                CustomInputField(
                  formProperty: 'password',
                  formValues: myFormValues,
                  labelText: 'Contraseña',
                  hintText: 'Escriba su contraseña',
                  helperText: 'Ingrese mínimo 8 caracteres',
                  suffixIcon: Icons.password,
                  obscureText: true,
                ),
                DropdownButtonFormField<String>(
                    items: const [
                      DropdownMenuItem(value: 'Admin', child: Text('Admin')),
                      DropdownMenuItem(value: 'Guest', child: Text('Guest')),
                      DropdownMenuItem(
                          value: 'Supervisor', child: Text('Supervisor')),
                    ],
                    onChanged: (value) {
                      myFormValues['role'] = value ?? '';
                    }),
                ElevatedButton.icon(
                  onPressed: () {
                    user.username = myFormValues['username'] ?? '';
                    user.name = myFormValues['name'] ?? '';
                    user.lastname = myFormValues['lastname'] ?? '';
                    user.email = myFormValues['email'];
                  },
                  icon: const Icon(Icons.save),
                  label: const Text('Guardar'),
                )
              ]),
            ),
          ),
        ));
  }
}
