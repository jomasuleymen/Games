async function promise() {
    return new Promise((resolve, reject) => {
        setTimeout(reject("errro"), 2000);
    })
        .then((text) => {
            return text + "1";
        })
        .then((text) => {
            return text + "2";
        })
}

promise()
    .then((text) => {
        return text;
    })
    .then((text) => {
        console.log(text);
    })
    .catch((err) => {
        console.log(err);
    });
