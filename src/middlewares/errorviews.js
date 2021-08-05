export function view404(request, response, next){
    return response.status(404).render('./system/error404');
}

export function view500(request, response, next){
    return response.status(500).render('./system/error500');
}