const {
    jugadores,
    clubes,
    partidos,
    pruebas
} = window.PlayerUYData;

const jugadoresPorPagina = 6;
const clubesPorPagina = 6;
const pruebasPorPagina = 6;

let paginaJugadores = 1;
let paginaClubes = 1;
let paginaPruebas = 1;

let jugadoresFiltradosActuales = [];

const buscador =
    document.getElementById("buscador");

const btnBuscar =
    document.getElementById("btnBuscar");

const filtroPosicion =
    document.getElementById("filtroPosicion");

const filtroDepartamento =
    document.getElementById("filtroDepartamento");

const ordenar =
    document.getElementById("ordenar");

const contenedorJugadores =
    document.getElementById("contenedorJugadores");

const cantidadJugadores =
    document.getElementById("cantidadJugadores");

const sinResultados =
    document.getElementById("sinResultados");

const paginacionJugadores =
    document.getElementById("paginacionJugadores");

const contenedorClubes =
    document.getElementById("contenedorClubes");

const cantidadClubes =
    document.getElementById("cantidadClubes");

const paginacionClubes =
    document.getElementById("paginacionClubes");

const calendarioPartidos =
    document.getElementById("calendarioPartidos");

const mesCalendario =
    document.getElementById("mesCalendario");

const semanaAnterior =
    document.getElementById("semanaAnterior");

const semanaSiguiente =
    document.getElementById("semanaSiguiente");

const contenedorPruebas =
    document.getElementById("contenedorPruebas");

const paginacionPruebas =
    document.getElementById("paginacionPruebas");

let inicioSemana =
    crearFecha("2026-08-17");

function crearFecha(fechaISO) {

    return new Date(
        `${fechaISO}T12:00:00`
    );

}

function convertirFechaISO(fecha) {

    const anio =
        fecha.getFullYear();

    const mes =
        String(
            fecha.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            fecha.getDate()
        ).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;

}

function formatearValor(valor) {

    return new Intl.NumberFormat(
        "es-UY"
    ).format(valor);

}

function obtenerClub(idClub) {

    return clubes.find(
        club =>
            club.id === idClub
    );

}

function obtenerJugadoresInicio() {

    return jugadores.filter(
        jugador =>
            jugador.mostrarEnInicio
    );

}

function mostrarJugadores(lista) {

    jugadoresFiltradosActuales =
        [...lista];

    contenedorJugadores.innerHTML = "";

    const totalPaginas =
        Math.ceil(
            lista.length /
            jugadoresPorPagina
        );

    if (
        totalPaginas > 0 &&
        paginaJugadores > totalPaginas
    ) {

        paginaJugadores = 1;

    }

    const inicio =
        (paginaJugadores - 1) *
        jugadoresPorPagina;

    const fin =
        inicio +
        jugadoresPorPagina;

    const jugadoresPagina =
        lista.slice(
            inicio,
            fin
        );

    jugadoresPagina.forEach(
        jugador => {

            const columna =
                document.createElement("div");

            columna.className =
                "col-md-6 col-lg-4 jugador-item";

            columna.innerHTML = `

                <article class="jugador-card">

                    <div class="jugador-imagen">

                        <img
                            src="${jugador.imagen}"
                            alt="${jugador.nombre}">

                        <span class="jugador-posicion">
                            ${jugador.posicion}
                        </span>

                        <button
                            type="button"
                            class="boton-favorito"
                            data-jugador="${jugador.id}"
                            aria-label="Agregar ${jugador.nombre} a favoritos">

                            <i class="bi bi-heart"></i>

                        </button>

                    </div>

                    <div class="jugador-info">

                        <h3>
                            ${jugador.nombre}
                        </h3>

                        <p class="jugador-datos">

                            🇺🇾 ${jugador.departamento}
                            ·
                            ${jugador.edad} años

                        </p>

                        <div class="estadisticas">

                            <div>

                                <strong>
                                    ${jugador.goles}
                                </strong>

                                <span>
                                    Goles
                                </span>

                            </div>

                            <div>

                                <strong>
                                    ${jugador.asistencias}
                                </strong>

                                <span>
                                    Asist.
                                </span>

                            </div>

                            <div>

                                <strong>
                                    ${jugador.partidos}
                                </strong>

                                <span>
                                    Partidos
                                </span>

                            </div>

                        </div>

                        <div class="jugador-valor">

                            <span>
                                Valor estimado
                            </span>

                            <strong>

                                USD ${formatearValor(
                                    jugador.valor
                                )}

                            </strong>

                        </div>

                        <a
                            href="perfil.html?id=${jugador.id}"
                            class="boton-perfil">

                            Ver perfil

                            <i class="bi bi-arrow-right"></i>

                        </a>

                    </div>

                </article>

            `;

            contenedorJugadores.appendChild(
                columna
            );

        }
    );

    cantidadJugadores.textContent =
        lista.length === 1
            ? "1 jugador"
            : `${lista.length} jugadores`;

    if (lista.length === 0) {

        sinResultados.classList.remove(
            "d-none"
        );

    }

    else {

        sinResultados.classList.add(
            "d-none"
        );

    }

    configurarFavoritos();

    mostrarPaginacionJugadores(
        totalPaginas
    );

}

