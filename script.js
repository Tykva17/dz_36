let body = document.getElementById('root');
let preloader = document.getElementById('preloader_box_hdsjimdms');
let mainUrl = 'https://jsonplaceholder.typicode.com';
let formItem = 1;
let toItem = 15;

function sendRequest(method, url, body = null){
    return fetch(url).then(response => {
        return response.json()
    })
}


function addImg(from,to) {
    for(let i = from; i <= to; i++){
        let item = sendRequest('GET', mainUrl + '/photos/' + i);
        console.log(item);
        item.then(
            data => {
                if(data.thumbnailUrl !== undefined){
                    // console.log('sss',data.thumbnailUrl);
                    let imgItem = document.createElement('img');
                    imgItem.classList.add('post_img')
                    imgItem.src = data.thumbnailUrl;
                    body.appendChild(imgItem)
                    preloader.classList.remove('show')
                    setTimeout(function () {
                        imgItem.classList.add('show')
                    },1000)

                }else {
                    body.innerText = 'Sorry, somethings gone wrong( Try again latter!'
                }

            }
        )
        .catch(err => alert(err))
    }
}


addImg(formItem,toItem);

document.addEventListener('scroll', e => {
    if(document.documentElement.scrollHeight - 1.5 < Math.round(window.pageYOffset + window.innerHeight)){
        // code
        formItem = formItem + 15;
        toItem = toItem + 15;
        // alert('good'+ '    ' + formItem + '    ' + toItem)
        preloader.classList.add('show')
        addImg(formItem,toItem);
    }
})

// scroll
// document.body.scrollHeight
// +((window.pageYOffset + window.innerHeight + '').split('.')[0])
// < document.documentElement.scrollHeight + 2
