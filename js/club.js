const {
    jugadores,
    clubes,
    partidos,
    pruebas
} = window.PlayerUYData;

const parametros =
    new URLSearchParams(
        window.location.search
    );

const idClub =
    Number(
        parametros.get("id")
    );

const club =
    clubes.find(
        club =>
            club.id === idClub
    );

if (!club) {

    document.querySelector("main").innerHTML = `

        <section class="club-principal">

            <div class="container text-center py-5">

                <h1>
                    Club no encontrado
                </h1>

                <p class="text-secondary">

                    El club solicitado
                    no existe.

                </p>

                <a
                    href="index.html#clubes"
                    class="btn btn-dark mt-3">

                    Volver a clubes

                </a>

            </div>

        </section>

    `;

}

else {

    cargarClub(club);

}

function cargarClub(club) {

    const jugadoresClub =
        jugadores.filter(
            jugador =>
                jugador.clubId === club.id
        );

    const principales =
        jugadoresClub.filter(
            jugador =>
                jugador.plantel ===
                "principal"
        );

    const reserva =
        jugadoresClub.filter(
            jugador =>
                jugador.plantel ===
                "reserva"
        );

    const partidosClub =
        partidos.filter(
            partido =>
                partido.local === club.nombre ||
                partido.visitante === club.nombre
        );

    const pruebasClub =
        pruebas.filter(
            prueba =>
                prueba.clubId === club.id
        );

    document.title =
        `${club.nombre} | Player UY`;

    document.getElementById(
        "clubNombre"
    ).textContent =
        club.nombre;

    document.getElementById(
        "clubEscudo"
    ).textContent =
        club.sigla;

    document.getElementById(
        "clubUbicacion"
    ).textContent =
        club.ubicacion;

    document.getElementById(
        "clubDescripcion"
    ).textContent =
        club.descripcion;

    document.getElementById(
        "clubCategoria"
    ).textContent =
        club.categoria;

    document.getElementById(
        "clubCantidadJugadores"
    ).textContent =
        jugadoresClub.length;

    document.getElementById(
        "clubDepartamento"
    ).textContent =
        club.departamento;

    cargarJugadores(
        principales,
        "jugadoresPrincipales",
        true
    );

    cargarJugadores(
        reserva,
        "jugadoresReserva",
        true
    );

    cargarPartidos(
        partidosClub
    );

    cargarPruebas(
        pruebasClub
    );

}

function cargarJugadores(
    lista,
    idContenedor,
    permitirPerfil
) {

    const contenedor =
        document.getElementById(
            idContenedor
        );

    contenedor.innerHTML = "";

    if (
        lista.length === 0
    ) {

        contenedor.innerHTML = `

            <div class="col-12">

                <p class="text-secondary">

                    No hay jugadores cargados
                    en esta categoría.

                </p>

            </div>

        `;

        return;

    }

    lista.forEach(
        jugador => {

            const botonPerfil =
                permitirPerfil
                    ? `

                        <a
                            href="perfil.html?id=${jugador.id}"
                            class="boton-ver-perfil">

                            Ver perfil

                            <i class="bi bi-arrow-right"></i>

                        </a>

                    `
                    : "";

            contenedor.innerHTML += `

                <div
                    class="col-md-6 col-lg-4">

                    <article
                        class="jugador-club-card">

                        <div
                            class="jugador-club-imagen">

                            <img
                                src="${jugador.imagen}"
                                alt="${jugador.nombre}">

                        </div>

                        <div
                            class="jugador-club-info">

                            <h3>

                                ${jugador.nombre}

                            </h3>

                            <p>

                                ${jugador.posicion}
                                ·
                                ${jugador.edad} años

                            </p>

                            ${botonPerfil}

                        </div>

                    </article>

                </div>

            `;

        }
    );

}

