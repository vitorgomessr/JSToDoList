export function createXMLHttpRequest(method, url, success, error, data = null){
    const xrh = new XMLHttpRequest()

    xrh.open(method, url)
    xrh.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xrh.send(data)
    xrh.onreadystatechange = verificaAjax

    function verificaAjax(){
        if(xrh.readyState === 4){
            if(xrh.status < 400){
                const json = JSON.parse(xrh.responseText)
                if(typeof success === "function"){
                    success(json)
                }
            }else if(typeof error === "function"){
                error("algo deu errado com a conexão")
            }   
        }
    }
}
