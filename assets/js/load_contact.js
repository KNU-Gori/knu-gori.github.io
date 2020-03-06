/*
{
    "last_updated": "2020/03/06",
    "contact": [
        ["직책", "이름", "전화번호", "이메일"]
    ]
}
*/

let url = '/assets/contact.json';
const req = new XMLHttpRequest();

req.open('GET', url);
req.responseType = 'json';
req.send();

let data;

req.onload = () => {
    if (req.status === 200 || req.status === 201) {
        console.log('succeed');
        console.log(req.response);

        document.getElementById('noti').remove();

        data = req.response;
        let body = document.getElementById('body');
        body.insertAdjacentHTML('beforeend', `<p>마지막 업데이트 : ${data['last_updated']}</p>`);

        let table = `<table class="pure-table">
                        <thead>
                            <tr>
                                <th>직책</th>
                                <th>이름</th>
                                <th>전화번호</th>
                                <th>이메일</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">

                        </tbody>
                        </table>`;
        body.insertAdjacentHTML('beforeend', table);

        let tbody = document.getElementById('tbody');
        for (let i = 0; i < data['contact'].length; i++) {
            let row = data['contact'][i];
            tbody.insertAdjacentHTML('beforeend', `<tr>
                                                    <th>${row[0]}</th>
                                                    <th>${row[1]}</th>
                                                    <th>${row[2]}</th>
                                                    <th>${row[3]}</th>
                                                    </tr>`);
        }
    } else {
        console.log('failed');
        console.error(req.status);

        document.getElementById('noti').value = '연락처를 불러오는 중 에러가 발생했습니다.'
    }
}