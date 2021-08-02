export const login = (request, response) => {
    response.render('./administrador/login')
}

export const main = (request, response) => {
    response.render('./administrador/main')
}

export const votaciones = (request, response) => {
    response.render('./administrador/votaciones')
}

export const asistencia = (request, response) => {
    response.render('./administrador/asistencia')
}
