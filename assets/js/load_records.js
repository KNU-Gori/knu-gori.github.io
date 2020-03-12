/*
{
    "2020": {
        "팀대회 대회명1": {
            "type": "team",
            "records": [
                {"rank": "200", "team": "ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄹ",},
                {"rank": "300", "team": "팀명"}
            ]
        },
        "개인대회 대회명2": {
            "type": "individual",
            "records": [
                {"rank": "a", "name": "asdf"},
                {"rank": "a", "name": "123"}
            ]
        },
        "팀대회 대회명3": {
            "type": "team",
            "records": [
                {"rank": "a", "team": "teamname"},
                {"rank": "a", "team": "teamname"},
                {"rank": "a", "team": "teamname"},
                {"rank": "a", "team": "teamname"}
            ]
        }
    },
    "2019": {

    }, ...
}
*/

let url = '/assets/records.json';
const req = new XMLHttpRequest();

req.open('GET', url);
req.responseType = 'json';
req.send();

let data;

req.onload = () => {
    if (req.status === 200 || req.status === 201) {
        console.log('succeed');
        console.log(req.response);

        data = req.response;
        let body = document.getElementById('body');  // render to #body

        // handle #noti
        document.getElementById('noti').remove();

        // build nav
        let nav = '<div class="pure-menu pure-menu-horizontal pure-menu-scrollable">\
                    <ul class="pure-menu-list" id="year_list"></ul>\
                    </div>'
        body.insertAdjacentHTML('beforeend', nav);

        let year_list = document.getElementById('year_list');
        let keys = Object.keys(data);
        for (let i = keys.length - 1; i >= 0; i--) {  // keys가 오름차순 정렬 보장되면 걍 이렇게 하면 됨
            let str = `<li class="pure-menu-item"><a href="#" onClick="show_records(${keys[i]})" class="pure-menu-link">${keys[i]}</a></li>`
            year_list.insertAdjacentHTML('beforeend', str);
        }

        // 매번 clear하려면 nav 밑에 표 렌더링할 곳이 따로 필요
        let render_div = '<div id="render_div"></div>';
        body.insertAdjacentHTML('beforeend', render_div);

        // 다 끝나면 기본으로 제일 앞에거 렌더링시켜두기
        show_records(keys[keys.length - 1]);

    } else {
        console.log('failed');
        console.error(req.status);

        // handle #noti
        document.getElementById('noti').value = '기록들을 불러오는 중 에러가 발생했습니다.'
    }
}

const show_records = (year) => {
    console.log(`received ${year}`);

    // clear render_div before print sth
    let render_div = document.getElementById('render_div');
    render_div.innerHTML = '';

    // h2
    render_div.insertAdjacentHTML('beforeend', `<h2>${year}년 기록</h2>`);

    // render year records
    let year_records = data[year];
    console.log(year_records);
    
    let keys = Object.keys(year_records);  // name of contests

    if (keys.length === 0) {
        render_div.insertAdjacentHTML('beforeend', `<p>아직 ${year}년 기록이 없습니다.</p>`);
    } 

    for (let i = 0; i < keys.length; i++) {
        let article = document.createElement('article');
        render_div.appendChild(article);

        let heading = `<h3>${keys[i]}</h3>`;
        let table = `<table class="pure-table">
                        <thead id="thead-${i}">

                        </thead>
                        <tbody id="tbody-${i}">

                        </tbody>
                        </table>`;
        article.insertAdjacentHTML('beforeend', heading);
        article.insertAdjacentHTML('beforeend', table);

        let contest = year_records[keys[i]];
        if (contest['type'] === 'team') {
            // rank, team, members
            let thead = document.getElementById(`thead-${i}`);
            thead.insertAdjacentHTML('beforeend', `<tr>
                                                    <th>Rank</th>
                                                    <th>Team</th>
                                                    </tr>`);
            
            let tbody = document.getElementById(`tbody-${i}`);
            for (let j = 0; j < contest['records'].length; j++) {
                let row = contest['records'][j];
                tbody.insertAdjacentHTML('beforeend', `<tr>
                                                        <th>${row['rank']}</th>
                                                        <th>${row['team']}</th>
                                                        </tr>`);
            }
        } else if (contest['type'] === 'individual') {
            // rank, name
            let thead = document.getElementById(`thead-${i}`);
            thead.insertAdjacentHTML('beforeend', `<tr>
                                                    <th>Rank</th>
                                                    <th>Name</th>
                                                    </tr>`);
            
            let tbody = document.getElementById(`tbody-${i}`);
            for (let j = 0; j < contest['records'].length; j++) {
                let row = contest['records'][j];
                tbody.insertAdjacentHTML('beforeend', `<tr>
                                                        <th>${row['rank']}</th>
                                                        <th>${row['name']}</th>
                                                        </tr>`);
            }
        } else {
            // unknown contest type
        }
    }  // endfor
}