function mostrarPaginacionJugadores(
    totalPaginas
) {

    paginacionJugadores.innerHTML = "";

    if (
        totalPaginas <= 1
    ) {

        return;

    }

    const botonAnterior =
        document.createElement("button");

    botonAnterior.type =
        "button";

    botonAnterior.className =
        "btn btn-outline-dark";

    botonAnterior.innerHTML = `

        <i class="bi bi-chevron-left"></i>

        Anterior

    `;

    botonAnterior.disabled =
        paginaJugadores === 1;

    const indicador =
        document.createElement("span");

    indicador.className =
        "fw-bold text-secondary";

    indicador.textContent =
        `Página ${paginaJugadores} de ${totalPaginas}`;

    const botonSiguiente =
        document.createElement("button");

    botonSiguiente.type =
        "button";

    botonSiguiente.className =
        "btn btn-dark";

    botonSiguiente.innerHTML = `

        Siguiente

        <i class="bi bi-chevron-right"></i>

    `;

    botonSiguiente.disabled =
        paginaJugadores === totalPaginas;

    botonAnterior.addEventListener(
        "click",
        function () {

            if (
                paginaJugadores > 1
            ) {

                paginaJugadores--;

                mostrarJugadores(
                    jugadoresFiltradosActuales
                );

                document
                    .getElementById("jugadores")
                    .scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

            }

        }
    );

    botonSiguiente.addEventListener(
        "click",
        function () {

            if (
                paginaJugadores <
                totalPaginas
            ) {

                paginaJugadores++;

                mostrarJugadores(
                    jugadoresFiltradosActuales
                );

                document
                    .getElementById("jugadores")
                    .scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

            }

        }
    );

    paginacionJugadores.appendChild(
        botonAnterior
    );

    paginacionJugadores.appendChild(
        indicador
    );

    paginacionJugadores.appendChild(
        botonSiguiente
    );

}

function actualizarJugadores(
    reiniciarPagina = true
) {

    if (reiniciarPagina) {

        paginaJugadores = 1;

    }

    const texto =
        buscador.value
            .trim()
            .toLowerCase();

    let lista =
        obtenerJugadoresInicio();

    lista =
        lista.filter(
            jugador =>
                jugador.nombre
                    .toLowerCase()
                    .includes(texto)
        );

    if (
        filtroPosicion.value !==
        "todos"
    ) {

        lista =
            lista.filter(
                jugador =>
                    jugador.posicionFiltro ===
                    filtroPosicion.value
            );

    }

    if (
        filtroDepartamento.value !==
        "todos"
    ) {

        lista =
            lista.filter(
                jugador =>
                    jugador.departamento ===
                    filtroDepartamento.value
            );

    }

    if (
        ordenar.value === "jovenes"
    ) {

        lista.sort(
            (a, b) =>
                a.edad - b.edad
        );

    }

    else if (
        ordenar.value === "goles"
    ) {

        lista.sort(
            (a, b) =>
                b.goles - a.goles
        );

    }

    else if (
        ordenar.value === "valorMayor"
    ) {

        lista.sort(
            (a, b) =>
                b.valor - a.valor
        );

    }

    else {

        lista.sort(
            (a, b) =>
                a.id - b.id
        );

    }

    mostrarJugadores(
        lista
    );

}

