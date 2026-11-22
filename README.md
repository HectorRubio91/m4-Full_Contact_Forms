MISION M4 - Full Contact Forms - Web Development I
=============================================

_«Valida o muere.»_

## Como probarlo

Para que pueda funcionar la pagina web hay que iniciar tanto la pagina web con npm run dev como el server de la API npm run server, si no la pagina dira que no se puede conectar con la API. Tambien se puede usar el comando npm run test:corruptos para probar como coge los productos corruptos de la lista. La pagina en si es una simple lista de la compra en la que puedes añadir los productos que quieras poniendo su nombre, la cantidad y de que categoria(alimento, limpieza, higiene, animales, otro) es y esto se guardara en la lista de productos de la API, y se guarda entre usos de la web. 

## Uso de IA

He utilizado ChatGPT y Claude como apoyo, los he usado principalmente para resolver dudas, revisar código y para ver como lo harían ellos. Este es el prompt que les pase:

Quiero desarrollar una aplicación web llamada Mi Lista de la Compra utilizando Vite y React con una API propia. La aplicacion  debe permitir añadir productos a una lista indicando el nombre, la cantidad y la categoria del producto. Las categorías disponibles van a ser: Alimentación, Limpieza, Higiene, Animales y Otros. El formulario debe utilizar React Hook Form para gestionar los campos con Zod para validar los datos. Los nombres de los productos solo pueden ser letras, sin tildes, y espacios, incluye la ñ, esto significa que sin números ni símbolos. La cantidad es un numero entero y la categoría es una opción de una lista.

Debes utilizar TanStack Query v5 para consultar los productos de la API y gestionar la creación de nuevos productos mediante mutaciones. Cuando se añada un producto, la lista debe actualizarse automáticamente. La API debe estar desarrollada con Express y tener GET y POST. Los productos se almacenaran en un archivo JSON para mantener la información entre ejecuciones, sin utilizar una base de datos.

También se deben controlar los estados de carga, error, éxito y lista vacía. Finalmente, quiero utilizar Zod con safeParse() como puntos extra para comprobar que las respuestas recibidas de la API tienen el formato esperado y poder detectar posibles datos corruptos. 

El proyecto debe seguir el lema Valida o muere y ser sencillo, fácil de entender y sin complejidad innecesaria. 

Esta es la rubrica: 

React Hook Form	Formulario no controlado con RHF, errores accesibles y UX cuidada	20 pts
Validación con Zod	Esquema expresivo (refinamientos, mensajes propios) conectado con zodResolver	15 pts
TanStack Query	useQuery/useMutation con claves bien diseñadas e invalidación correcta	15 pts
Experiencia de usuario	Estados de carga/error/éxito comunicados con claridad	10 pts
Originalidad	Dominio del formulario elegido y detalles extra	10 pts
Checks automáticos	README, declaración de IA, repo limpio, commits, tecnología, estructura	30 pts


## Autopsia

- Durante el desarrollo me surgió la duda de si crear una API propia o utilizar una existente, como puede ser DummyJSON que me permitiría ahorrar el tiempo de no hacer el servidor y la API y simplemente usar una externa, pero termine prefiriendo hacer una API muy basica solo con GET y POST con la ayuda de ChatGPT ya que me permitía tener los productos directamente como yo quiero y conozco a la perfección la API por si en algún momento falla algo o quiero hacer una mejora o cualquier cosa.

- Otra decision importante fue donde iba a realizar las validaciones. ChatGPT me recomendó centralizar las comprobaciones y hacerlas en ProductoForm, utilizando React Hook Form y Zod. Esto es mas sencillo y evita repetir codigo frente a la otra propuesta, ademas de que muestra los errores inmediatamente al usuario. El problema llegaba porque cualquier persona podria enviar una peticion directamente a la API sin pasar por el formulario, evitando asi las validaciones. Por otra parte, Claude recomendó mantener las validaciones de ProductoForm pero ademas añadir comprobaciones tambien en el server, utilizando Zod antes de guardar los productos para solucionar el problema anterior. Esto suponia que se repetia la misma logica pero en otra parte del codigo. Finalmente escogi la opcion de Claude ya que era mas seguro, aunque termine añadiendo una tercena forma de validacion, validando las respuestas que devuelve la API como sugerian los puntos extra. Como resumen se comprueban los datos introducidos en el formulario, los recibidos por el servidor y los que devuelve la API.