function cargarPartidos(
    lista
) {

    const contenedor =
        document.getElementById(
            "partidosClub"
        );

    contenedor.innerHTML = "";

    if (
        lista.length === 0
    ) {

        contenedor.innerHTML = `

            <p class="text-secondary">

                No hay próximos partidos
                registrados.

            </p>

        `;

        return;

    }

    const listaOrdenada =
        [...lista].sort(
            (a, b) =>
                new Date(a.fecha) -
                new Date(b.fecha)
        );

    listaOrdenada.forEach(
        partido => {

            const fecha =
                new Date(
                    `${partido.fecha}T12:00:00`
                );

            const fechaFormateada =
                fecha.toLocaleDateString(
                    "es-UY",
                    {
                        day: "2-digit",
                        month: "short"
                    }
                ).toUpperCase();

            contenedor.innerHTML += `

                <article
                    class="partido-club-card">

                    <div>

                        <span
                            class="partido-club-fecha">

                            ${fechaFormateada}

                        </span>

                        <span
                            class="partido-club-hora">

                            ${partido.hora}

                        </span>

                    </div>

                    <div
                        class="partido-club-equipo">

                        ${partido.local}

                    </div>

                    <div
                        class="partido-club-vs">

                        VS

                    </div>

                    <div
                        class="partido-club-equipo">

                        ${partido.visitante}

                    </div>

                </article>

            `;

        }
    );

}

function cargarPruebas(
    lista
) {

    const contenedor =
        document.getElementById(
            "pruebasClub"
        );

    contenedor.innerHTML = "";

    if (
        lista.length === 0
    ) {

        contenedor.innerHTML = `

            <div class="col-12">

                <p class="text-secondary">

                    El club no tiene
                    próximas pruebas publicadas.

                </p>

            </div>

        `;

        return;

    }

    lista.forEach(
        prueba => {

            contenedor.innerHTML += `

                <div
                    class="col-md-6 col-lg-4">

                    <article
                        class="prueba-club-card">

                        <h3>

                            ${prueba.categoria}

                        </h3>

                        <div
                            class="prueba-club-dato">

                            <i class="bi bi-geo-alt"></i>

                            <span>

                                ${prueba.ubicacion}

                            </span>

                        </div>

                        <div
                            class="prueba-club-dato">

                            <i class="bi bi-people"></i>

                            <span>

                                ${prueba.categoria}

                            </span>

                        </div>

                        <div
                            class="prueba-club-aviso">

                            ${prueba.descripcion}

                            <br><br>

                            La fecha será
                            anunciada próximamente.

                        </div>

                        <button
                            type="button"
                            class="boton-notificar-club"
                            data-prueba="${prueba.id}">

                            <i class="bi bi-bell"></i>

                            <span>
                                Notificarme
                            </span>

                        </button>

                    </article>

                </div>

            `;

        }
    );

    configurarNotificaciones();

}

function configurarNotificaciones() {

    const botones =
        document.querySelectorAll(
            ".boton-notificar-club"
        );

    let guardadas =
        JSON.parse(
            localStorage.getItem(
                "pruebasNotificadas"
            )
        ) || [];

    botones.forEach(
        boton => {

            const id =
                Number(
                    boton.dataset.prueba
                );

            if (
                guardadas.includes(id)
            ) {

                activarBoton(
                    boton
                );

            }

            boton.addEventListener(
                "click",
                function () {

                    if (
                        guardadas.includes(id)
                    ) {

                        guardadas =
                            guardadas.filter(
                                pruebaId =>
                                    pruebaId !== id
                            );

                        desactivarBoton(
                            boton
                        );

                    }

                    else {

                        guardadas.push(id);

                        activarBoton(
                            boton
                        );

                    }

                    localStorage.setItem(
                        "pruebasNotificadas",
                        JSON.stringify(
                            guardadas
                        )
                    );

                }
            );

        }
    );

}

function activarBoton(
    boton
) {

    boton.classList.add(
        "activo"
    );

    boton.innerHTML = `

        <i class="bi bi-check-circle-fill"></i>

        <span>
            Aviso activado
        </span>

    `;

}

function desactivarBoton(
    boton
) {

    boton.classList.remove(
        "activo"
    );

    boton.innerHTML = `

        <i class="bi bi-bell"></i>

        <span>
            Notificarme
        </span>

    `;

}