function mostrarClubes() {

    contenedorClubes.innerHTML = "";

    const totalPaginas =
        Math.ceil(
            clubes.length /
            clubesPorPagina
        );

    if (
        paginaClubes >
        totalPaginas
    ) {

        paginaClubes = 1;

    }

    const inicio =
        (paginaClubes - 1) *
        clubesPorPagina;

    const fin =
        inicio +
        clubesPorPagina;

    const clubesPagina =
        clubes.slice(
            inicio,
            fin
        );

    clubesPagina.forEach(
        club => {

            const cantidad =
                jugadores.filter(
                    jugador =>
                        jugador.clubId ===
                        club.id
                ).length;

            const columna =
                document.createElement("div");

            columna.className =
                "col-sm-6 col-lg-4";

            columna.innerHTML = `

                <article class="club-card">

                    <div class="club-escudo">

                        <span>
                            ${club.sigla}
                        </span>

                    </div>

                    <h3>
                        ${club.nombre}
                    </h3>

                    <p>
                        ${club.departamento}
                    </p>

                    <span class="club-jugadores">

                        ${cantidad}
                        jugadores registrados

                    </span>

                    <a
                        href="club.html?id=${club.id}"
                        class="boton-club">

                        Ver club

                        <i class="bi bi-arrow-right"></i>

                    </a>

                </article>

            `;

            contenedorClubes.appendChild(
                columna
            );

        }
    );

    cantidadClubes.textContent =
        clubes.length === 1
            ? "1 club"
            : `${clubes.length} clubes`;

    mostrarPaginacionClubes(
        totalPaginas
    );

}

function mostrarPaginacionClubes(
    totalPaginas
) {

    paginacionClubes.innerHTML = "";

    if (
        totalPaginas <= 1
    ) {

        return;

    }

    const botonAnterior =
        document.createElement("button");

    botonAnterior.type =
        "button";

    botonAnterior.className =
        "btn btn-outline-dark";

    botonAnterior.innerHTML = `

        <i class="bi bi-chevron-left"></i>

        Anterior

    `;

    botonAnterior.disabled =
        paginaClubes === 1;

    const indicador =
        document.createElement("span");

    indicador.className =
        "fw-bold text-secondary";

    indicador.textContent =
        `Página ${paginaClubes} de ${totalPaginas}`;

    const botonSiguiente =
        document.createElement("button");

    botonSiguiente.type =
        "button";

    botonSiguiente.className =
        "btn btn-dark";

    botonSiguiente.innerHTML = `

        Siguiente

        <i class="bi bi-chevron-right"></i>

    `;

    botonSiguiente.disabled =
        paginaClubes === totalPaginas;

    botonAnterior.addEventListener(
        "click",
        function () {

            if (
                paginaClubes > 1
            ) {

                paginaClubes--;

                mostrarClubes();

                document
                    .getElementById("clubes")
                    .scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

            }

        }
    );

    botonSiguiente.addEventListener(
        "click",
        function () {

            if (
                paginaClubes <
                totalPaginas
            ) {

                paginaClubes++;

                mostrarClubes();

                document
                    .getElementById("clubes")
                    .scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

            }

        }
    );

    paginacionClubes.appendChild(
        botonAnterior
    );

    paginacionClubes.appendChild(
        indicador
    );

    paginacionClubes.appendChild(
        botonSiguiente
    );

}

function mostrarPartidos() {

    calendarioPartidos.innerHTML = "";

    const nombresDias = [
        "DOM",
        "LUN",
        "MAR",
        "MIÉ",
        "JUE",
        "VIE",
        "SÁB"
    ];

    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const fecha =
            new Date(
                inicioSemana
            );

        fecha.setDate(
            inicioSemana.getDate() +
            i
        );

        const fechaISO =
            convertirFechaISO(
                fecha
            );

        const partidosDia =
            partidos.filter(
                partido =>
                    partido.fecha ===
                    fechaISO
            );

        let contenido = "";

        if (
            partidosDia.length === 0
        ) {

            contenido = `

                <span class="sin-partidos">

                    Sin partidos

                </span>

            `;

        }

        else {

            partidosDia.forEach(
                partido => {

                    contenido += `

                        <div
                            class="partido-card ${
                                partido.destacado
                                    ? "destacado"
                                    : ""
                            }">

                            <span class="partido-hora">

                                ${partido.hora}

                            </span>

                            <strong>
                                ${partido.local}
                            </strong>

                            <span class="versus">
                                vs
                            </span>

                            <strong>
                                ${partido.visitante}
                            </strong>

                        </div>

                    `;

                }
            );

        }

        const diaHTML =
            document.createElement(
                "div"
            );

        diaHTML.className =
            "dia-calendario";

        diaHTML.innerHTML = `

            <div class="dia-header">

                <span>

                    ${nombresDias[
                        fecha.getDay()
                    ]}

                </span>

                <strong>

                    ${fecha.getDate()}

                </strong>

            </div>

            <div class="dia-contenido">

                ${contenido}

            </div>

        `;

        calendarioPartidos.appendChild(
            diaHTML
        );

    }

    actualizarTituloCalendario();

}

