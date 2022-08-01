import 'package:flutter/material.dart';

class Page3Screen extends StatelessWidget {
  const Page3Screen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Mi AppBar Page 3'),
          elevation: 0,
        ),
        body: const Center(child: Text('Page 3')),
        floatingActionButton: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            FloatingActionButton(
              child: const Text('Page 1'),
              onPressed: () {
                Navigator.pushNamed(context, '/page1');
              },
            ),
            const SizedBox(
              width: 10,
            ),
            FloatingActionButton(
              child: const Text('Page 2'),
              onPressed: () {
                Navigator.pushNamed(context, '/page2');
              },
            ),
          ],
        ));
  }
}
