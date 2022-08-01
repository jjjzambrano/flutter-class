import 'package:flutter/material.dart';

class Count extends StatefulWidget {
  const Count({Key? key}) : super(key: key);
  @override
  State<Count> createState() => _CountState();
}

class _CountState extends State<Count> {
  int contador = 0;

  @override
  Widget build(BuildContext context) {
    const fontSize30 = TextStyle(fontSize: 30);

    return Scaffold(
        appBar: AppBar(
          title: const Text('Contador'),
          backgroundColor: Color.fromARGB(255, 9, 87, 151),
          elevation: 5.5,
        ),
        body: Center(
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                const Text(
                  'Contador',
                  style: fontSize30,
                ),
                Text(
                  '$contador',
                  style: fontSize30,
                ),
              ]),
        ),
        floatingActionButton:
            Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          FloatingActionButton(
            backgroundColor: Color.fromARGB(255, 11, 138, 241),
            child: const Icon(Icons.add),
            onPressed: () {
              contador++;
              setState(() {});
            },
          ),
          const SizedBox(
            width: 10,
          ),
          FloatingActionButton(
            backgroundColor: Color.fromARGB(255, 173, 34, 24),
            child: const Icon(Icons.do_disturb_on_outlined),
            onPressed: () {
              if (contador >= 1) {
                contador--;
                setState(() {});
              }
            },
          ),
          const SizedBox(
            width: 10,
          ),
          FloatingActionButton(
            backgroundColor: Color.fromARGB(255, 34, 139, 37),
            child: const Icon(Icons.autorenew),
            onPressed: () {
              contador = 0;
              setState(() {});
            },
          ),
        ]));
  }
}
