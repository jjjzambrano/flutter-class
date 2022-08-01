import 'package:flutter/material.dart';
import 'package:flutter_application_1/themes/theme.dart';

class CustomCard extends StatelessWidget {
  final String? name;
  final String imageUrl;

  const CustomCard({Key? key, required this.imageUrl, this.name})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      elevation: 30,
      shadowColor: AppTheme.primary.withOpacity(0.5),
      child: Column(children: [
        Container(
          alignment: AlignmentDirectional.center,
          padding: const EdgeInsets.only(right: 20, top: 10, bottom: 10),
          child: Text(name ?? 'Sin Título'),
        ),
        FadeInImage(
          placeholder: const AssetImage('assets/images/notfound.jpg'),
          image: NetworkImage(imageUrl),
          width: double.infinity,
          height: 240,
          fit: BoxFit.cover,
          fadeInDuration: const Duration(milliseconds: 1000),
        ),
        Container(
            alignment: AlignmentDirectional.centerEnd,
            padding: const EdgeInsets.only(right: 20, top: 10, bottom: 10),
            child: TextButton(
              onPressed: () => showDialog<String>(
                context: context,
                builder: (BuildContext context) => AlertDialog(
                  titleTextStyle:
                      TextStyle(color: Color.fromARGB(255, 255, 255, 255)),
                  title: const Text('Hola'),
                  contentTextStyle:
                      TextStyle(color: Color.fromARGB(255, 255, 255, 255)),
                  content: const Text('Hola, este es una !Alerta¡'),
                  backgroundColor: Color.fromARGB(248, 20, 72, 131),
                  actions: <Widget>[
                    const Image(
                      image: AssetImage('assets/images/Gato.jpg'),
                    ),
                    TextButton(
                      onPressed: () => Navigator.pop(context, 'Mensaje'),
                      child: const Text('Cerrar'),
                    ),
                  ],
                ),
              ),
              child: const Text('Mensaje'),
            )),
      ]),
    );
  }
}