function actualizarTituloCalendario() {

    const nombreMes =
        inicioSemana.toLocaleDateString(
            "es-UY",
            {
                month: "long",
                year: "numeric"
            }
        );

    mesCalendario.textContent =
        nombreMes
            .charAt(0)
            .toUpperCase() +
        nombreMes.slice(1);

}

function mostrarPruebas() {

    contenedorPruebas.innerHTML = "";

    const totalPaginas =
        Math.ceil(
            pruebas.length /
            pruebasPorPagina
        );

    if (
        paginaPruebas >
        totalPaginas
    ) {

        paginaPruebas = 1;

    }

    const inicio =
        (paginaPruebas - 1) *
        pruebasPorPagina;

    const fin =
        inicio +
        pruebasPorPagina;

    const pruebasPagina =
        pruebas.slice(
            inicio,
            fin
        );

    pruebasPagina.forEach(
        prueba => {

            const club =
                obtenerClub(
                    prueba.clubId
                );

            if (!club) {

                return;

            }

            const columna =
                document.createElement(
                    "div"
                );

            columna.className =
                "col-md-6 col-lg-4";

            columna.innerHTML = `

                <article class="prueba-card">

                    <div class="prueba-club">

                        <div class="prueba-escudo">

                            ${club.sigla}

                        </div>

                        <div>

                            <h3>
                                ${club.nombre}
                            </h3>

                            <span>
                                ${prueba.categoria}
                            </span>

                        </div>

                    </div>

                    <p class="prueba-descripcion">

                        ${prueba.descripcion}

                    </p>

                    <div class="prueba-detalles">

                        <div>

                            <i class="bi bi-geo-alt"></i>

                            <span>
                                ${prueba.ubicacion}
                            </span>

                        </div>

                        <div>

                            <i class="bi bi-people"></i>

                            <span>
                                ${prueba.categoria}
                            </span>

                        </div>

                    </div>

                    <div class="aviso-fecha">

                        <i class="bi bi-info-circle"></i>

                        <span>

                            La fecha será anunciada
                            próximamente.

                        </span>

                    </div>

                    <button
                        type="button"
                        class="boton-notificar"
                        data-prueba="${prueba.id}">

                        <i class="bi bi-bell"></i>

                        <span>
                            Notificarme
                        </span>

                    </button>

                </article>

            `;

            contenedorPruebas.appendChild(
                columna
            );

        }
    );

    configurarNotificaciones();

    mostrarPaginacionPruebas(
        totalPaginas
    );

}

function mostrarPaginacionPruebas(
    totalPaginas
) {

    paginacionPruebas.innerHTML = "";

    if (
        totalPaginas <= 1
    ) {

        return;

    }

    const botonAnterior =
        document.createElement(
            "button"
        );

    botonAnterior.type =
        "button";

    botonAnterior.className =
        "btn btn-outline-dark";

    botonAnterior.innerHTML = `

        <i class="bi bi-chevron-left"></i>

        Anterior

    `;

    botonAnterior.disabled =
        paginaPruebas === 1;

    const indicador =
        document.createElement(
            "span"
        );

    indicador.className =
        "fw-bold text-secondary";

    indicador.textContent =
        `Página ${paginaPruebas} de ${totalPaginas}`;

    const botonSiguiente =
        document.createElement(
            "button"
        );

    botonSiguiente.type =
        "button";

    botonSiguiente.className =
        "btn btn-dark";

    botonSiguiente.innerHTML = `

        Siguiente

        <i class="bi bi-chevron-right"></i>

    `;

    botonSiguiente.disabled =
        paginaPruebas ===
        totalPaginas;

    botonAnterior.addEventListener(
        "click",
        function () {

            if (
                paginaPruebas > 1
            ) {

                paginaPruebas--;

                mostrarPruebas();

                document
                    .getElementById(
                        "pruebas"
                    )
                    .scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

            }

        }
    );

    botonSiguiente.addEventListener(
        "click",
        function () {

            if (
                paginaPruebas <
                totalPaginas
            ) {

                paginaPruebas++;

                mostrarPruebas();

                document
                    .getElementById(
                        "pruebas"
                    )
                    .scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

            }

        }
    );

    paginacionPruebas.appendChild(
        botonAnterior
    );

    paginacionPruebas.appendChild(
        indicador
    );

    paginacionPruebas.appendChild(
        botonSiguiente
    );

}

