import http from 'http';

const templateStringServer = () => {
    const hostname = '127.0.0.1';
    const port = 3000;

    let scriptContent = ( () => {

        console.log(document.querySelectorAll('*'));


        window.addEventListener('load', (ev)=> {
            console.log(ev);
            console.log(1);
            let dv = document.createElement('div');
            dv.textContent = 'test div';
            dv.addEventListener('load', () => {
                console.log('div loaded');
            });
            document.body.appendChild(dv);
        });  
    });


    let jscript = `<script>(${scriptContent.toString()})()</script>`;
    let name = 'First Name';
    const namer = (str,scr, nm) => {
        return str[0] + scr + str[1] + nm + str[2];
    };

    let htmlTemplate = namer`${jscript}<div><p><span>${name}</span></p></div>`;


    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(htmlTemplate);
    });

    server.listen(port, hostname, () => {
        console.log('Server runnign');
    })
};

export { templateStringServer };