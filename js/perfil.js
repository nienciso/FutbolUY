const {
    jugadores,
    clubes
} = window.PlayerUYData;

const parametros =
    new URLSearchParams(
        window.location.search
    );

const idJugador =
    Number(
        parametros.get("id")
    );

const jugador =
    jugadores.find(
        jugador =>
            jugador.id === idJugador
    );

if (!jugador) {

    document.querySelector("main").innerHTML = `

        <section class="perfil-principal">

            <div class="container text-center py-5">

                <h1>
                    Jugador no encontrado
                </h1>

                <p class="text-secondary">

                    El perfil solicitado
                    no existe.

                </p>

                <a
                    href="index.html#jugadores"
                    class="btn btn-dark mt-3">

                    Volver a jugadores

                </a>

            </div>

        </section>

    `;

}

else {

    cargarPerfil(jugador);

}

function cargarPerfil(jugador) {

    const clubActual =
        clubes.find(
            club =>
                club.id === jugador.clubId
        );

    document.title =
        `${jugador.nombre} | Player UY`;

    document.getElementById(
        "perfilNombre"
    ).textContent =
        jugador.nombre;

    document.getElementById(
        "perfilPosicion"
    ).textContent =
        jugador.posicion;

    document.getElementById(
        "perfilResumen"
    ).textContent =
        `🇺🇾 ${jugador.departamento} · ${jugador.edad} años`;

    document.getElementById(
        "perfilImagen"
    ).src =
        jugador.imagen;

    document.getElementById(
        "perfilImagen"
    ).alt =
        jugador.nombre;

    document.getElementById(
        "perfilPartidos"
    ).textContent =
        jugador.partidos;

    document.getElementById(
        "perfilGoles"
    ).textContent =
        jugador.goles;

    document.getElementById(
        "perfilAsistencias"
    ).textContent =
        jugador.asistencias;

    document.getElementById(
        "perfilMinutos"
    ).textContent =
        jugador.minutos.toLocaleString(
            "es-UY"
        );

    document.getElementById(
        "perfilEdad"
    ).textContent =
        `${jugador.edad} años`;

    document.getElementById(
        "perfilDepartamento"
    ).textContent =
        jugador.departamento;

    document.getElementById(
        "perfilAltura"
    ).textContent =
        jugador.altura;

    document.getElementById(
        "perfilPeso"
    ).textContent =
        jugador.peso;

    document.getElementById(
        "perfilPie"
    ).textContent =
        jugador.pie;

    document.getElementById(
        "perfilClub"
    ).textContent =
        clubActual
            ? clubActual.nombre
            : "Sin club";

    document.getElementById(
        "perfilValor"
    ).textContent =
        `USD ${new Intl.NumberFormat(
            "es-UY"
        ).format(jugador.valor)}`;

    cargarTrayectoria(
        jugador.historial || []
    );

    cargarGaleria(
        jugador.galeria || []
    );

    cargarVideos(
        jugador.videos || []
    );

}

function cargarTrayectoria(
    historial
) {

    const contenedor =
        document.getElementById(
            "trayectoriaJugador"
        );

    if (!contenedor) {

        return;

    }

    contenedor.innerHTML = "";

    if (
        historial.length === 0
    ) {

        contenedor.innerHTML = `

            <div class="text-center py-4">

                <p class="text-secondary">

                    Este jugador todavía
                    no tiene historial cargado.

                </p>

            </div>

        `;

        return;

    }

    historial.forEach(
        (etapa, indice) => {

            const partidosHTML =
                etapa.partidos
                    ? `

                        <span>

                            <i class="bi bi-bar-chart"></i>

                            ${etapa.partidos}
                            partidos

                        </span>

                    `
                    : "";

            const conector =
                indice !==
                historial.length - 1

                    ? `

                        <div
                            class="trayectoria-conector">
                        </div>

                    `

                    : "";

            contenedor.innerHTML += `

                <article
                    class="trayectoria-item">


                    <div
                        class="trayectoria-linea">

                        <div
                            class="trayectoria-punto">
                        </div>

                        ${conector}

                    </div>


                    <div
                        class="trayectoria-periodo">

                        ${etapa.desde}
                        —
                        ${etapa.hasta}

                    </div>


                    <div
                        class="trayectoria-contenido">

                        <h3>

                            ${etapa.club}

                        </h3>


                        <div
                            class="trayectoria-datos">

                            <span>

                                <i class="bi bi-shield"></i>

                                ${etapa.categoria}

                            </span>


                            <span>

                                <i class="bi bi-person"></i>

                                ${etapa.posicion}

                            </span>


                            ${partidosHTML}

                        </div>

                    </div>

                </article>

            `;

        }
    );

}

function cargarGaleria(
    imagenes
) {

    const galeria =
        document.getElementById(
            "galeriaJugador"
        );

    if (!galeria) {

        return;

    }

    galeria.innerHTML = "";

    if (
        imagenes.length === 0
    ) {

        galeria.innerHTML = `

            <div class="col-12">

                <div class="text-center py-5">

                    <i
                        class="bi bi-images"
                        style="font-size: 2.5rem;">
                    </i>

                    <h3 class="mt-3">

                        Galería próximamente

                    </h3>

                    <p class="text-secondary">

                        Todavía no hay
                        fotografías cargadas.

                    </p>

                </div>

            </div>

        `;

        return;

    }

    imagenes.forEach(
        (imagen, indice) => {

            galeria.innerHTML += `

                <div class="col-md-4">

                    <div class="galeria-item">

                        <img
                            src="${imagen}"
                            alt="Imagen ${indice + 1} de ${jugador.nombre}">

                    </div>

                </div>

            `;

        }
    );

}

function cargarVideos(
    videos
) {

    const contenedor =
        document.getElementById(
            "videosJugador"
        );

    if (!contenedor) {

        return;

    }

    if (
        videos.length === 0
    ) {

        contenedor.innerHTML = `

            <div class="col-12">

                <div class="videos-vacios">

                    <i class="bi bi-camera-video"></i>

                    <h3>
                        Videos próximamente
                    </h3>

                    <p>

                        Este jugador todavía
                        no tiene videos cargados.

                    </p>

                </div>

            </div>

        `;

        return;

    }

    contenedor.innerHTML = "";

    videos.forEach(
        video => {

            contenedor.innerHTML += `

                <div class="col-md-6">

                    <article class="video-card">

                        <video controls>

                            <source
                                src="${video.url}"
                                type="video/mp4">

                        </video>


                        <div class="video-info">

                            <h3>

                                ${video.titulo}

                            </h3>

                        </div>

                    </article>

                </div>

            `;

        }
    );

}