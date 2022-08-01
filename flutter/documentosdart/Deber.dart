import 'package:flutter/material.dart';

class Homework extends StatelessWidget {
  const Homework({Key? key}) : super(key: key);

  static const String title = 'Desarrollo de Aplicaciones Moviles';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Desarrollo de Aplicaciones Moviles',
      theme: ThemeData(primarySwatch: Colors.blueGrey),
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Desarrollo de Aplicaciones Moviles'),
          actions: <Widget>[
            IconButton(
              icon: const Icon(Icons.add_alert),
              tooltip: 'Notificacion',
              onPressed: () {
                ScaffoldMessenger.of(context)
                    .showSnackBar(const SnackBar(content: Text('Barra')));
              },
            ),
          ],
        ),
        body: const Center(child: MyStatelessWidget()),
        bottomNavigationBar: BottomNavigationBar(
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.business),
              label: 'Business',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.school),
              label: 'School',
            ),
          ],
        ),
      ),
    );
  }
}

class MyStatelessWidget extends StatelessWidget {
  const MyStatelessWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () => showDialog<String>(
        context: context,
        builder: (BuildContext context) => AlertDialog(
          title: const Text('Hola Mundo'),
          actions: <Widget>[
            TextButton(
              onPressed: () => Navigator.pop(context, 'Mensaje'),
              child: const Text('Listo'),
            ),
          ],
        ),
      ),
      child: const Text('Mensaje'),
    );
  }
}