function configurarFavoritos() {

    const botones =
        document.querySelectorAll(
            ".boton-favorito"
        );

    let favoritos =
        JSON.parse(
            localStorage.getItem(
                "jugadoresFavoritos"
            )
        ) || [];

    botones.forEach(
        boton => {

            const id =
                Number(
                    boton.dataset.jugador
                );

            if (
                favoritos.includes(id)
            ) {

                activarFavorito(
                    boton
                );

            }

            boton.addEventListener(
                "click",
                function () {

                    if (
                        favoritos.includes(
                            id
                        )
                    ) {

                        favoritos =
                            favoritos.filter(
                                favorito =>
                                    favorito !== id
                            );

                        desactivarFavorito(
                            boton
                        );

                    }

                    else {

                        favoritos.push(
                            id
                        );

                        activarFavorito(
                            boton
                        );

                    }

                    localStorage.setItem(
                        "jugadoresFavoritos",
                        JSON.stringify(
                            favoritos
                        )
                    );

                }
            );

        }
    );

}

function activarFavorito(
    boton
) {

    boton.classList.add(
        "activo"
    );

    boton.innerHTML = `

        <i class="bi bi-heart-fill"></i>

    `;

}

function desactivarFavorito(
    boton
) {

    boton.classList.remove(
        "activo"
    );

    boton.innerHTML = `

        <i class="bi bi-heart"></i>

    `;

}

function configurarNotificaciones() {

    const botones =
        document.querySelectorAll(
            ".boton-notificar"
        );

    let notificaciones =
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
                notificaciones.includes(
                    id
                )
            ) {

                activarNotificacion(
                    boton
                );

            }

            boton.addEventListener(
                "click",
                function () {

                    if (
                        notificaciones.includes(
                            id
                        )
                    ) {

                        notificaciones =
                            notificaciones.filter(
                                pruebaId =>
                                    pruebaId !== id
                            );

                        desactivarNotificacion(
                            boton
                        );

                    }

                    else {

                        notificaciones.push(
                            id
                        );

                        activarNotificacion(
                            boton
                        );

                    }

                    localStorage.setItem(
                        "pruebasNotificadas",
                        JSON.stringify(
                            notificaciones
                        )
                    );

                }
            );

        }
    );

}

function activarNotificacion(
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

function desactivarNotificacion(
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

buscador.addEventListener(
    "input",
    function () {

        actualizarJugadores(
            true
        );

    }
);

btnBuscar.addEventListener(
    "click",
    function () {

        actualizarJugadores(
            true
        );

    }
);

buscador.addEventListener(
    "keydown",
    function (evento) {

        if (
            evento.key === "Enter"
        ) {

            actualizarJugadores(
                true
            );

        }

    }
);

filtroPosicion.addEventListener(
    "change",
    function () {

        actualizarJugadores(
            true
        );

    }
);

filtroDepartamento.addEventListener(
    "change",
    function () {

        actualizarJugadores(
            true
        );

    }
);

ordenar.addEventListener(
    "change",
    function () {

        actualizarJugadores(
            true
        );

    }
);

semanaAnterior.addEventListener(
    "click",
    function () {

        inicioSemana.setDate(
            inicioSemana.getDate() -
            7
        );

        mostrarPartidos();

    }
);

semanaSiguiente.addEventListener(
    "click",
    function () {

        inicioSemana.setDate(
            inicioSemana.getDate() +
            7
        );

        mostrarPartidos();

    }
);

actualizarJugadores(
    false
);

mostrarClubes();

mostrarPartidos();

mostrarPruebas();