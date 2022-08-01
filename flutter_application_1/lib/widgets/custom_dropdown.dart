import 'package:flutter/material.dart';
import 'package:flutter_application_1/providers/providers.dart';
import 'package:flutter_application_1/themes/theme.dart';
import 'package:flutter_application_1/widgets/widgets.dart';
import 'package:provider/provider.dart';

class UserFormScreen extends StatelessWidget {
  const UserFormScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final GlobalKey<FormState> myFormKey = GlobalKey<FormState>();

    final Map<String, String> myFormValues = {
      'username': '',
      'name': '',
      'lastname': '',
      'email': '',
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
            child: Form(
              key: myFormKey,
              child: Column(children: [
                CustomInputField(
                    formProperty: 'username',
                    formValues: myFormValues,
                    labelText: 'Nombre de Usuario',
                    hintText: 'Escriba su nombre de usuario',
                    helperText: 'Letras y Números',
                    autofocus: true,
                    suffixIcon: Icons.card_membership),
                CustomInputField(
                    formProperty: 'name',
                    formValues: myFormValues,
                    labelText: 'Nombre',
                    hintText: 'Escriba su nombre',
                    helperText: 'Solo letras',
                    suffixIcon: Icons.people),
                CustomInputField(
                  formProperty: 'lastname',
                  formValues: myFormValues,
                  labelText: 'Apellido',
                  hintText: 'Escriba su apellido',
                  helperText: 'Solo letras',
                  suffixIcon: Icons.people,
                ),
                CustomInputField(
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
                    print(myFormValues);
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

