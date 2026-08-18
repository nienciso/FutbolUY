Futbol UY

Futbol UY es un proyecto frontend orientado al fútbol uruguayo, desarrollado como la interfaz de una futura aplicación web destinada a la publicación y visualización de jugadores, clubes, partidos y oportunidades de pruebas.

La idea de la plataforma es ofrecer un espacio donde los jugadores puedan ser presentados a través de perfiles con sus principales características e información deportiva. Cada perfil permite visualizar datos personales y futbolísticos, posición, estadísticas, valor estimado, descripción, historial de clubes y categorías, además de contenido multimedia como fotografías y videos.

A su vez, la plataforma incorpora información de los clubes. Cada club dispone de su propia sección, donde se presenta una descripción, sus jugadores principales y de reserva, próximos partidos y futuras oportunidades de captación. De esta manera, el proyecto busca representar tanto el perfil individual del jugador como su relación con los diferentes clubes.

Desarrollo del frontend

El proyecto fue desarrollado desde cero, sin utilizar plantillas prediseñadas. Para construir la estructura de las diferentes páginas se utilizó HTML, mientras que CSS permitió desarrollar una identidad visual propia y personalizar la apariencia general de la plataforma. Bootstrap fue incorporado principalmente para trabajar con un sistema de grillas responsive y facilitar la adaptación de la interfaz a diferentes tamaños de pantalla, complementándose con Bootstrap Icons para distintos elementos visuales.

JavaScript se utilizó para desarrollar la lógica y las funcionalidades dinámicas de la aplicación. Gran parte del contenido que aparece en pantalla se genera dinámicamente a partir de los datos disponibles, permitiendo reutilizar las mismas estructuras para mostrar diferentes jugadores y clubes sin necesidad de crear manualmente una página independiente para cada uno.

La información de jugadores, clubes, partidos y pruebas fue centralizada en datos.js, funcionando en esta etapa como una fuente de datos local. A partir de esa información, JavaScript se encarga de generar las tarjetas, perfiles, clubes, partidos y oportunidades que se muestran en las diferentes secciones de la plataforma.

Funcionalidades desarrolladas

La página principal permite explorar los jugadores disponibles mediante un buscador y diferentes filtros. Es posible buscar por nombre, seleccionar una posición o departamento y ordenar los resultados según diferentes criterios, como edad, goles o valor estimado.

También se implementó un sistema de paginación mediante JavaScript. Los jugadores, clubes y próximas pruebas se muestran de seis en seis, permitiendo avanzar y retroceder entre páginas. Esto evita sobrecargar visualmente la página cuando existe una cantidad importante de información.

Los perfiles de jugadores son generados dinámicamente. Al seleccionar Ver perfil, la aplicación identifica al jugador correspondiente y utiliza sus datos para construir su página, mostrando información deportiva, historial, fotografías, videos y demás características. El mismo concepto se utiliza con los clubes mediante la opción Ver club, permitiendo reutilizar una misma estructura para presentar diferentes equipos.

JavaScript también se utiliza para relacionar jugadores con sus respectivos clubes, generar la agenda semanal de partidos y administrar las próximas pruebas.

Para determinadas funcionalidades se utilizó LocalStorage, permitiendo conservar información directamente en el navegador.

En esta versión, la funcionalidad de notificaciones representa el comportamiento visual del frontend. Una implementación de avisos a usuarios requeriría posteriormente servicios del lado del servidor.

Estado actual del proyecto

Futbol UY representa actualmente la parte frontend de una futura aplicación web. Se desarrolló la interfaz, el diseño responsive, la navegación entre las diferentes vistas y la lógica necesaria para buscar, filtrar, ordenar, paginar y generar dinámicamente el contenido.

En esta etapa los datos se encuentran almacenados localmente y son utilizados principalmente para demostrar el funcionamiento de la aplicación. Por este motivo, el proyecto todavía no cuenta con persistencia de información mediante una base de datos ni con administración de usuarios.

Próxima etapa: Backend

Para convertir Futbol UY en una aplicación completa sería necesario incorporar un backend que se encargue de administrar la información y conectarla con una base de datos.

Esta segunda etapa permitiría reemplazar los datos locales por registros persistentes y desarrollar operaciones CRUD para crear, consultar, modificar y eliminar jugadores, clubes, partidos y pruebas directamente desde la aplicación.

También permitiría incorporar registro e inicio de sesión, autenticación, diferentes roles y permisos. Por ejemplo, un jugador podría administrar su propio perfil, un club podría gestionar su plantel y publicar nuevas pruebas, mientras que un administrador podría supervisar el contenido general de la plataforma.
