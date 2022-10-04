const fastify = require('fastify')({
    logger: true
});
const fastifySession = require('fastify-session');
const fastifyCookie = require('fastify-cookie');

const fs = require('fs');

function jsonReader(filePath, cb) {
    let a;
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            a = cb(null, object);
            return cb(null, object)
        } catch (err) {
            return cb && cb(err)
        }
    })
}
fastify.register(fastifyCookie);
fastify.register(fastifySession, {
    cookieName: 'sessionId',
    secret: 'aaaaaasdasdsdiu22383232892n839n23nf2938nf23n9f2n33',
    cookie: { secure: false },
    expires: 1800000,
});
fastify.register(require('fastify-cors'), {
    origin: 'http://192.168.56.1:3000',

    credentials: 'same-origin',
    allowMethods:
        'PROPFIND, PROPPATCH, COPY, MOVE, DELETE, MKCOL, LOCK, UNLOCK, PUT, GETLIB, VERSION-CONTROL, CHECKIN, CHECKOUT, UNCHECKOUT, REPORT, UPDATE, CANCELUPLOAD, HEAD, OPTIONS, GET, POST',
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'X-Custom-Header',
        'X-Requested-With',
        'Cookie',
    ],
});
let on_server = []
fastify.post('/login', async (request, reply) => {
    console.log(on_server)
    const { email, password } = request.body

    jsonReader('./users.json', (err, customer) => {
        if (err) {
            console.log('Error reading file:', err)
            return
        }
        else if (typeof customer[email] !== undefined) {
            //console.log(customer[email].password)
            //console.log(customer[email])
            if (password === customer[email].password) {
                on_server.push(email)
                request.session.authenticated = true
                request.session.user = { name: email };
                success=true;
            } else {
                request.session.authenticated = false;
            }

        } else{
            request.session.authenticated = false;
            success=false;
        }
    });
    //reply.send({"user":{"name":email}})
    reply.redirect('/')
});

fastify.post('/register', async (request, reply) => {
    const { email, password, name, group, variant, tel} = request.body
    jsonReader('./users.json', (err, customer) => {
        if (err) {
            console.log('Error reading file:', err)
            return
        }
        if (/\S+@\S+\.\S+/.test(email)) {
        request.session.authenticated = true
        request.session.user = { name: email };
        customer[email] = {"username":email,
        "password":password,
        "name":name,
        "group":group,
        "variant":variant,
        "tel":tel,
        "photo":'',
        "status":"user"};
        fs.writeFile('./users.json', JSON.stringify(customer), (err) => {
            if (err) console.log('Error writing file:', err)
        })}
    });
    reply.redirect('/')
    

});

fastify.get('/profile', async (request, reply) => {
  let users = fs.readFileSync('users.json');
  let user = JSON.parse(users);
  console.log(request.session.user)
  return user[request.session.user.name];

  

});
fastify.post('/change', async (request, reply) => {
    const { email, password, name, group, variant, tel, status} = request.body

    jsonReader('./users.json', (err, customer) => {
        if (err) {
            console.log('Error reading file:', err)
            return
        }
        delete customer[request.session.user.name]
        request.session.authenticated = true
        request.session.user = { name: email };
        customer[email] = {"username":email,
        "password":password,
        "name":name,
        "group":group,
        "variant":variant,
        "tel":tel,
        "photo":'',
        "status":status};
        fs.writeFile('./users.json', JSON.stringify(customer), (err) => {
            if (err) console.log('Error writing file:', err)
        })
    });
    reply.redirect('/')
    

});
fastify.get('/', async (request, reply) => {
    if (request.session.authenticated){
        return { "user": request.session.user }
    }else{
        return {"user":{name:false}}
    }
})

fastify.get('/delete', (request, reply) => {
    if (request.session.authenticated){
        jsonReader('./users.json', (err, customer) => {
            if (err) {
                console.log('Error reading file:', err)
                return
            }
            delete customer[request.session.user.name]
            fs.writeFile('./users.json', JSON.stringify(customer), (err) => {
                if (err) console.log('Error writing file:', err)
            })
        });
    }
    reply.redirect('/logout')
})
fastify.get('/logout', (request, reply) => {
    if (request.session.authenticated) {
        request.destroySession((err) => {
            if (err) {
                reply.status(500)
                return "Server error"
            } else {
                return { "logout": true }
            }
        })
        return { "logout": true }
    } else {
        return { "logout": false }
    }
});

const start = async () => {
    try {
        await fastify.listen(3001, '192.168.56.1')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
// const fastify = require('fastify')({
//     logger: true
//   })


// fastify.register(require('fastify-cors'), {
//      origin: 'http://localhost:3000',
//      credentials: 'true',
//      allowMethods:
//         'PROPFIND, PROPPATCH, COPY, MOVE, DELETE, MKCOL, LOCK, UNLOCK, PUT, GETLIB, VERSION-CONTROL, CHECKIN, CHECKOUT, UNCHECKOUT, REPORT, UPDATE, CANCELUPLOAD, HEAD, OPTIONS, GET, POST',
//     allowedHeaders: [
//         'Content-Type',
//         'Authorization',
//         'Cache-Control',
//         'X-Custom-Header',
//         'X-Requested-With',
//         'Cookie',
//     ],
     
// });
//   // Declare a route
// fastify.get('/', function (request, reply) {
//     //reply.header("Content-Type", "application/json")
//     reply.send({"user":"daa"})
// })
  
//   // Run the server!
// fastify.listen({ port: 3001 }, function (err, address) {
//     if (err) {
//       fastify.log.error(err)
//       process.exit(1)
//     }})
//     // Server is now listening on ${address}
// })
// const express = require('express')
// const app = express()
// const port = 3001
// const cors = require('cors')
// app.use(cors({'origin':'http://localhost:3000', "credentials":'true'}))
// app.get('/', (req, res) => {
//   return {"user":'Hello World!'}
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })