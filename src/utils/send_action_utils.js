const postSendAction = (url, body = null, onSuccessCallback, onErrorCallback) => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "F7BVJtZSo38Hw22aI3QWkLDJ9M0pMc70");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJGbU1ia004UXhyaXozaDl5MzZad0JOaUVZSFZnR0lsTiJ9.sg650g2TmNP9EnMbgA7l9MzciXBkxBTTr6hYHXOz7QI");
    myHeaders.append("X-Host-Override", "wot-device-api");
    myHeaders.append("Content-type", "application/json; charset=UTF-8");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then((resp) => {
            if (resp.status === 200){
                // return resp.json();
                onSuccessCallback()
            }
            else{
                // setstate({isLoading: false, isError: true, data:{}})
                onErrorCallback()
                throw new Error(resp.statusText);
            }
        })
        // .then((resultsObj) => {
        //     // setstate({isLoading: false, isError: false, data: resultsObj})
        // })
        .catch((error) => {
            console.log("POST ERROR> " + error);
            // setstate({isLoading: false, isError: true, data: {}})
        });
}

export {postSendAction}